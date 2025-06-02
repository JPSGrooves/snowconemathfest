# 📦 SnowCone MathFest – Changelog

---

## v0.1 – Menu & Core Systems Locked (May 2025)

### 🧠 Infrastructure
- Implemented Central Data Management System (CDMS)
  - Stores XP, badges, scores, story progress, settings, music favorites
  - Handles unlocks and profile logic
- Scene Manager added to control screen transitions and mode entry
  - Clean switching between Quick Serve, Story Mode, Infinity, Tutorial

### 🎨 UI & Layout
- Menu now fully CSS Grid–based and anchored to real background PNG
- Responsive layout with min/max size limits for mobile scaling
- Title glow animation and emoji-labeled buttons for all five zones

### 💾 Storage
- localStorage-based persistence for all user data
- Global functions exposed for testing in console

### 🔧 Dev Tools
- Added `devFlags.build = "v0.1"` to track internal version
- Helper: `setBuildVersion("vX.Y")` function for updates

---

## 🌀 v0.2 – Modal Systems, Sound Architecture & Save Sync (June 2025)

### 🧠 Central Data Management System (CDMS)
- ✅ `setSetting()` + `getSetting()` wired into UI
- ✅ XP & badge unlock logic added (`addXP()`, `unlockBadge()`)
- ✅ Profile username + XP bar now saves and displays
- ✅ `resetData()` function for dev wipes
- ☐ Score save/load, story progress, full leaderboard pending

### ⚙️ Scene Manager Upgrades
- ✅ `startMode()` and `exitToMenu()` wired to menu labels
- ✅ `loadInitialView()` runs clean on app start
- ☐ Transition system placeholder ready (GSAP split-cone planned)
- ☐ `resetModeState()` prep for score/timer cleanup

### 🎛️ Sound System (Howler.js)
- ✅ Global sound toggle replaces volume sliders (mute logic saved via CDMS)
- ✅ Modal player (jukebox) controls music across app
- ✅ Music + SFX fully managed by `musicManager.js` and `sound.js`
- ✅ `.mp3` storage centralized in `/assets/audio/`
- ☐ Mode-specific BGM support (per mode)
- ☐ Preload sound map for future SFX caching
- ☐ MobX sound state reactivity (planned)

### 🧃 Cosmic Modal UI Polish
- ✅ Profile Tab:
  - Username input, XP %, badges grid, save guide
- ✅ Sound toggle replaces sliders (“Mute Sound 🔇 / Unmute Sound 🔊”)
- ✅ Music Tab:
  - Title display, full transport controls, SoundCloud link
- ✅ Theme selector UI wired to `setSetting('theme')`

### 🖼️ Background Theme System
- ✅ All backgrounds wired: seasonal, holiday, cosmic (select from dropdown)
- ✅ Auto override by date (e.g., Halloween, Valentine’s)
- ✅ Badge-locked cosmic themes (e.g., 'math_zen', 'story_seer')
- ☐ Future: visual lock/unlock indicators in selector

### 🎯 XP & Badge System
- ✅ XP earnable through play (QuickServe, Story prep)
- ✅ Badge logic fires on thresholds + play actions
- ✅ Profile % tracker auto-calculates progress
- ☐ Visual popup for unlocks (GSAP modal/toast plan)
- ☐ “Golden Cone Mode” unlock still in concept phase

### 🔧 File Structure (v0.2 Standard)


/index.html
/css/styles.css
/js/main.js ← Scene Manager
/js/sceneManager.js ← Entry points & resets
/js/dataManager.js ← CDMS brain
/js/musicManager.js ← Background music
/js/sound.js ← SFX wrapper
/js/ui.js ← DOM helpers
/js/modal.js ← Modal logic + buttons
/assets/img/
/assets/audio/
---

## 🔮 Tech Stack (Current + Coming Soon)

| Tool        | Purpose                      | Status         |
|-------------|-------------------------------|----------------|
| **Howler.js**   | Sound + music management      | ✅ Integrated   |
| **GSAP**        | UI + transition animations    | ⏳ In progress  |
| **Pixi.js**     | Game render engine (UI/game)  | 🚧 Coming soon |
| **MobX**        | Reactive state management     | 🛠️ Planned     |
| **Vite**        | Modern dev bundler            | 📦 Migration TBA|
| **Tiled**       | 2D map design (Kids Camp)     | 📐 Ready        |
| **Sentry**      | Runtime error logging         | 🧪 Optional     |

---

## 🚀 Bonus Features In Planning
- 🔓 Golden Cone Mode unlock (full badge reward)
- 🍕 "Order Pizza" dev-mode joke button
- 💾 Export/import full save file (JSON)
- 🎧 Shuffle tracks + mini player
- 🌌 GSAP badge popups / visual cone reveals
- 🕹️ Profile switching / local multiplayer idea
- 👻 Random ghost audio moments# snowconemathfest
