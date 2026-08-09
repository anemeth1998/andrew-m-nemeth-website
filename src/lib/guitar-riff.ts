/**
 * Plays the user-provided riff audio (extracted from their video).
 */

let audioEl: HTMLAudioElement | null = null;
let playing = false;

function getAudio() {
  if (typeof window === "undefined") return null;
  if (!audioEl) {
    audioEl = new Audio();
    // Prefer ogg where supported; mp3 as broad fallback
    audioEl.preload = "auto";
    // Try mp3 first for Safari compatibility
    audioEl.src = "/horns-riff.mp3";
  }
  return audioEl;
}

/** Play the uploaded riff when `\m/` is clicked. */
export async function playDevilHornsRiff() {
  const el = getAudio();
  if (!el) return;
  if (playing) {
    // restart if already going
    el.currentTime = 0;
  }

  playing = true;
  try {
    el.currentTime = 0;
    await el.play();
  } catch {
    // Autoplay policies / missing file — fail quietly
    playing = false;
    return;
  }

  const onEnd = () => {
    playing = false;
    el.removeEventListener("ended", onEnd);
  };
  el.addEventListener("ended", onEnd);
}
