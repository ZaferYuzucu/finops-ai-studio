
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // YENİ VE DOĞRU MARKA RENK PALETİ
        'brand-primary-cta': '#007bff',      // Ana Eylem Butonu (Mavi)
        'brand-secondary-cta': '#14b8a6',    // İkincil Eylem Butonu (Canlı Teal)
        'brand-dark-text': '#0A2540',         // Ana Metin Rengi (Koyu Mavi/Siyah)
        
        // İSTEĞİNİZE GÖRE EKLENEN YENİ ARKA PLAN RENKLERİ
        'brand-bg-lightest': '#E6F4F1',  // En Açık Teal (Neredeyse Beyaz)
        'brand-bg-light': '#B0D8D1',     // Açık Teal
        'brand-bg-medium': '#7ABDB1',    // Orta Teal
        'brand-bg-dark': '#45A291',      // Koyu Teal
        'brand-bg-darkest': '#005249',   // En Koyu Teal (Navbar/Footer için ideal)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
