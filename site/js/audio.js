/* Audio y efectos sonoros con Web Audio API y Síntesis de Voz Amigable para Niños */
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.voices = [];
    this.selectedVoice = null;
    this.loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    if (!('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();
    if (!this.voices || this.voices.length === 0) return;

    // Filtrar voces en español
    const spanishVoices = this.voices.filter(v => v.lang.toLowerCase().startsWith('es'));
    if (spanishVoices.length === 0) return;

    // Buscar voces de máxima calidez y naturalidad:
    // 1. Voces "Natural" de Microsoft (ej. Salma, Dalia, Paloma)
    // 2. Voces de Google (Chrome)
    // 3. Voces de Latinoamérica / Chile (es-CL, es-419, es-MX)
    // 4. Voces femeninas reconocidas por tono dulce
    const naturalVoice = spanishVoices.find(v => {
      const n = v.name.toLowerCase();
      return n.includes('natural') && (n.includes('salma') || n.includes('dalia') || n.includes('paloma') || n.includes('female'));
    }) || spanishVoices.find(v => v.name.toLowerCase().includes('natural'));

    const googleVoice = spanishVoices.find(v => v.name.toLowerCase().includes('google'));
    const chileanVoice = spanishVoices.find(v => v.lang.toLowerCase().includes('es-cl'));
    const latamVoice = spanishVoices.find(v => v.lang.toLowerCase().includes('es-419') || v.lang.toLowerCase().includes('es-mx'));
    
    const femaleVoice = spanishVoices.find(v => {
      const n = v.name.toLowerCase();
      return n.includes('paulina') || n.includes('monica') || n.includes('sofia') || 
             n.includes('helena') || n.includes('laura') || n.includes('sabina') || 
             n.includes('jimena') || n.includes('dalia') || n.includes('salma');
    });

    this.selectedVoice = naturalVoice || googleVoice || chileanVoice || latamVoice || femaleVoice || spanishVoices[0];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      
      // Melodía alegre ascendente (Do - Mi - Sol)
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playWrong() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; // Tono suave tipo campana en vez de sonido robótico

      osc.frequency.setValueAtTime(320, now);
      osc.frequency.setValueAtTime(280, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playWin() {
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do alto
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + (idx * 0.12);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    } catch (e) {
      console.warn("Audio win error:", e);
    }
  }

  speak(text, onStartCallback, onEndCallback) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (!this.selectedVoice) {
      this.loadVoices();
    }

    const utter = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utter.voice = this.selectedVoice;
      utter.lang = this.selectedVoice.lang;
    } else {
      utter.lang = 'es-CL';
    }

    // Tono cálido, alegre, dulce y calmado (estilo tía de colegio / narradora de cuentos)
    utter.rate = 0.92;   // Ritmo pausado y fácil de entender
    utter.pitch = 1.22;  // Tono más agudo, dulce y amigable (evita voz grave o robótica)
    utter.volume = 1.0;

    if (onStartCallback) utter.onstart = onStartCallback;
    if (onEndCallback) utter.onend = onEndCallback;

    window.speechSynthesis.speak(utter);
  }
}

window.soundFx = new SoundEffects();
