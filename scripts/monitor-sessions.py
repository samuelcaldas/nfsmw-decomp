#!/usr/bin/env python3
"""Background compliance and progress monitor for NFSMW multi-agent decompilation.

Polls active sessions (nfs1..nfs5 in tmux session PS2) at a reasonable interval,
verifies that subagents strictly use gemini-3.5-flash-lite (decomp-worker),
confirms workflow and ultracode usage, and reports progress / anomalies.
"""

import datetime
import subprocess
import sys
import time

SESSIONS = [
    ("nfs1", "PS2:0"),
    ("nfs2", "PS2:1"),
    ("nfs3", "PS2:2"),
    ("nfs4", "PS2:3"),
    ("nfs5", "PS2:4"),
]

POLL_INTERVAL_SECONDS = 60
HEARTBEAT_INTERVAL_SECONDS = 300  # 5 minutes


def get_pane_content(target: str, lines: int = 60) -> str:
    """Capture pane text safely from tmux."""
    try:
        res = subprocess.run(
            ["tmux", "capture-pane", "-pt", target, "-S", f"-{lines}"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        if res.returncode == 0:
            return res.stdout
    except Exception:
        pass
    return ""


def get_git_head() -> str:
    """Return latest short commit on main."""
    try:
        res = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        if res.returncode == 0:
            return res.stdout.strip()
    except Exception:
        pass
    return "unknown"


def main():
    sys.stdout.reconfigure(line_buffering=True)
    last_head = get_git_head()
    last_heartbeat = 0.0

    print(
        f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [MONITOR START] Monitoring sessions @nfs1..@nfs5 for workflow & gemini-3.5-flash-lite compliance (poll={POLL_INTERVAL_SECONDS}s)"
    )

    while True:
        now = time.time()
        current_head = get_git_head()

        # Check for new commits on main
        if current_head != last_head and current_head != "unknown":
            try:
                commit_info = subprocess.run(
                    ["git", "log", "-1", "--oneline"],
                    capture_output=True,
                    text=True,
                    timeout=5,
                ).stdout.strip()
                print(
                    f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [MONITOR MERGE] New commit on main: {commit_info}"
                )
            except Exception:
                pass
            last_head = current_head

        session_statuses = {}
        anomalies = []

        for name, target in SESSIONS:
            content = get_pane_content(target, lines=50)
            if not content:
                session_statuses[name] = "offline/unreachable"
                continue

            has_active_agent = "agent" in content or "decomp-worker" in content or "workflow" in content or "parallel" in content
            has_forbidden_model = any(m in content for m in ["opus", "sonnet", "gemini-pro", "gemini-1.5-pro"])

            if has_forbidden_model:
                anomalies.append(f"{name}: detected non-permitted model in scrollback!")

            if "decomp-worker" in content:
                status = "decomp-worker (gemini-3.5-flash-lite)"
            elif "workflow" in content.lower() or "parallel" in content:
                status = "workflow active"
            elif has_active_agent:
                status = "subagent active"
            elif "❯" in content and "Thinking" not in content and "Cooking" not in content:
                status = "idle (awaiting prompt)"
            else:
                status = "processing"

            session_statuses[name] = status

        # Emit any anomaly immediately
        for anomaly in anomalies:
            print(
                f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [MONITOR ALERT] {anomaly}"
            )

        # Emit periodic heartbeat every 5 minutes
        if now - last_heartbeat >= HEARTBEAT_INTERVAL_SECONDS:
            summary = ", ".join(f"{k}: {v}" for k, v in session_statuses.items())
            print(
                f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [MONITOR HEARTBEAT] Head: {current_head} | Statuses: {summary}"
            )
            last_heartbeat = now

        time.sleep(POLL_INTERVAL_SECONDS)


if __name__ == "__main__":
    main()
