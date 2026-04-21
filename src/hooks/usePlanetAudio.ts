import { useCallback, useEffect, useRef } from "react";

/* =====================================================================
   usePlanetAudio — synthesized ambient sound for planet selector
   - whoosh: short filtered noise sweep on switch
   - hum: low sine + detuned saw drone while a planet is focused
   No external assets. Respects prefers-reduced-motion + user gesture.
   ===================================================================== */

export function usePlanetAudio(enabled: boolean = true) {
  const ctxRef = useRef<AudioContext | null>(null);
  const humNodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    filter: BiquadFilterNode;
    gain: GainNode;
  } | null>(null);
  const startedRef = useRef(false);

  const ensureCtx = useCallback(() => {
    if (!enabled) return null;
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }, [enabled]);

  /** Short filtered-noise whoosh — call on planet switch */
  const playWhoosh = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    // noise buffer
    const dur = 0.55;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.4;
    filter.frequency.setValueAtTime(280, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + 0.32);
    filter.frequency.exponentialRampToValueAtTime(420, now + dur);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.13, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start(now);
    src.stop(now + dur);
  }, [ensureCtx]);

  /** Start the persistent low hum (called once after first interaction) */
  const startHum = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx || humNodesRef.current) return;

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 55; // deep root

    const osc2 = ctx.createOscillator();
    osc2.type = "sawtooth";
    osc2.frequency.value = 82.5; // a fifth above, detuned
    osc2.detune.value = -8;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 320;
    filter.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.value = 0; // start silent, fade in via setHumActive

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain).connect(ctx.destination);

    osc1.start();
    osc2.start();

    humNodesRef.current = { osc1, osc2, filter, gain };
  }, [ensureCtx]);

  /** Tune hum to active planet (different hue → slight pitch shift) */
  const tuneHum = useCallback((hue: number) => {
    const nodes = humNodesRef.current;
    const ctx = ctxRef.current;
    if (!nodes || !ctx) return;
    const now = ctx.currentTime;
    // map hue 0..360 → root 48..62 Hz
    const root = 48 + (hue / 360) * 14;
    nodes.osc1.frequency.cancelScheduledValues(now);
    nodes.osc2.frequency.cancelScheduledValues(now);
    nodes.osc1.frequency.linearRampToValueAtTime(root, now + 0.6);
    nodes.osc2.frequency.linearRampToValueAtTime(root * 1.5, now + 0.6);
  }, []);

  /** Fade hum in/out — hum is active whenever a planet is focused (always true here) */
  const setHumActive = useCallback((active: boolean) => {
    const nodes = humNodesRef.current;
    const ctx = ctxRef.current;
    if (!nodes || !ctx) return;
    const now = ctx.currentTime;
    nodes.gain.gain.cancelScheduledValues(now);
    nodes.gain.gain.linearRampToValueAtTime(active ? 0.035 : 0, now + 1.2);
  }, []);

  /** Call from a user gesture (click) to unlock audio + start hum */
  const unlock = useCallback(() => {
    if (startedRef.current) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    startedRef.current = true;
    startHum();
    setHumActive(true);
  }, [ensureCtx, startHum, setHumActive]);

  // cleanup
  useEffect(() => {
    return () => {
      const nodes = humNodesRef.current;
      if (nodes) {
        try { nodes.osc1.stop(); nodes.osc2.stop(); } catch { /* noop */ }
      }
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { playWhoosh, tuneHum, setHumActive, unlock };
}
