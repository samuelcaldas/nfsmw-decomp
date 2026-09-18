#!/usr/bin/env python3
"""Deterministic candidate selector for Ralph loop decompilation workflow.

Scans build/GOWE69/report.json, filters candidates by match percentage,
unit, or category, and outputs ranked candidates with context commands.
"""

from dataclasses import asdict, dataclass
import argparse
import json
from pathlib import Path
import sys
from typing import Any, Dict, List, Optional


@dataclass(frozen=True)
class DecompCandidate:
    """Representation of an eligible decompilation candidate function."""

    unit_name: str
    symbol: str
    demangled_name: str
    size_bytes: int
    fuzzy_match_percent: float
    category: str

    def to_dict(self) -> Dict[str, Any]:
        """Convert candidate to dictionary representation."""
        data = asdict(self)
        data["context_command"] = self.context_command
        data["diff_command"] = self.diff_command
        return data

    @property
    def context_command(self) -> str:
        """Return ready-to-run decomp-context command."""
        return (
            f"python3 tools/decomp-context.py "
            f"-u {self.unit_name} -f {self.symbol} --no-ghidra"
        )

    @property
    def diff_command(self) -> str:
        """Return ready-to-run decomp-diff command."""
        return (
            f"python3 tools/decomp-diff.py "
            f"-u {self.unit_name} -d {self.symbol}"
        )


def load_report(report_path: Path) -> Dict[str, Any]:
    """Load and parse the JSON report file safely.

    Raises FileNotFoundError if report does not exist.
    """
    if not report_path.is_file():
        raise FileNotFoundError(
            f"Report file not found: {report_path}. "
            f"Run 'ninja {report_path}' first to generate it."
        )
    with open(report_path, "r", encoding="utf-8") as file_handle:
        return json.load(file_handle)


def extract_unit_category(unit: Dict[str, Any]) -> str:
    """Extract primary category from unit metadata."""
    metadata = unit.get("metadata", {})
    categories = metadata.get("progress_categories", [])
    if categories:
        return str(categories[0]).lower()
    return "unknown"


def parse_candidate(
    unit_name: str, category: str, fn_data: Dict[str, Any]
) -> Optional[DecompCandidate]:
    """Convert raw report function dictionary to DecompCandidate."""
    fuzzy_raw = fn_data.get("fuzzy_match_percent")
    fuzzy_val = 0.0 if fuzzy_raw is None else float(fuzzy_raw)
    if fuzzy_val >= 100.0:
        return None
    raw_size = fn_data.get("size", 0)
    size_bytes = int(raw_size) if raw_size is not None else 0
    metadata = fn_data.get("metadata", {})
    demangled = metadata.get("demangled_name", fn_data.get("name", ""))
    return DecompCandidate(
        unit_name=unit_name,
        symbol=str(fn_data.get("name", "")),
        demangled_name=demangled,
        size_bytes=size_bytes,
        fuzzy_match_percent=round(fuzzy_val, 4),
        category=category,
    )


def extract_candidates(report_data: Dict[str, Any]) -> List[DecompCandidate]:
    """Extract all non-matching functions across all units."""
    candidates: List[DecompCandidate] = []
    for unit in report_data.get("units", []):
        unit_name = str(unit.get("name", ""))
        category = extract_unit_category(unit)
        for fn_item in unit.get("functions", []):
            candidate = parse_candidate(unit_name, category, fn_item)
            if candidate is not None:
                candidates.append(candidate)
    return candidates


def filter_by_unit(
    candidates: List[DecompCandidate], unit_query: Optional[str]
) -> List[DecompCandidate]:
    """Filter candidates matching unit name substring."""
    if not unit_query:
        return candidates
    query_lower = unit_query.lower()
    return [c for c in candidates if query_lower in c.unit_name.lower()]


def filter_by_category(
    candidates: List[DecompCandidate], category_query: Optional[str]
) -> List[DecompCandidate]:
    """Filter candidates matching category substring."""
    if not category_query:
        return candidates
    query_lower = category_query.lower()
    return [c for c in candidates if query_lower in c.category.lower()]


def filter_by_match_range(
    candidates: List[DecompCandidate], min_match: float, max_match: float
) -> List[DecompCandidate]:
    """Filter candidates within [min_match, max_match] percentage range."""
    return [
        c
        for c in candidates
        if min_match <= c.fuzzy_match_percent <= max_match
    ]


