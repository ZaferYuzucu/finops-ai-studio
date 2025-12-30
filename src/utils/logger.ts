/**
 * Production-safe Logger Utility
 * Console.log'lar sadece development ortamında çalışır
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  error: (...args: any[]) => {
    // Hataları production'da da logluyoruz
    console.error(...args);
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

// Production'da tüm console.log'ları devre dışı bırak
if (!isDevelopment) {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  // console.warn ve console.error'u bırakıyoruz
}










