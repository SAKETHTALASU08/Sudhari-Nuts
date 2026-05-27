/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette derived from the hero image
        cream: '#FAF5EF',         // Soft warm off-white (blurred background)
        sand: '#E8D9C5',          // Jute beige (burlap sack texture)
        cashew: '#D4A574',        // Cashew gold (the nuts themselves)
        jute: '#C4A882',          // Tan rope/burlap accent
        wood: '#A0774D',          // Warm wood table surface
        roast: '#8B5E3C',         // Roasted cashew brown
        rustic: '#8B2E1B',        // Deep reddish-brown (Shop Now button, chili flakes)
        bark: '#5C3D2E',          // Dark warm brown (logo, headings)
        moss: '#6B7F4A',          // Moss green (ceramic bowl)
        leaf: '#4A7C59',          // Deeper green (success states)
        slate: '#4A4A4A',         // Dark slate surface
        charcoal: '#2D2D2D',      // Black pepper/dark text
        chili: '#C85A3A',         // Chili red (warning accent)
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'count-up': 'countUp 1s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'rustic-gradient': 'linear-gradient(135deg, #8B2E1B 0%, #5C3D2E 100%)',
        'cashew-gradient': 'linear-gradient(135deg, #D4A574 0%, #A0774D 100%)',
        'bark-gradient': 'linear-gradient(135deg, #5C3D2E 0%, #3a2519 100%)',
        'moss-gradient': 'linear-gradient(135deg, #6B7F4A 0%, #4A7C59 100%)',
        'wood-gradient': 'linear-gradient(180deg, #FAF5EF 0%, #E8D9C5 50%, #FAF5EF 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(92, 61, 46, 0.1)',
        'glass-lg': '0 16px 48px 0 rgba(92, 61, 46, 0.15)',
        'rustic': '0 4px 14px 0 rgba(139, 46, 27, 0.25)',
        'cashew': '0 4px 14px 0 rgba(212, 165, 116, 0.3)',
        'bark': '0 4px 14px 0 rgba(92, 61, 46, 0.2)',
        'moss': '0 4px 14px 0 rgba(107, 127, 74, 0.25)',
      },
    },
  },
  plugins: [],
}
