# GitHub And Deployment Notes

## Repository

- Local repo: `/Users/cderamos/Projects/OPS Simulator`
- Remote: `https://github.com/GraphXCPI/GraphX-OPS.git`
- GitHub Pages URL: `https://graphxcpi.github.io/GraphX-OPS/`
- Branch: `main`

## Recent Commits At Handoff

- `09f637e` Trigger Pages refresh for OPS simulator
- `c3035cc` Align OPS simulator shell and navigation
- `3f33d43` Trigger Pages redeploy
- `41c23ad` Make OPS sidebar dropdowns interactive
- `26131a8` Rebuild OPS dashboard baseline

## Historical Dirty State At Original Handoff

The simulator repo had uncommitted edits:

- `app.js`
- `index.html`
- `styles.css`

Untracked:

- `.codegraph/`
- `live-screenshots/dashboard-current-live.png`

This section is retained as historical context from the original handoff. For the current working state, run:

```bash
git -C "/Users/cderamos/Projects/OPS Simulator" status --short --branch
```

Do not blindly commit everything. Stage only the intended simulator files, docs, and screenshots.

## Local Preview

From the simulator repo:

```bash
cd "/Users/cderamos/Projects/OPS Simulator"
python3 -m http.server 4179
```

Open:

`http://127.0.0.1:4179/`

## Basic Checks

Syntax check:

```bash
node --check "/Users/cderamos/Projects/OPS Simulator/simulator.js"
```

Git state:

```bash
git -C "/Users/cderamos/Projects/OPS Simulator" status --short --branch
```

Push after verification:

```bash
cd "/Users/cderamos/Projects/OPS Simulator"
git add index.html simulator.js simulator.css assets/admin_style.css assets/dashboard.css icon-mapping screenshots README.md docs reference/README.md
git commit -m "Improve OPS simulator parity"
git push origin main
```

Only push after a live/screenshot comparison pass.
