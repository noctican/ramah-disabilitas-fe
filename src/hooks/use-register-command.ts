import { useVoiceStore, type VoiceCommand } from '@/data/store/voice_store';
import { useEffect, useRef } from 'react';

// Input dari user tidak butuh ID
export type CommandInput = Omit<VoiceCommand, 'id'>;

export const useRegisterCommands = (commands: CommandInput[]) => {
  const register = useVoiceStore((state) => state.registerCommands);
  const unregister = useVoiceStore((state) => state.unregisterCommands);

  // Ref untuk menyimpan ID yang digenerate agar bisa dihapus saat unmount
  const registeredIds = useRef<string[]>([]);

  useEffect(() => {
    // 1. Generate ID unik di sisi Hook
    const commandsWithId: VoiceCommand[] = commands.map(c => ({
      ...c,
      id: Math.random().toString(36).substring(7) + '-' + Date.now() // Tambah timestamp biar makin unik
    }));

    // 2. Simpan ID ke ref untuk cleanup nanti
    registeredIds.current = commandsWithId.map(c => c.id);

    // 3. Register ke store (Sekarang store akan menghormati ID ini)
    register(commandsWithId);

    // 4. Cleanup saat unmount
    return () => {
      // Hapus berdasarkan ID yang kita buat di langkah 1
      unregister(registeredIds.current);
    };

    // Dependencies: 
    // Jika commands berubah kontennya, kita mau re-register.
    // JSON.stringify trik simpel untuk deep compare array object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(commands)]);
};