// Utility for generating subtle sound effects using Web Audio API

class SoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private playTone(frequency: number, duration: number, volume: number = 0.1, type: OscillatorType = 'sine') {
    if (!this.enabled) return;

    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  // Subtle click sound for buttons and selections
  click() {
    this.playTone(800, 0.05, 0.08, 'sine');
  }

  // Hover sound for interactive elements
  hover() {
    this.playTone(600, 0.03, 0.05, 'sine');
  }

  // Positive feedback for correct answers
  correct() {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;
    
    // Play a pleasant ascending chord
    this.playTone(523.25, 0.15, 0.12, 'sine'); // C
    setTimeout(() => this.playTone(659.25, 0.15, 0.1, 'sine'), 80); // E
    setTimeout(() => this.playTone(783.99, 0.2, 0.08, 'sine'), 160); // G
  }

  // Gentle feedback for incorrect answers
  incorrect() {
    this.playTone(300, 0.2, 0.1, 'sine');
    setTimeout(() => this.playTone(250, 0.25, 0.08, 'sine'), 100);
  }

  // Completion/success sound
  complete() {
    const ctx = this.getAudioContext();
    
    // Triumphant ascending scale
    const notes = [523.25, 587.33, 659.25, 783.99]; // C, D, E, G
    notes.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, 0.2, 0.1, 'sine'), index * 100);
    });
  }

  // Next button sound
  next() {
    this.playTone(880, 0.08, 0.08, 'sine');
  }

  // Reset sound
  reset() {
    this.playTone(440, 0.1, 0.08, 'triangle');
  }

  // Enable/disable sounds
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export const soundEffects = new SoundEffects();
