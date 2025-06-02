// /src/sceneManager.js (Vite version)

let deferredPrompt = null;

export function hideAllScreens() {
  document.querySelectorAll('main > section').forEach(el => {
    el.style.display = 'none';
  });
  document.querySelector('.menu-wrapper')?.style.display = 'none';
}

export function loadInitialView() {
  hideAllScreens();
  document.querySelector('.menu-wrapper')?.style.display = 'flex';
}

export function startMode(modeName) {
  hideAllScreens();

  const id = `${modeName}Container`;
  const container = document.getElementById(id);
  if (container) container.style.display = 'block';

  if (modeName === "quickServe") {
    if (typeof generateProblem === 'function') generateProblem();
  }

  if (modeName === "infinity") {
    if (typeof initInfinityMode === 'function') initInfinityMode();
  }

  if (modeName === "story") {
    if (typeof loadStory === 'function') loadStory();
  }
}

export function exitToMenu() {
  hideAllScreens();
  document.querySelector('.menu-wrapper')?.style.display = 'flex';
}

export function loadTransition(targetMode) {
  console.log(`🌀 Transitioning to: ${targetMode}`);
  setTimeout(() => {
    startMode(targetMode);
  }, 400);
}

export function resetModeState() {
  console.log("Resetting current mode state...");
  // Add per-mode cleanup here
}

export function isIOS() {
  return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

export function showInstallLabel() {
  const label = document.querySelector('.menu-label.install');
  if (label) label.style.display = 'flex';
}

export function handleInstallClick() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') console.log('Installed 🎉');
      deferredPrompt = null;
    });
  } else if (isIOS()) {
    alert("To install on iPhone:\n1. Tap the Share icon (⬆️)\n2. Choose 'Add to Home Screen'");
  } else {
    alert("Install not supported on this browser.");
  }
}

export function openCosmicModal() {
  document.getElementById('cosmicModal')?.classList.remove('hidden');
}

export function closeCosmicModal() {
  document.getElementById('cosmicModal')?.classList.add('hidden');
}

export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallLabel();
  });
}

export function preventDoubleTapZoom() {
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (e) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

// Optional: export this in case you want to hook from outside
export { startMode }
