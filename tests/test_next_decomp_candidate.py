"""Unit tests for scripts/next-decomp-candidate.py."""

import unittest
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

# Dynamically import scripts/next-decomp-candidate.py despite hyphen
script_path = Path(__file__).resolve().parent.parent / "scripts" / "next-decomp-candidate.py"
spec = importlib.util.spec_from_file_location("next_decomp_candidate", script_path)
if spec is None or spec.loader is None:
    raise ImportError(f"Cannot load module from {script_path}")
cand_mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cand_mod)

DecompCandidate = cand_mod.DecompCandidate
load_report = cand_mod.load_report
extract_unit_category = cand_mod.extract_unit_category
parse_candidate = cand_mod.parse_candidate
extract_candidates = cand_mod.extract_candidates
filter_by_unit = cand_mod.filter_by_unit
filter_by_category = cand_mod.filter_by_category
filter_by_match_range = cand_mod.filter_by_match_range
sort_candidates = cand_mod.sort_candidates
format_candidate_text = cand_mod.format_candidate_text
build_argument_parser = cand_mod.build_argument_parser


class TestNextDecompCandidate(unittest.TestCase):
    """Test suite for decomp candidate selection logic."""

    def setUp(self) -> None:
        """Set up test fixtures."""
        self.candidate1 = DecompCandidate(
            unit_name="main/Speed/Indep/SourceLists/zFe",
            symbol="CheckUnplugged__13cFEngJoyInput",
            demangled_name="cFEngJoyInput::CheckUnplugged",
            size_bytes=460,
            fuzzy_match_percent=99.99,
            category="game",
        )
        self.candidate2 = DecompCandidate(
            unit_name="main/Speed/Indep/Libs/snd/9/source/library/cmn/sstgetpv",
            symbol="SNDSTRM_getprogvol",
            demangled_name="SNDSTRM_getprogvol",
            size_bytes=152,
            fuzzy_match_percent=91.71,
            category="libs",
        )
        self.candidate3 = DecompCandidate(
            unit_name="main/Speed/Indep/SourceLists/zGameplay",
            symbol="AddAvailableEventToMap__11GRaceStatusP16GRuntimeInstanceT1",
            demangled_name="GRaceStatus::AddAvailableEventToMap(GRuntimeInstance *, GRuntimeInstance *)",
            size_bytes=4,
            fuzzy_match_percent=0.0,
            category="game",
        )

    def test_candidate_properties(self) -> None:
        """Verify command formatting properties."""
        ctx_cmd = self.candidate1.context_command
        diff_cmd = self.candidate1.diff_command
        self.assertIn("tools/decomp-context.py", ctx_cmd)
        self.assertIn("-u main/Speed/Indep/SourceLists/zFe", ctx_cmd)
        self.assertIn("-f CheckUnplugged__13cFEngJoyInput", ctx_cmd)
        self.assertIn("tools/decomp-diff.py", diff_cmd)
        self.assertIn("-d CheckUnplugged__13cFEngJoyInput", diff_cmd)

    def test_candidate_to_dict(self) -> None:
        """Verify dictionary conversion includes helper commands."""
        data = self.candidate1.to_dict()
        self.assertEqual(data["unit_name"], self.candidate1.unit_name)
        self.assertEqual(data["symbol"], self.candidate1.symbol)
        self.assertEqual(data["context_command"], self.candidate1.context_command)
        self.assertEqual(data["diff_command"], self.candidate1.diff_command)

    def test_load_report_success(self) -> None:
        """Verify loading existing JSON report file."""
        with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as tmp:
            json.dump({"units": []}, tmp)
            tmp_path = Path(tmp.name)
        try:
            result = load_report(tmp_path)
            self.assertEqual(result, {"units": []})
        finally:
            tmp_path.unlink()

    def test_load_report_missing_file_raises(self) -> None:
        """Verify FileNotFoundError when report file is missing."""
        missing_path = Path("/nonexistent/report.json")
        with self.assertRaises(FileNotFoundError):
            load_report(missing_path)

    def test_extract_unit_category(self) -> None:
        """Verify category extraction from metadata."""
        unit_with_cat = {"metadata": {"progress_categories": ["libs"]}}
        unit_without_cat = {"metadata": {}}
        self.assertEqual(extract_unit_category(unit_with_cat), "libs")
        self.assertEqual(extract_unit_category(unit_without_cat), "unknown")

    def test_parse_candidate_filters_100_percent(self) -> None:
        """Verify 100% matched functions are ignored."""
        fn_matched = {"name": "foo", "fuzzy_match_percent": 100.0, "size": 100}
        cand = parse_candidate("unit1", "game", fn_matched)
        self.assertIsNone(cand)

    def test_parse_candidate_handles_none_fuzzy(self) -> None:
        """Verify None fuzzy match percentage defaults to 0.0%."""
        fn_none = {"name": "bar", "fuzzy_match_percent": None, "size": 20}
        cand = parse_candidate("unit1", "game", fn_none)
        self.assertIsNotNone(cand)
        if cand:
            self.assertEqual(cand.fuzzy_match_percent, 0.0)

    def test_filter_by_unit(self) -> None:
        """Verify filtering candidates by unit query."""
        all_candidates = [self.candidate1, self.candidate2, self.candidate3]
        filtered = filter_by_unit(all_candidates, "zFe")
        self.assertEqual(len(filtered), 1)
        self.assertEqual(filtered[0].unit_name, self.candidate1.unit_name)

    def test_filter_by_category(self) -> None:
        """Verify filtering candidates by category query."""
        all_candidates = [self.candidate1, self.candidate2, self.candidate3]
        filtered = filter_by_category(all_candidates, "libs")
        self.assertEqual(len(filtered), 1)
        self.assertEqual(filtered[0].category, "libs")

    def test_filter_by_match_range(self) -> None:
        """Verify filtering candidates by match percentage range."""
        all_candidates = [self.candidate1, self.candidate2, self.candidate3]
        filtered = filter_by_match_range(all_candidates, 90.0, 99.99)
        self.assertEqual(len(filtered), 2)

    def test_sort_candidates_highest_fuzzy(self) -> None:
        """Verify sorting by highest fuzzy match percentage."""
        all_candidates = [self.candidate3, self.candidate1, self.candidate2]
        sorted_list = sort_candidates(all_candidates, "highest-fuzzy")
        self.assertEqual(sorted_list[0], self.candidate1)
        self.assertEqual(sorted_list[1], self.candidate2)
        self.assertEqual(sorted_list[2], self.candidate3)

    def test_sort_candidates_smallest(self) -> None:
        """Verify sorting by smallest byte size."""
        all_candidates = [self.candidate1, self.candidate2, self.candidate3]
        sorted_list = sort_candidates(all_candidates, "smallest")
        self.assertEqual(sorted_list[0], self.candidate3)
        self.assertEqual(sorted_list[1], self.candidate2)
        self.assertEqual(sorted_list[2], self.candidate1)

    def test_format_candidate_text(self) -> None:
        """Verify formatted text contains all key fields."""
        text = format_candidate_text(1, self.candidate1)
        self.assertIn("[1] cFEngJoyInput::CheckUnplugged", text)
        self.assertIn("CheckUnplugged__13cFEngJoyInput", text)
        self.assertIn("99.99%", text)
        self.assertIn("Context:", text)
        self.assertIn("Diff:", text)

    def test_build_argument_parser(self) -> None:
        """Verify parser configurations."""
        parser = build_argument_parser()
        args = parser.parse_args(["--strategy", "smallest", "--limit", "10"])
        self.assertEqual(args.strategy, "smallest")
        self.assertEqual(args.limit, 10)


if __name__ == "__main__":
    unittest.main()
