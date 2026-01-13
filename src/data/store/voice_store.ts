import { create } from 'zustand';

export type VoiceCommand = {
  id: string;
  pattern: RegExp;
  action: (args: string[]) => void;
  description: string;
};

interface VoiceState {
  commands: VoiceCommand[];
  isListening: boolean;
  isSystemSpeaking: boolean; // <--- State Baru
  lastTranscript: string;
  isActive: boolean;
  
  // Actions
  setIsListening: (status: boolean) => void;
  setTranscript: (text: string) => void;
  registerCommands: (cmds: Omit<VoiceCommand, 'id'>[]) => void;
  unregisterCommands: (ids: string[]) => void;
  processTranscript: (text: string) => void;
  setIsActive: (status: boolean) =>void,
  
  // Pindahkan fungsi speak ke sini agar bisa akses state
  speak: (text: string) => void; 
}

export const useVoiceStore = create<VoiceState>((set, get) => ({
  commands: [],
  isListening: false,
  isActive: false,
  isSystemSpeaking: false, // Default mati
  lastTranscript: '',

  setIsListening: (status) => set({ isListening: status }),
  setIsActive: (status) => set({ isActive: status }),
  setTranscript: (text) => set({ lastTranscript: text }),

  registerCommands: (newCmds) => set((state) => ({
    commands: [...state.commands, ...newCmds.map(c => ({ 
      ...c, 
      id: Math.random().toString(36).substring(7) 
    }))]
  })),

  unregisterCommands: (ids) => set((state) => ({
    commands: state.commands.filter((c) => !ids.includes(c.id))
  })),

  processTranscript: (transcript) => {
    if (get().isSystemSpeaking) {
        console.log("Diabaikan: Sistem sedang bicara.");
        return;
    }

    const { commands } = get();
    const cleanText = transcript.toLowerCase().replace(/[.,?!]/g, "").trim();
    console.log("Mendengar:", cleanText);

    if (cleanText === 'bantuan') {
        get().speak("Perintah tersedia...");
        return;
    }

    for (const cmd of commands) {
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

    // Hentikan suara sebelumnya & set state SPEAKING
    window.speechSynthesis.cancel();
    set({ isSystemSpeaking: true }); // <--- Matikan telinga

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1;

    // Saat SELESAI bicara
    utterance.onend = () => {
        set({ isSystemSpeaking: false }); // <--- Nyalakan telinga lagi
    };

    // Saat ERROR (misal dibatalkan paksa), pastikan state kembali false
    utterance.onerror = () => {
        set({ isSystemSpeaking: false });
    };

    window.speechSynthesis.speak(utterance);
  }
}));