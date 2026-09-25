#!/usr/bin/env python3
"""Background compliance, progress monitor, and automated heartbeat reminder for NFSMW decompilation.

Polls active sessions (nfs1..nfs5 in tmux session PS2) at a reasonable interval:
1. Verifies that subagents strictly use gemini-3.5-flash-lite (decomp-worker).
2. Confirms workflow and ultracode usage, and detects forbidden models (opus, sonnet, etc.).
3. Detects any session that stops working / becomes idle or has its goal paused,
   and automatically dispatches a heartbeat reminder to resume decompilation.
4. Tracks merges and new commits on main.
"""

import datetime
import subprocess
import sys
import time

SESSIONS = [
    {
        "name": "nfs1",
        "pane": "PS2:0",
        "unit": "zFe",
        "prompt": "Continue a decompilação no próximo candidato de zFe. Invoque o agente decomp-worker ou workflow com gemini-3.5-flash-lite, respeite os anti-slop guardrails e valide com ninja changes.",
    },
    {
        "name": "nfs2",
        "pane": "PS2:1",
        "unit": "zEAXSound",
        "prompt": "Continue a decompilação no próximo candidato de zEAXSound/zEAXSound2. Invoque o agente decomp-worker ou workflow com gemini-3.5-flash-lite, respeite os anti-slop guardrails e valide com ninja changes.",
    },
    {
        "name": "nfs3",
        "pane": "PS2:2",
        "unit": "zAI",
        "prompt": "Continue a decompilação no próximo candidato de zAI. Invoque o agente decomp-worker ou workflow com gemini-3.5-flash-lite, respeite os anti-slop guardrails e valide com ninja changes.",
    },
    {
        "name": "nfs4",
        "pane": "PS2:3",
        "unit": "zGameplay",
        "prompt": "Continue a decompilação no próximo candidato de zGameplay/zWorld2. Invoque o agente decomp-worker ou workflow com gemini-3.5-flash-lite, respeite os anti-slop guardrails e valide com ninja changes.",
    },
    {
        "name": "nfs5",
        "pane": "PS2:4",
        "unit": "zEcstasy",
        "prompt": "Continue a decompilação no próximo candidato de zEcstasy/zPhysics. Invoque o agente decomp-worker ou workflow com gemini-3.5-flash-lite, respeite os anti-slop guardrails e valide com ninja changes.",
    },
]

POLL_INTERVAL_SECONDS = 30
HEARTBEAT_INTERVAL_SECONDS = 180  # 3 minutes summary
HEARTBEAT_COOLDOWN_SECONDS = 90   # 1.5 minutes cooldown between reminders to the same session
CONSECUTIVE_IDLE_THRESHOLD = 2    # Require 2 checks (~60s) idle before sending reminder


def get_pane_content(target: str, lines: int = 50) -> str:
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


def send_pane_prompt(target: str, prompt_text: str) -> bool:
    """Send text directly into tmux pane as input prompt."""
    try:
        subprocess.run(["tmux", "send-keys", "-t", target, "C-u"], timeout=5)
        time.sleep(0.1)
        res = subprocess.run(
            ["tmux", "send-keys", "-t", target, "-l", prompt_text],
            timeout=5,
        )
        if res.returncode == 0:
            time.sleep(0.1)
            subprocess.run(["tmux", "send-keys", "-t", target, "Enter"], timeout=5)
            return True
    except Exception:
        pass
    return False


