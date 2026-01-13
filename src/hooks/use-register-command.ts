import { useVoiceStore, type VoiceCommand } from '@/data/store/voice_store';
import { useEffect, useRef } from 'react';

// Kita exclude 'id' karena id digenerate otomatis oleh store
export type CommandInput = Omit<VoiceCommand, 'id'>;

export const useRegisterCommands = (commands: CommandInput[]) => {
  const register = useVoiceStore((state) => state.registerCommands);
  const unregister = useVoiceStore((state) => state.unregisterCommands);

  // Ref digunakan untuk melacak ID perintah yang didaftarkan oleh komponen ini
  const registeredIds = useRef<string[]>([]);

  useEffect(() => {
    // 1. Siapkan command dengan ID sementara (store akan me-regenerate ID yg valid,
    // tapi kita perlu mechanism untuk tahu perintah mana yang punya komponen ini).
    // Cara lebih aman: Biarkan store generate ID dan store mengembalikannya, 
    // TAPI karena keterbatasan ref zustand di hook effect, kita pakai pendekatan mount/unmount sederhana.

    // Kita wrap input user agar sesuai struktur yang diminta store
    register(commands);

    // Kita ambil ID dari state terbaru (ini agak tricky di React strict mode),
    // jadi solusi terbaiknya adalah: Store menerima commands tanpa ID,
    // lalu saat unmount, kita meminta unregister berdasarkan referensi atau ID yg kita generate di sini.

    // REVISI PENDEKATAN AGAR AMAN:
    // Kita generate ID di sisi client hook ini saja agar bisa di-track untuk unmount.
    const commandsWithId = commands.map(c => ({
      ...c,
      id: Math.random().toString(36).substring(7) // Generate ID di sini
    }));

    // Register versi yang sudah punya ID (kita perlu tweak sedikit type di store agar nerima yg udh ada ID)
    // Tapi agar konsisten dengan store langkah 1, kita tweak sedikit logic di bawah:

    // --- WORKAROUND SIMPEL ---
    // Kita manipulasi store.registerCommands sedikit di file store agar menerima command UTUH (termasuk ID)
    // Jika Anda pakai kode Store di atas, ubah sedikit logic registerCommands di store agar menerima 'VoiceCommand[]'

    // Asumsi Store sudah diubah menerima command + ID (lihat catatan di bawah):
    // @ts-ignore (Sementara ignore TS jika tipe store belum diupdate)
    useVoiceStore.getState().registerCommands(commandsWithId); // Akses langsung state untuk register

    registeredIds.current = commandsWithId.map(c => c.id);

    // Cleanup: Hapus perintah saat komponen hilang
    return () => {
      unregister(registeredIds.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency: Hanya jalan saat mount/unmount komponen
};