import { useEffect, useRef } from "react";

const CHORDS = [
  [130.81, 164.81, 196, 261.63],
  [110, 130.81, 164.81, 220],
  [87.31, 110, 130.81, 174.61],
  [98, 123.47, 146.83, 196],
] as const;

const ARPEGGIO = [0, 2, 1, 3, 2, 1, 0, 1];

export function useAmbientAudio(strength: number) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    if (ctxRef.current) {
      if (ctxRef.current.state === "suspended") {
        void ctxRef.current.resume();
      }
      return;
    }

    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.55 + strength * 0.5;
    masterGain.connect(ctx.destination);
    ctxRef.current = ctx;
    gainRef.current = masterGain;
    void ctx.resume();

    // Warm pad chords
    const playPad = (frequencies: readonly number[]) => {
      const now = ctx.currentTime;
      frequencies.forEach((frequency) => {
        const oscillator = ctx.createOscillator();
        const voiceGain = ctx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        voiceGain.gain.setValueAtTime(0.0001, now);
        voiceGain.gain.exponentialRampToValueAtTime(0.09, now + 0.8);
        voiceGain.gain.setTargetAtTime(0.0001, now + 3.5, 0.5);
        oscillator.connect(voiceGain).connect(masterGain);
        oscillator.start(now);
        oscillator.stop(now + 5);
      });
    };

    // Bass note — root of the chord, one octave down
    const playBass = (rootFrequency: number) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const bassGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = rootFrequency / 2;
      filter.type = "lowpass";
      filter.frequency.value = 400;
      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.exponentialRampToValueAtTime(0.22, now + 0.6);
      bassGain.gain.setTargetAtTime(0.0001, now + 3.2, 0.6);
      osc.connect(filter).connect(bassGain).connect(masterGain);
      osc.start(now);
      osc.stop(now + 4);
    };

    // Arpeggio note — filtered sawtooth for a warmer, "played" timbre
    const playNote = (frequency: number) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const noteGain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = frequency;
      filter.type = "lowpass";
      filter.frequency.value = 1200;
      filter.Q.value = 0.7;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.025);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
      osc.connect(filter).connect(noteGain).connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.6);
    };

    let beat = 0;
    const playBeat = () => {
      const chordIndex = Math.floor(beat / ARPEGGIO.length) % CHORDS.length;
      const chord = CHORDS[chordIndex];
      if (beat % ARPEGGIO.length === 0) {
        playPad(chord);
        playBass(chord[0]);
      }
      playNote(chord[ARPEGGIO[beat % ARPEGGIO.length]] * 2);
      beat += 1;
    };

    playBeat();
    timerRef.current = window.setInterval(playBeat, 550);
  };

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.setTargetAtTime(
        0.55 + strength * 0.5,
        gainRef.current.context.currentTime,
        0.5
      );
    }
  }, [strength]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  return { start };
}