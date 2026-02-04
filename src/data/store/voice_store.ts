import { create } from 'zustand';

export type VoiceCommand = {
  id: string;
  pattern: RegExp;
  action: (args: string[]) => void;
  description: string;
  priority?: number;
};

interface VoiceState {
  commands: VoiceCommand[];
  isListening: boolean;
  isSystemSpeaking: boolean; // <--- State Baru
  lastTranscript: string;
  isActive: boolean;
  pauseConfig: {
    comma: number;
    sentence: number;
  }

  // Actions
  setIsListening: (status: boolean) => void;
  setTranscript: (text: string) => void;
  registerCommands: (cmds: VoiceCommand[] | Omit<VoiceCommand, 'id'>[]) => void;
  unregisterCommands: (ids: string[]) => void;
  processTranscript: (text: string) => void;
  setIsActive: (status: boolean) => void,

  // Pindahkan fungsi speak ke sini agar bisa akses state
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

export const useVoiceStore = create<VoiceState>((set, get) => {
  let latestSpeechId = 0;
  return {
    commands: [],
    isListening: false,
    isActive: false,
    isSystemSpeaking: false, // Default mati
    lastTranscript: '',
    pauseConfig: {
      comma: 100,
      sentence: 200
    },

    setIsListening: (status) => set({ isListening: status }),
    setIsActive: (status) => set({ isActive: status }),
    setTranscript: (text) => set({ lastTranscript: text }),

    registerCommands: (newCmds) => set((state) => {
      const processedCmds = newCmds.map(c => {
        if ('id' in c) {
          return c as VoiceCommand;
        }
        return {
          ...c,
          id: Math.random().toString(36).substring(7)
        };
      });

      return {
        commands: [...state.commands, ...processedCmds]
      };
    }),

    unregisterCommands: (ids) => set((state) => ({
      commands: state.commands.filter((c) => !ids.includes(c.id))
    })),

    processTranscript: (transcript) => {
      if (get().isSystemSpeaking) {
        console.log("Diabaikan: Sistem sedang bicara.");
        return;
      }

      const { commands } = get();
      const cleanText = transcript.toLowerCase().replace(/[?!]/g, "").replace(/\.$/g, "").trim();
      console.log("Mendengar:", cleanText);

      if (cleanText === 'bantuan') {
        const cmds = get().commands
        const desc = "Perintah tersedia..." + cmds.map((c, i) => `${i + 1}. ${c.description}`).join('. ')
        get().speak(desc)
        console.log(cmds)
        return;
      }

      const sortedCommands = [...commands].sort((a, b) => (b.priority || 0) - (a.priority || 0))

      for (const cmd of sortedCommands) {
        const match = cleanText.match(cmd.pattern);
        if (match) {
          const args = match.slice(1);
          cmd.action(args);
          return;
        }
      }
    },

    speak: (text: string) => {
      if (!window.speechSynthesis) return;
      if (window.speechSynthesis.paused) window.speechSynthesis.resume()
      // if (get().isSystemSpeaking) return;
      const currentId = ++latestSpeechId;
      // Hentikan suara sebelumnya
      window.speechSynthesis.cancel();
      set({ isSystemSpeaking: true });

      setTimeout(() => {
        if (currentId !== latestSpeechId) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.85; // Sedikit lebih cepat agar natural

        // Handler ketika selesai bicara
        const onComplete = () => {
          if (currentId !== latestSpeechId) return;
          set({ isSystemSpeaking: false });
        };

        utterance.onend = onComplete;
        utterance.onerror = (e) => {
          console.error("TTS Error:", e);
          if (e.error === "not-allowed") console.log("menunggu interaksi user")
          onComplete();
        };

        try {
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.error("Speech Failed", err);
          onComplete();
        }
      }, 50);
    },
    stopSpeaking: () => {
      window.speechSynthesis.cancel();
      set({ isSystemSpeaking: false });
    }
  }
});