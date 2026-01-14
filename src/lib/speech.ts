export const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  
  // Penting: Batalkan suara sebelumnya agar respon cepat dan tidak antri
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID'; // Bahasa Indonesia
  utterance.rate = 1;       // Kecepatan normal
  window.speechSynthesis.speak(utterance);
};