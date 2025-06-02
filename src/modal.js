// /src/modal.js (Vite + MobX Refactor)

import { Howler } from 'howler';
import { appState } from './stores/appState.js';

export function openCosmicModal() {
  document.getElementById('cosmicModal')?.classList.remove('hidden');
}

export function closeCosmicModal() {
  document.getElementById('cosmicModal')?.classList.add('hidden');
}

export function openInfoModal() {
  console.log('📂 Opening Info Modal...');
  document.getElementById('infoModal')?.classList.remove('hidden');
}

export function closeInfoModal() {
  document.getElementById('infoModal')?.classList.add('hidden');
}

export function updateSoundToggleUI() {
  const mute = appState.getSetting('mute') ?? false;
  const btn = document.getElementById('toggleSoundBtn');
  if (btn) btn.textContent = mute ? 'Unmute Sound 🔊' : 'Mute Sound 🔇';
}

export function setupModalEvents() {
  // 🔒 Close Button
  document.querySelector('.close-modal')?.addEventListener('click', closeCosmicModal);

  // 🔄 Tab Buttons
  document.querySelectorAll('.tab-header button').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-header button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
      });
      document.getElementById(`tab-${tab}`)?.classList.remove('hidden');
    });
  });

  // 📂 Info Modal from Title
  document.getElementById('infoTitleBtn')?.addEventListener('click', openInfoModal);

  // 📂 Info Modal Tab Nav (if it ever gets tabbed)
  document.querySelectorAll('#infoModal .tab-header button')?.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('#infoModal .tab-header button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('#infoModal .tab-content').forEach(content => content.classList.add('hidden'));
      document.getElementById(`tab-${tab}`)?.classList.remove('hidden');
    });
  });

  // 💽 Save Button
  document.getElementById('downloadSaveBtn')?.addEventListener('click', () => {
    const data = JSON.stringify(appState.data);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snowcone_save.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // 📤 Upload
  document.getElementById('uploadSaveInput')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      appState.data = parsed;
      appState.save();
      alert('Save file loaded! Refresh the page to apply it.');
    } catch (err) {
      alert('⚠️ Invalid file. Please select a valid SnowCone save file (.json).');
    }
  });

  // 🎚️ Volume Sliders
  const musicSlider = document.getElementById('musicVolume');
  const sfxSlider = document.getElementById('sfxVolume');

  if (musicSlider) {
    musicSlider.value = appState.getSetting('musicVolume') ?? 1;
    musicSlider.addEventListener('input', (e) => {
      const vol = parseFloat(e.target.value);
      appState.setSetting('musicVolume', vol);
      if (typeof setMusicVolume === 'function') setMusicVolume(vol);
    });
  }

  if (sfxSlider) {
    sfxSlider.value = appState.getSetting('sfxVolume') ?? 1;
    sfxSlider.addEventListener('input', (e) => {
      const vol = parseFloat(e.target.value);
      appState.setSetting('sfxVolume', vol);
      if (typeof setSFXVolume === 'function') setSFXVolume(vol);
    });
  }

  // 🔊 Mute Toggle
  document.getElementById('toggleSoundBtn')?.addEventListener('click', () => {
    const isMuted = appState.getSetting('mute') ?? false;
    const newMute = !isMuted;
    appState.setSetting('mute', newMute);
    Howler.mute(newMute);
    updateSoundToggleUI();
  });
}