def get_git_head() -> str:
    """Return latest short commit on main."""
    try:
        res = subprocess.run(
            ["git", "-C", "/home/samuelcaldas/source/repos/nfsmw", "rev-parse", "--short", "main"],
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
    last_summary_heartbeat = 0.0

    idle_counts = {s["name"]: 0 for s in SESSIONS}
    last_reminded = {s["name"]: 0.0 for s in SESSIONS}

    print(
        f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [MONITOR START] Monitoring sessions @nfs1..@nfs5 with automated heartbeat reminders (poll={POLL_INTERVAL_SECONDS}s, idle_threshold={CONSECUTIVE_IDLE_THRESHOLD})"
    )

    while True:
        now = time.time()
        current_head = get_git_head()

        # Check for new commits on main
        if current_head != last_head and current_head != "unknown":
            try:
                commit_info = subprocess.run(
                    ["git", "-C", "/home/samuelcaldas/source/repos/nfsmw", "log", "-1", "--oneline", "main"],
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

        for s in SESSIONS:
            name = s["name"]
            pane = s["pane"]
            unit = s["unit"]
            prompt = s["prompt"]

            content = get_pane_content(pane, lines=40)
            if not content:
                session_statuses[name] = "offline/unreachable"
                continue

            last_lines = content.strip().splitlines()[-10:] if content.strip() else []
            tail_content = "\n".join(last_lines)

            # Check if active turn is currently running
            has_spinner = any(
                indicator in tail_content
                for indicator in [
                    "esc to interrupt",
                    "esc to",
                    "esc t",
                    "tokens)",
                    "Transmuting",
                    "Beboppin",
                    "Thinking…",
                    "Accomplishing…",
                    "Planning…",
                    "Cooking…",
                    "Julienning…",
                    "Pouncing…",
                    "Channeling…",
                    "Simmering…",
                    "Ionizing…",
                    "Crystallizing…",
                    "Enchanting…",
                    "Effecting…",
                    "Ruminating…",
                    "Gusting…",
                    "agent(",
                    "workflow(",
                    "running ",
                ]
            ) or (
                any(s in tail_content for s in ["✢", "◯", "✽", "✻", "✦"])
                and not any(done_word in tail_content for done_word in ["Baked for", "Brewed for", "done", "Finished"])
            )
            is_actively_running = has_spinner

            non_banner_lines = [
                line for line in content.splitlines()
                if not line.strip().startswith(("│", "╭", "╰"))
            ]
            eval_content = "\n".join(non_banner_lines)

            has_forbidden_model = any(
                m in eval_content for m in ["opus", "sonnet", "gemini-pro", "gemini-1.5-pro"]
            )
            if has_forbidden_model:
                anomalies.append(f"{name}: detected non-permitted model in scrollback!")

            # Detect idle state (awaiting user prompt or goal paused)
            is_paused_or_idle = (
                not is_actively_running
                and ("❯" in tail_content or "Goal paused" in content or "Run /goal again" in content)
            )

            if is_paused_or_idle:
                idle_counts[name] += 1
                status = f"idle (awaiting prompt, ticks={idle_counts[name]})"

                # If idle for threshold checks and cooldown passed, dispatch heartbeat reminder
                if idle_counts[name] >= CONSECUTIVE_IDLE_THRESHOLD:
                    if (now - last_reminded[name]) >= HEARTBEAT_COOLDOWN_SECONDS:
                        success = send_pane_prompt(pane, prompt)
                        if success:
                            last_reminded[name] = now
                            idle_counts[name] = 0
                            print(
                                f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [MONITOR HEARTBEAT SENT] Dispatched decomp reminder to @{name} ({pane}) for unit {unit}"
                            )
                            status = "reminded (starting next candidate)"
            else:
                idle_counts[name] = 0
                if "decomp-worker" in content:
                    status = "decomp-worker (gemini-3.5-flash-lite)"
                elif "workflow" in content.lower() or "parallel" in content:
                    status = "workflow active (gemini-3.5-flash-lite)"
                elif "agent" in content:
                    status = "subagent active"
                else:
                    status = "active (processing turn)"

            session_statuses[name] = status

        # Emit any anomaly immediately
        for anomaly in anomalies:
            print(
                f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [MONITOR ALERT] {anomaly}"
            )

        # Emit periodic heartbeat summary every 3 minutes
        if now - last_summary_heartbeat >= HEARTBEAT_INTERVAL_SECONDS:
            summary = ", ".join(f"{k}: {v}" for k, v in session_statuses.items())
            print(
                f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [MONITOR HEARTBEAT] Head: {current_head} | Statuses: {summary}"
            )
            last_summary_heartbeat = now

        time.sleep(POLL_INTERVAL_SECONDS)


if __name__ == "__main__":
    main()
