# Folder Map

## `00_START_HERE`

Start here. Contains the overview and folder map.

## `01_extractions`

Raw source evidence from OPS.

- `html-sanitized/`: sanitized HTML files from the authed OPS admin pages. These are the primary page-structure references.

## `02_live_references`

Visual evidence.

- `live-screenshots/`: screenshots captured from live OPS or supplied during the walkthrough.
- `user-reference-live-dashboard-listorders-popover.png`: user-supplied live reference showing the correct top bar, fixed shell, dashboard, and order popover behavior.

## `03_simulator_repo_snapshot`

Snapshot of the current simulator files at handoff time. This is not a replacement for the actual git repo, but it lets another agent inspect the last known source quickly.

Files:

- `index.html`
- `app.js`
- `styles.css`
- `capture-data.js`

## `04_verification`

Screenshots and QA evidence.

- `ops-list-orders-parity-latest.png`: latest local simulator screenshot for the List Orders path.
- `user-rejected-nested-shell.png`: rejected state where the simulator created a nested OPS shell. This is the failure case to avoid.
- `simulator-screenshots/`: generated screenshots from earlier simulator states.

## `05_github`

Repository, deployment, and command notes.

## `06_next_agent_context`

Concise continuation brief for Gemini or another agent.

