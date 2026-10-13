// "Ma'alot" — an original piece for the five Levi'im instruments, played by
// a small WebAudio synthesizer. No audio files: the lyre and harp are
// plucked strings (Karplus–Strong), the pipe and trumpet are filtered
// oscillators, the cymbals are shaped noise. Sixteen bars in D Ahava Rabbah
// (D Eb F# G A Bb C), 76 bpm, looping. Each instrument can be muted and
// mixed independently so the piece grows as the player climbs.
(function () {
  const BPM = 76, BEATS = 4, BARS = 16;
  const SPB = 60 / BPM;                 // seconds per beat
  const LOOP = BARS * BEATS * SPB;      // seconds per loop
  const N = (m) => 440 * Math.pow(2, (m - 69) / 12);

  // Chord per bar (root MIDI numbers in octave 2 for the bass; chord tones for the harp).
  //            1      2      3      4      5      6      7      8      9     10     11     12     13     14     15     16
  const CHORDS = ["D", "D", "Gm", "D", "Eb", "D", "Gm", "D", "Gm", "Cm", "Eb", "D", "Gm", "D", "A7", "D"];
  const TONES = {   // chord tones in octave 4 (harp) — [root, third, fifth, octave]
    D: [62, 66, 69, 74], Gm: [67, 70, 74, 79], Eb: [63, 67, 70, 75], Cm: [60, 63, 67, 72], A7: [57, 61, 64, 67],
  };
  const BASS = { D: [38, 45], Gm: [43, 50], Eb: [39, 46], Cm: [48, 43], A7: [45, 40] };  // [root, fifth-ish]

  // Melody for the chalil: [bar(1-based), beat(0-based), beats, midi]
  const CHALIL = [
    [1,0,2,62],[1,2,1,66],[1,3,1,67],   [2,0,2,69],[2,2,1,67],[2,3,1,66],   [3,0,1.5,67],[3,1.5,.5,69],[3,2,1,70],[3,3,1,69],   [4,0,2,66],[4,2,2,62],
    [5,0,1,63],[5,1,1,62],[5,2,1,63],[5,3,1,66],   [6,0,2,69],[6,2,1,67],[6,3,1,66],   [7,0,1,67],[7,1,1,70],[7,2,1,69],[7,3,1,67],   [8,0,3,66],
    [9,0,1,70],[9,1,1,69],[9,2,1,67],[9,3,1,69],   [10,0,1.5,72],[10,1.5,.5,70],[10,2,1,69],[10,3,1,67],   [11,0,2,70],[11,2,1,67],[11,3,1,63],   [12,0,2,66],[12,2,1,69],[12,3,1,74],
    [13,0,1,74],[13,1,1,72],[13,2,1,70],[13,3,1,69],   [14,0,1,67],[14,1,1,66],[14,2,1,63],[14,3,1,62],   [15,0,1.5,66],[15,1.5,.5,67],[15,2,1,69],[15,3,1,73],   [16,0,3,62],
  ];
  // Trumpet calls: sparse, at phrase ends.
  const CHATZOTZRA = [
    [4,2,.5,69],[4,2.5,1.5,74],   [8,2,.5,69],[8,2.5,1.5,74],   [12,0,1,74],[12,1,1,69],[12,2,2,74],   [15,2,1,69],[15,3,1,73],[16,0,3,74],
  ];
  // Cymbals: crash on phrase downbeats, a soft tick on beat 3 of every bar.
  const TZILTZEL = [];
  for (let b = 1; b <= BARS; b++) { if ((b - 1) % 4 === 0) TZILTZEL.push([b, 0, 1, "crash"]); TZILTZEL.push([b, 2, 1, "tick"]); if (b % 4 === 0) TZILTZEL.push([b, 3.5, 1, "tick"]); }
  // Harp arpeggio pattern over the chord tones (eighth notes).
  const ARP = [0, 1, 2, 3, 2, 1, 0, 1];

  let ctx = null, master = null, out = null, reverb = null, buses = [], timer = null;
  let playing = false, loopStart = 0, nextBar = 0, mix = [true, false, false, false, false], vols = [0.7, 0.7, 0.7, 0.7, 0.7];
  const pluckCache = new Map();

  function ensure() {
    if (ctx) return true;
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return false; }
    master = ctx.createGain(); master.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.01; comp.release.value = 0.25;
    reverb = ctx.createConvolver(); reverb.buffer = impulse(1.8, 2.2);
    const wet = ctx.createGain(); wet.gain.value = 0.28;
    const dry = ctx.createGain(); dry.gain.value = 1;
    master.connect(dry).connect(comp); master.connect(reverb).connect(wet).connect(comp); comp.connect(ctx.destination);
    buses = [0, 1, 2, 3, 4].map((i) => { const g = ctx.createGain(); g.gain.value = mix[i] ? vols[i] : 0; g.connect(master); return g; });
    out = master;
    return true;
  }
  function impulse(seconds, decay) {
    const rate = ctx.sampleRate, len = Math.floor(rate * seconds), buf = ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return buf;
  }

  /* Karplus–Strong plucked string, rendered once per pitch and cached. */
  function pluck(freq, seconds, bright) {
    const key = freq.toFixed(2) + ":" + bright;
    if (pluckCache.has(key)) return pluckCache.get(key);
    const rate = ctx.sampleRate, len = Math.floor(rate * seconds), buf = ctx.createBuffer(1, len, rate), d = buf.getChannelData(0);
    const period = Math.max(2, Math.round(rate / freq)), ring = new Float32Array(period);
    for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
    // Lightly lowpass the excitation so the attack isn't harsh.
    for (let k = 0; k < (bright ? 1 : 3); k++) for (let i = 1; i < period; i++) ring[i] = 0.5 * (ring[i] + ring[i - 1]);
    const damp = bright ? 0.996 : 0.992;
    let idx = 0;
    for (let i = 0; i < len; i++) {
      const cur = ring[idx], nxt = ring[(idx + 1) % period];
      const v = damp * 0.5 * (cur + nxt);
      ring[idx] = v; d[i] = cur; idx = (idx + 1) % period;
    }
    pluckCache.set(key, buf);
    return buf;
  }
  function playPluck(bus, freq, t, dur, gain, bright) {
    const src = ctx.createBufferSource(); src.buffer = pluck(freq, Math.min(3, dur + 1.2), bright);
    const g = ctx.createGain(); g.gain.setValueAtTime(gain, t); g.gain.setTargetAtTime(0.0001, t + dur, 0.12);
    src.connect(g).connect(bus); src.start(t); src.stop(t + dur + 0.6);
  }
  /* Pipe (oboe-like): two detuned saws through a lowpass, slow vibrato. */
  function playPipe(bus, freq, t, dur, gain) {
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(); o1.type = "sawtooth"; o2.type = "sawtooth";
    o1.frequency.value = freq; o2.frequency.value = freq * 1.004;
    const lfo = ctx.createOscillator(), lfoG = ctx.createGain(); lfo.frequency.value = 5.2; lfoG.gain.setValueAtTime(0, t); lfoG.gain.linearRampToValueAtTime(freq * 0.006, t + 0.35);
    lfo.connect(lfoG); lfoG.connect(o1.frequency); lfoG.connect(o2.frequency);
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = Math.min(2600, freq * 4.5); f.Q.value = 1.6;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.07); g.gain.setValueAtTime(gain, t + dur - 0.08); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.06);
    o1.connect(f); o2.connect(f); f.connect(g).connect(bus);
    o1.start(t); o2.start(t); lfo.start(t); o1.stop(t + dur + 0.1); o2.stop(t + dur + 0.1); lfo.stop(t + dur + 0.1);
  }
  /* Trumpet: saw + square into a filter whose cutoff opens on the attack. */
  function playBrass(bus, freq, t, dur, gain) {
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(); o1.type = "sawtooth"; o2.type = "square"; o1.frequency.value = freq; o2.frequency.value = freq * 0.5;
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.Q.value = 2.2; f.frequency.setValueAtTime(500, t); f.frequency.exponentialRampToValueAtTime(Math.min(3200, freq * 6), t + 0.09); f.frequency.setTargetAtTime(Math.min(2200, freq * 4), t + 0.15, 0.3);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.035); g.gain.setValueAtTime(gain * 0.85, t + 0.2); g.gain.setValueAtTime(gain * 0.85, t + dur - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.12);
    const sq = ctx.createGain(); sq.gain.value = 0.35;
    o1.connect(f); o2.connect(sq).connect(f); f.connect(g).connect(bus);
    o1.start(t); o2.start(t); o1.stop(t + dur + 0.2); o2.stop(t + dur + 0.2);
  }
  /* Cymbals: shaped noise. */
  let noiseBuf = null;
  function noise() { if (noiseBuf) return noiseBuf; const len = ctx.sampleRate * 2, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; noiseBuf = b; return b; }
  function playCymbal(bus, t, kind, gain) {
    const src = ctx.createBufferSource(); src.buffer = noise();
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = kind === "crash" ? 4500 : 7000;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = kind === "crash" ? 8500 : 10500; bp.Q.value = kind === "crash" ? 0.7 : 1.4;
    const g = ctx.createGain(); const decay = kind === "crash" ? 1.6 : 0.09;
    g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    src.connect(hp).connect(bp).connect(g).connect(bus); src.start(t); src.stop(t + decay + 0.05);
  }

  /* ─── Scheduling ─────────────────────────────────────────────────── */
  function scheduleBar(barIdx, t0) {
    const bar = (barIdx % BARS) + 1, chord = CHORDS[bar - 1];
    // Nevel (lyre): root on 1, fifth on 3, a lead-in eighth before the next bar.
    const [root, fifth] = BASS[chord];
    playPluck(buses[0], N(root), t0, 1.8 * SPB, 0.55, false);
    playPluck(buses[0], N(fifth), t0 + 2 * SPB, 1.6 * SPB, 0.42, false);
    if (bar % 2 === 0) playPluck(buses[0], N(root + 12), t0 + 3.5 * SPB, 0.5 * SPB, 0.3, false);
    // Kinnor (harp): eighth-note arpeggio over the chord tones.
    const tones = TONES[chord];
    ARP.forEach((ti, k) => playPluck(buses[1], N(tones[ti]), t0 + k * 0.5 * SPB, 0.6 * SPB, 0.26 + (k === 0 ? 0.08 : 0), true));
    // Chalil (pipe): the melody.
    CHALIL.filter((n) => n[0] === bar).forEach(([, beat, beats, m]) => playPipe(buses[2], N(m), t0 + beat * SPB, beats * SPB * 0.96, 0.22));
    // Chatzotzra (trumpet): calls.
    CHATZOTZRA.filter((n) => n[0] === bar).forEach(([, beat, beats, m]) => playBrass(buses[3], N(m), t0 + beat * SPB, beats * SPB * 0.95, 0.2));
    // Tziltzel (cymbals).
    TZILTZEL.filter((n) => n[0] === bar).forEach(([, beat, , kind]) => playCymbal(buses[4], t0 + beat * SPB, kind, kind === "crash" ? 0.35 : 0.08));
  }
  function tick() {
    if (!playing) return;
    const barLen = BEATS * SPB;
    while (loopStart + nextBar * barLen < ctx.currentTime + 0.6) { scheduleBar(nextBar, loopStart + nextBar * barLen); nextBar += 1; }
  }

  const SYNTH = {
    start() {
      if (!ensure()) return;
      if (ctx.state === "suspended") ctx.resume();
      if (playing) return;
      playing = true; loopStart = ctx.currentTime + 0.1; nextBar = 0;
      SYNTH.setMix(mix, vols);
      timer = setInterval(tick, 120); tick();
    },
    stop() {
      if (!playing) return;
      playing = false; clearInterval(timer); timer = null;
      if (ctx) ctx.suspend();
    },
    setMix(flags, volumes) {
      mix = flags.slice(); vols = volumes.slice();
      if (!ctx) return;
      buses.forEach((g, i) => g.gain.setTargetAtTime(mix[i] ? vols[i] * 0.9 : 0, ctx.currentTime, 0.08));
    },
    get playing() { return playing; },
    info: { title: "Ma'alot", bpm: BPM, bars: BARS, seconds: LOOP },
    // Render `seconds` of the piece offline with every instrument on (used by
    // the test harness; returns an AudioBuffer).
    renderOffline(seconds, flags) {
      const saved = { ctx, master, reverb, buses, mix, vols, pluckCache: new Map(pluckCache), noiseBuf };
      ctx = new OfflineAudioContext(2, Math.ceil(44100 * seconds), 44100);
      pluckCache.clear(); noiseBuf = null;
      mix = flags || [true, true, true, true, true]; vols = [0.7, 0.7, 0.7, 0.7, 0.7];
      master = ctx.createGain(); master.gain.value = 0.9;
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.01; comp.release.value = 0.25;
      reverb = ctx.createConvolver(); reverb.buffer = impulse(1.8, 2.2);
      const wet = ctx.createGain(); wet.gain.value = 0.28; const dry = ctx.createGain();
      master.connect(dry).connect(comp); master.connect(reverb).connect(wet).connect(comp); comp.connect(ctx.destination);
      buses = [0, 1, 2, 3, 4].map((i) => { const g = ctx.createGain(); g.gain.value = mix[i] ? vols[i] * 0.9 : 0; g.connect(master); return g; });
      const barLen = BEATS * SPB;
      for (let b = 0; b * barLen < seconds; b++) scheduleBar(b, 0.05 + b * barLen);
      const done = ctx.startRendering();
      return done.finally(() => { ctx = saved.ctx; master = saved.master; reverb = saved.reverb; buses = saved.buses; mix = saved.mix; vols = saved.vols; pluckCache.clear(); saved.pluckCache.forEach((v, k) => pluckCache.set(k, v)); noiseBuf = saved.noiseBuf; });
    },
  };
  window.KODSHIM_SYNTH = SYNTH;
})();
