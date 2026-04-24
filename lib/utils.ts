import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalStore(key: string) {
  const data = localStorage.getItem(key); 
  try {
    if(data) {
      return JSON.parse(data);
    } 
  } catch (error) {
    return null;
  }
}

export function setLocalStore(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function playAudio(value: string, voice: string = "US") {
  return new Promise((resolve) => {
    audioBrowser(value, `en-${voice}`)!.onend = resolve;
  });
}

function audioBrowser(value: string, lang: string) {
  const newvalue = value.replace(/(<([^>]+)>)/gi, "");
  if (!newvalue) return;

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  const msg = new SpeechSynthesisUtterance();

  msg.volume = 1;
  msg.rate = 0.68;
  msg.pitch = 1;
  msg.text = newvalue;
  msg.lang = lang;

  setTimeout(() => {
    const voiceList = speechSynthesis.getVoices();
    const voiceMatch = voiceList.find((item) => item.lang === lang);
    msg.voice = voiceMatch!;
    speechSynthesis.speak(msg);
  }, 10);

  return msg;
}