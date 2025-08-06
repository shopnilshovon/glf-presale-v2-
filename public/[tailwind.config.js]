/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#10B981',    // GreenLeaf primary
        secondary: '#1F2937',  // dark gray
        accent: '#34D399',     // softer green
        dark: '#0f172a',       // dark background
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      boxShadow: {
        glow: '0 0 10px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4)',
        neon: '0 0 10px #10B981, 0 0 20px #10B981, 0 0 30px #10B981',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}