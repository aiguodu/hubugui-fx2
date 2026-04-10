/**
 * TTS Service
 * 
 * 目前使用浏览器原生的 SpeechSynthesis API 作为前端演示的 Fallback。
 * 按照要求，后端接口将由你自行接入。接入时，只需替换 `playTTS` 中的逻辑，
 * 调用你的后端接口（如 /api/tts），并使用 HTMLAudioElement 播放返回的音频流即可。
 */

class TTSService {
  private synth = window.speechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public playTTS(text: string, onStart?: () => void, onEnd?: () => void) {
    this.stop();

    if (!this.synth) {
      console.warn("Browser does not support SpeechSynthesis.");
      onStart?.();
      // Simulate duration based on text length if no TTS available
      setTimeout(() => onEnd?.(), text.length * 200);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.0; // 老师讲课语速适中
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      onEnd?.();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }
}

export const ttsService = new TTSService();
