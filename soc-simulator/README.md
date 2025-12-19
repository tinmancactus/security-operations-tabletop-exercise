# SOC Simulator

A browser-based Security Operations Centre (SOC) training simulator. Players investigate security incidents in real-time, managing alerts, communications, and evidence while racing against the clock.

## Prerequisites

You need **Node.js** (version 18 or higher) installed on your machine.

**Check if you have it:**
```bash
node --version
```

**If not installed:** Download from [nodejs.org](https://nodejs.org/) (LTS version recommended). This also installs `npm`.

## Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd soc-simulator

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).
Some changes may require the dev server to be restarted. If you are experiencing console errors or duplicate game artefacts (messages, notifications, etc.), try killing the dev server process and restarting it.

## Build for LMS Deployment

To create a single self-contained HTML file for uploading to an LMS:

```bash
npm run build:scenario operation-glasshouse/session-1
```

Output: `builds/soc-sim-operation-glasshouse-session-1.html`

This file includes all JavaScript, CSS, and images inlined — no server required.

## Project Structure

```
soc-simulator/
├── src/                    # Application code (Vue components, stores)
├── scenarios/              # Scenario data (stories, characters, alerts)
│   └── operation-glasshouse/
│       └── session-1/      # One complete scenario
├── builds/                 # Generated single-file builds (gitignored)
├── docs/                   # Detailed documentation
│   ├── SCENARIO-DEVELOPMENT.md  # Creating/editing scenarios (for LLM agents)
│   └── ARCHITECTURE.md          # Application architecture
└── scripts/                # Build scripts
```

## Console Commands

Open browser DevTools (F12) and use these commands:

| Command | Description |
|---------|-------------|
| `soc.help()` | Show all available commands |
| `soc.status()` | Show current game state |
| `soc.setTime(seconds)` | Set remaining time (e.g., `soc.setTime(300)` for 5 min) |
| `soc.addTokens(n)` | Add tokens |
| `soc.clearNotifications()` | Dismiss all notifications |
| `soc.previewReport()` | Preview session report in new tab |

## Development

This project was developed using the Cascade AI coding assistant in the Windsurf IDE. To get started developing scenarios or extending the simulator, the following tools are recommended:

- IDE: Windsurf
- Model: Claude Opus 4.5 (or newer. Sonnet should also be fine. Thinking enabled for more complex tasks.)

For best results, your initial prompt should direct the agent to this `README.md` file, `ARCHITECTURE.md` and `SCENARIO-DEVELOPMENT.md`.

## Documentation

- **[Scenario Development Guide](docs/SCENARIO-DEVELOPMENT.md)** — Data schemas and how to create scenarios
- **[Architecture](docs/ARCHITECTURE.md)** — Technical architecture and design principles