def sort_candidates(
    candidates: List[DecompCandidate], strategy: str
) -> List[DecompCandidate]:
    """Sort candidates deterministically based on chosen strategy."""
    if strategy == "highest-fuzzy":
        return sorted(
            candidates,
            key=lambda c: (-c.fuzzy_match_percent, c.size_bytes, c.symbol),
        )
    if strategy == "lowest-fuzzy":
        return sorted(
            candidates,
            key=lambda c: (c.fuzzy_match_percent, c.size_bytes, c.symbol),
        )
    if strategy == "smallest":
        return sorted(
            candidates,
            key=lambda c: (c.size_bytes, -c.fuzzy_match_percent, c.symbol),
        )
    if strategy == "largest":
        return sorted(
            candidates,
            key=lambda c: (-c.size_bytes, -c.fuzzy_match_percent, c.symbol),
        )
    return candidates


def format_candidate_text(idx: int, c: DecompCandidate) -> str:
    """Format single candidate as readable terminal string."""
    lines = [
        f"[{idx}] {c.demangled_name}",
        f"    Unit:      {c.unit_name}",
        f"    Symbol:    {c.symbol}",
        f"    Category:  {c.category}",
        f"    Size:      {c.size_bytes} bytes",
        f"    Match:     {c.fuzzy_match_percent:.2f}%",
        f"    Context:   {c.context_command}",
        f"    Diff:      {c.diff_command}",
    ]
    return "\n".join(lines)


def add_selection_arguments(parser: argparse.ArgumentParser) -> None:
    """Add path and strategy selection arguments to parser."""
    parser.add_argument(
        "--report",
        type=Path,
        default=Path("build/GOWE69/report.json"),
        help="Path to objdiff report.json (default: build/GOWE69/report.json)",
    )
    parser.add_argument(
        "--strategy",
        choices=["highest-fuzzy", "smallest", "largest", "lowest-fuzzy"],
        default="highest-fuzzy",
        help="Candidate ranking strategy (default: highest-fuzzy)",
    )


def add_filter_arguments(parser: argparse.ArgumentParser) -> None:
    """Add candidate filter arguments to parser."""
    parser.add_argument(
        "--unit",
        type=str,
        default=None,
        help="Filter candidates by unit name substring",
    )
    parser.add_argument(
        "--category",
        type=str,
        default=None,
        help="Filter candidates by category (e.g. game, libs, sdk)",
    )
    parser.add_argument(
        "--min-match",
        type=float,
        default=0.0,
        help="Minimum fuzzy match percentage (default: 0.0)",
    )
    parser.add_argument(
        "--max-match",
        type=float,
        default=99.9999,
        help="Maximum fuzzy match percentage (default: 99.9999)",
    )


def add_output_arguments(parser: argparse.ArgumentParser) -> None:
    """Add output format and limit arguments to parser."""
    parser.add_argument(
        "--limit",
        type=int,
        default=5,
        help="Maximum candidates to display (default: 5)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output candidates in JSON format",
    )
    parser.add_argument(
        "--commands-only",
        action="store_true",
        help="Output only the ready-to-run commands for top candidate",
    )


def build_argument_parser() -> argparse.ArgumentParser:
    """Construct command-line argument parser."""
    parser = argparse.ArgumentParser(
        description="Select next decompilation candidate function from report.json"
    )
    add_selection_arguments(parser)
    add_filter_arguments(parser)
    add_output_arguments(parser)
    return parser


def output_json(candidates: List[DecompCandidate], limit: int) -> None:
    """Print selected candidates as JSON array."""
    data = [c.to_dict() for c in candidates[:limit]]
    print(json.dumps(data, indent=2))


def output_commands_only(candidate: DecompCandidate) -> None:
    """Print only bash commands for top candidate."""
    print(candidate.context_command)
    print(candidate.diff_command)


def output_text(candidates: List[DecompCandidate], limit: int) -> None:
    """Print formatted text candidates list."""
    if not candidates:
        print("No eligible decompilation candidates found matching criteria.")
        return
    print(f"Found {len(candidates)} candidate(s) (displaying top {min(len(candidates), limit)}):")
    print("=" * 70)
    for idx, cand in enumerate(candidates[:limit], start=1):
        print(format_candidate_text(idx, cand))
        print("-" * 70)


def main() -> None:
    """Main program entry point."""
    parser = build_argument_parser()
    args = parser.parse_args()
    try:
        report = load_report(args.report)
    except FileNotFoundError as err:
        sys.exit(str(err))

    candidates = extract_candidates(report)
    candidates = filter_by_unit(candidates, args.unit)
    candidates = filter_by_category(candidates, args.category)
    candidates = filter_by_match_range(candidates, args.min_match, args.max_match)
    sorted_candidates = sort_candidates(candidates, args.strategy)

    if args.json:
        output_json(sorted_candidates, args.limit)
        return
    if args.commands_only and sorted_candidates:
        output_commands_only(sorted_candidates[0])
        return
    output_text(sorted_candidates, args.limit)


if __name__ == "__main__":
    main()
