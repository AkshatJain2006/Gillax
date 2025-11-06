/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#A66BFF',
        dark: '#1a1a1a',
        silver: '#C0C0C0'
      },
      backdropBlur: {
        xs: '2px'
      },
      animation: {
        'slide-out': 'slideOut 2s ease-in-out forwards',
        'fade-in': 'fadeIn 0.6s ease-in-out 1.2s forwards'
      },
      keyframes: {
        slideOut: {
          '0%': { transform: 'translateX(0) scale(1)', opacity: '1' },
          '70%': { transform: 'translateX(0) scale(1.1)', opacity: '1' },
          '100%': { transform: 'translateX(-100vw) scale(0.8)', opacity: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}