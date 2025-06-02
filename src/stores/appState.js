// /src/stores/appState.js
import { makeAutoObservable, toJS } from "mobx";

const STORAGE_KEY = "snowconeUserData";

const DEFAULT_DATA = {
  profile: {
    username: "Guest",
    xp: 0,
    badges: [],
    created: new Date().toISOString(),
  },
  scores: {
    quickServe: [],
    infinity: [],
    story: [],
  },
  settings: {
    mute: false,
    difficulty: "normal",
    theme: "default",
    textSize: "normal",
  },
  storyProgress: {
    chapter: 0,
    seenPanels: [],
  },
  stats: {
    quickServe: { problemsSolved: 0, sessions: 0 },
    infinity: { timeSpent: 0 },
    story: { completions: 0 },
  },
  unlocked: {
    themes: ["default"],
    cones: ["vanilla"],
  },
  music: {
    favorites: [],
  },
  devFlags: {
    cheatsEnabled: false,
    build: "v0.1",
  },
};

function loadSavedData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_DATA;
  } catch (err) {
    return DEFAULT_DATA;
  }
}

class AppState {
  data = loadSavedData();

  constructor() {
    makeAutoObservable(this);
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toJS(this.data)));
  }

  setSetting(key, value) {
    this.data.settings[key] = value;
    this.save();
  }

  getSetting(key) {
    return this.data.settings[key];
  }

  addXP(amount) {
    this.data.profile.xp += amount;
    this.checkForBadges();
    this.save();
  }

  checkForBadges() {
    const xp = this.data.profile.xp;
    const badges = this.data.profile.badges;

    if (xp >= 10 && !badges.includes("first_steps")) {
      this.unlockBadge("first_steps");
    }

    if (xp >= 100 && !badges.includes("math_zen")) {
      this.unlockBadge("math_zen");
    }
  }

  unlockBadge(badgeId) {
    if (!this.data.profile.badges.includes(badgeId)) {
      this.data.profile.badges.push(badgeId);
      this.save();
    }
  }

  saveScore(mode, score, initials = "???") {
    const entry = { score, initials, date: new Date().toISOString() };
    const scores = this.data.scores[mode] || [];
    scores.push(entry);
    this.data.scores[mode] = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    this.save();
  }

  reset() {
    this.data = structuredClone(DEFAULT_DATA);
    this.save();
  }
}

export const appState = new AppState();
