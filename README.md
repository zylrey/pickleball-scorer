# 🏓 Pickleball Scorer

![GitHub repo size](https://img.shields.io/github/repo-size/zylrey/pickleball-scorer)
![GitHub stars](https://img.shields.io/github/stars/zylrey/pickleball-scorer)
![GitHub forks](https://img.shields.io/github/forks/zylrey/pickleball-scorer)
![License](https://img.shields.io/github/license/zylrey/pickleball-scorer)
![Built With](https://img.shields.io/badge/Built%20With-Vanilla%20JavaScript-green)

A lightweight **web-based Pickleball scoring system** designed for referees, casual matches, and small tournaments.

The application tracks:

* rally scoring
* server rotation
* player positions
* timeouts
* game logs
* match statistics
* automatic **PDF match reports**

Runs entirely in the browser with **no backend required**.

---

# 🌐 Live Demo

**Application**

```text
https://pickleball-scorer-one.vercel.app
```

Open the app in any modern browser.

---

# 📸 Screenshots

## Match Setup

Configure players, optional team names, starting server, and game settings.

![Match Setup](docs/setup-screen.png)

---

## Court Interface

Real-time court visualization showing:

* player positions
* serving player highlight
* timeout indicators
* rally controls

![Court Interface](docs/court-view.png)

---

## Game Log

Full rally history with event classification.

![Game Log](docs/game-log.png)

---

## Match Report (PDF)

Automatically generated PDF summary.

![Match Report](docs/pdf-report.png)

---

# 🚀 Features

## Match Setup

Configure the match before play begins.

* Enter **4 player names**
* Optional **custom team names**
* Select **starting server**
* Choose **game point target**
* Configure **timeouts per team**

Example configuration:

```
Team A: LIONS
Team B: TIGERS

Players:
P1 / P2 vs P3 / P4
```

---

# 🧠 Pickleball Scoring Logic

The system follows official **pickleball score call format**:

```
[Serving Team Score] - [Receiving Team Score] - [Server Number]
```

Example:

```
5 - 3 - 2
```

Meaning:

```
Serving team score = 5
Receiving team score = 3
Server number = 2
```

---

# 🔁 Server Rotation System

The application automatically handles:

* Server switching
* Side-outs
* Player rotations

Rules implemented:

```
First serve starts with server #2
Loss of rally:
    Server #1 → Server #2
    Server #2 → Side Out
```

Player positions automatically swap after each point scored by the serving team.

---

# ⏱ Timeout Management

Timeouts are configurable per game.

Visual timeout indicators appear on the court:

```
● ● ○
```

Features:

* timeout usage tracking
* prevention of exceeding timeout limits
* confirmation if the same team calls timeout consecutively

---

# 🔒 Undo Protection

Undo actions require **admin authorization**.

Referee must enter:

```
admin
```

before the undo action is allowed.

This prevents accidental or malicious score manipulation.

---

# 📜 Rally Event Logging

Every rally generates a log entry containing:

| Field   | Description                      |
| ------- | -------------------------------- |
| #       | Rally number                     |
| Event   | Point / Server Change / Side Out |
| Score   | Score call                       |
| Serving | Current server                   |

Example:

```
12 | Point | 6-4-1 | P2
```

Logs update in real time and appear in the **Game Log panel**.

---

# 🏆 Win Detection

A team wins when:

```
Score ≥ Target Score
AND
Lead ≥ 2 points
```

Example:

```
11 - 9 ✔
11 - 10 ✖
12 - 10 ✔
```

After a win:

* game is locked
* win modal appears
* MVP statistics are calculated

---

# 🥇 MVP Calculation

The system automatically determines the **Most Valuable Player** based on rally points.

Example output:

```
MVP: P4 - TIGERS - 5 pts

P2 - LIONS - 3 pts
P1 - LIONS - 0 pts
P3 - TIGERS - 0 pts
```

---

# 📄 PDF Match Report

Export a full match report including:

### Match Summary

```
Final Score: 3 - 5

LIONS: P1 / P2
TIGERS: P3 / P4
```

### Player Points Table

| Player      | Points |
| ----------- | ------ |
| P4 - TIGERS | 5      |
| P2 - LIONS  | 3      |
| P1 - LIONS  | 0      |
| P3 - TIGERS | 0      |

### Rally Log

Complete chronological rally history.

PDF generated using:

```
jsPDF
jsPDF-AutoTable
```

---

# 💾 Local Storage Persistence

Match state is automatically stored in **browser localStorage**.

Saved data includes:

* scores
* server state
* player names
* timeouts
* rally logs
* team names

Refreshing the page **restores the current match automatically**.

---

# 📱 Responsive Design

Optimized for:

* Desktop
* Tablet referees
* Mobile devices

Mobile layout converts the control panel into a **touch-friendly grid interface**.

---

# 🧰 Technology Stack

```
HTML5
CSS3
Vanilla JavaScript (ES Modules)
jsPDF
jsPDF-AutoTable
```

No frameworks, bundlers, or backend required.

---

# 📁 Project Structure

```
pickleball-scorer/
│
├── index.html              Entry point (no inline handlers)
├── style.css               Responsive layout
├── court.png               Court background image
├── logo.png                App icon
│
├── js/
│   ├── main.js             App entry point, event listener wiring
│   ├── constants.js        All magic values (team IDs, events, defaults)
│   │
│   ├── state/
│   │   └── game-state.js   Encapsulated state singleton + helpers
│   │
│   ├── dom/
│   │   ├── elements.js     Cached DOM references (queried once)
│   │   ├── renderer.js     All DOM write operations
│   │   └── modals.js       Modal show/hide logic
│   │
│   ├── game/
│   │   ├── serving.js      Server selection, partner lookup (pure)
│   │   ├── scoring.js      Score application, win detection (pure)
│   │   ├── rally.js        Rally orchestration (coordinator)
│   │   └── timeout.js      Timeout management
│   │
│   ├── features/
│   │   ├── undo.js         Undo system with admin authorization
│   │   ├── persistence.js  localStorage save/load/clear
│   │   ├── setup.js        Setup form reading, team name toggle
│   │   └── pdf-export.js   PDF match report generation
│   │
│   └── log/
│       └── event-log.js    Log entry creation and management (pure)
│
├── docs/
│   ├── setup-screen.png
│   ├── court-view.png
│   ├── game-log.png
│   └── pdf-report.png
│
└── README.md
```

### Architecture Highlights

* **ES Modules** — 15 focused modules with clear single responsibilities
* **Encapsulated state** — singleton `gameState` object replaces global variables
* **DOM isolation** — game logic modules (`serving`, `scoring`, `event-log`) are pure with zero DOM access
* **No inline handlers** — all event binding via `addEventListener` in `main.js`
* **Constants extraction** — all magic strings and numbers centralized in `constants.js`

---

# ⚙️ Installation

Clone the repository.

```
git clone https://github.com/your-username/pickleball-scorer.git
```

Open the project directory.

Serve via a local HTTP server (ES modules require HTTP, not `file://`):

```
npx serve .
```

Or use **VS Code Live Server**, **Python** (`python -m http.server`), or any static file server.

Then open `http://localhost:3000` (or the port shown) in your browser.

---

# 🌍 Deployment

Recommended deployment platforms:

* **Vercel**
* **Netlify**
* **GitHub Pages**

Example deployment:

```
https://pickleball-scorer-one.vercel.app
```

---

# 🔮 Future Enhancements

Planned improvements:

* Match sets (Best of 3 / Best of 5)
* Multi-game match tracking
* Tournament bracket integration
* Referee authentication
* Real-time scoreboard display
* Cloud match storage
* Tablet referee UI

---

# 👤 Author

**Zyl Arpon**

Pickleball Match Scoring System

Designed for referees, recreational games, and local tournaments.

---

# ⭐ Support

If this project helped you:

```
⭐ Star the repository
🍴 Fork the project
```
