// /src/main.js
import {
  hideAllScreens,
  startQuickServe,
  startInfinityMode,
  startMathTips,
  openMusicPlayer,
  openCosmicModal,
  closeCosmicModal,
  setupInstallPrompt,
  preventDoubleTapZoom,
  handleInstallClick,
} from "./sceneManager.js";

import { appState } from "./stores/appState.js";
import {
  playTrack,
  togglePlayPause,
  nextTrack,
  prevTrack,
  rewindTrack,
  fastForwardTrack,
  toggleLoop
} from "./musicManager.js";

// 🧠 Wire up UI Elements
window.appState = appState; // optional: console access

setupInstallPrompt();
preventDoubleTapZoom();

// 🌈 Grid button logic
document.querySelector(".menu-label.kids")?.addEventListener("click", () => startMathTips());
document.querySelector(".menu-label.quick")?.addEventListener("click", () => startQuickServe());
document.querySelector(".menu-label.tips")?.addEventListener("click", () => startMathTips());
document.querySelector(".menu-label.story")?.addEventListener("click", () => startMathTips()); // swap this when story ready
document.querySelector(".menu-label.infinity")?.addEventListener("click", () => startInfinityMode());
document.querySelector(".menu-label.install")?.addEventListener("click", () => openCosmicModal());

// 🎛️ Cosmic Modal Tabs
document.querySelector(".close-modal")?.addEventListener("click", () => closeCosmicModal());

document.querySelectorAll(".tab-header button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.getAttribute("data-tab");

    document.querySelectorAll(".tab-header button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".tab-content").forEach((el) => el.classList.add("hidden"));
    document.getElementById(`tab-${tab}`)?.classList.remove("hidden");
  });
});

// 🎶 Music Player Controls
window.playTrack = playTrack;
window.togglePlayPause = togglePlayPause;
window.nextTrack = nextTrack;
window.prevTrack = prevTrack;
window.rewindTrack = rewindTrack;
window.fastForwardTrack = fastForwardTrack;
window.toggleLoop = toggleLoop;

// 📂 Manual Save / Load
document.getElementById("downloadSaveBtn")?.addEventListener("click", () => {
  const data = JSON.stringify(appState.data);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "snowcone_save.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("uploadSaveInput")?.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    appState.data = parsed;
    appState.save();
    alert("Save file loaded! Refresh the page to apply it.");
  } catch (err) {
    alert("⚠️ Invalid file. Please select a valid SnowCone save file (.json).");
  }
});

// 🔊 Mute Toggle
const muteBtn = document.getElementById("toggleSoundBtn");
if (muteBtn) {
  const updateMuteUI = () => {
    const mute = appState.getSetting("mute");
    muteBtn.textContent = mute ? "Unmute Sound 🔊" : "Mute Sound 🔇";
    Howler.mute(mute);
  };

  updateMuteUI();

  muteBtn.addEventListener("click", () => {
    const current = appState.getSetting("mute");
    appState.setSetting("mute", !current);
    updateMuteUI();
  });
}

// ✨ Title = Info Modal
window.openInfoModal = () => {
  document.getElementById("infoModal")?.classList.remove("hidden");
};
window.closeInfoModal = () => {
  document.getElementById("infoModal")?.classList.add("hidden");
};
