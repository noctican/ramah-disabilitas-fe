import { useVoiceStore } from '@/data/store/voice_store';
import { useEffect, useRef } from 'react';

export const useVoiceAssistant = () => {
  const {
    isActive,
    isSystemSpeaking,
    setIsListening,
    setTranscript,
    processTranscript
  } = useVoiceStore();

  const recognitionRef = useRef<any>(null);

  // 1. Inisialisasi Recognition Object (Hanya sekali)
  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'id-ID';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    // Saat mic mati otomatis (karena diam), kita restart JIKA kondisi masih memenuhi
    recognition.onend = () => {
      setIsListening(false);
      // Cek state langsung dari store (fresh) untuk menghindari closure lawas
      const state = useVoiceStore.getState();

      // Add delay to prevent rapid restart loops if mic fails repeatedly
      if (state.isActive && !state.isSystemSpeaking) {
        setTimeout(() => {
          const freshState = useVoiceStore.getState();
          if (freshState.isActive && !freshState.isSystemSpeaking) {
            try { recognition.start(); } catch (e) { }
          }
        }, 500);
      }
    };

    recognition.onresult = (event: any) => {
      const text = event.results[event.resultIndex][0].transcript;
      setTranscript(text);
      processTranscript(text);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []); // Dependency kosong

  // 2. EFFECT UTAMA: Pengendali Mic (The Brain)
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    // Logika Inti:
    const shouldListen = isActive && !isSystemSpeaking;

    if (shouldListen) {
      try {
        console.log("Mencoba menyalakan Mic...");
        recognition.start();
      } catch (e) {
        // Error 'already started' biasa terjadi, abaikan
      }
    } else {
      console.log("Mematikan Mic (Entah karena Nonaktif atau Sedang Bicara)");
      recognition.abort(); // Matikan paksa
      setIsListening(false);
    }
  }, [isActive, isSystemSpeaking]); // Jalan setiap kali state ini berubah

  return {}; // Tidak butuh return function lagi
};