/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAF7F2',
          DEFAULT: '#F4F0E8',
          dark: '#EBE5DA',
        },
        stone: {
          50: '#FDFBF7',
          100: '#F7F4EE',
          200: '#EBE4D8',
          300: '#D8CEBE',
          400: '#BDB19F',
          500: '#9E907E',
          600: '#7F7261',
          700: '#5F5447',
          800: '#3D362D',
          900: '#221E19',
          950: '#14120F',
        },
        bronze: {
          light: '#DFBA9D',
          DEFAULT: '#C29B7F',
          dark: '#9A7156',
        },
        charcoal: {
          DEFAULT: '#1B1715',
          light: '#2E2825',
          dark: '#110E0D',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'extra-wide': '0.35em',
        'mega-wide': '0.45em',
      },
      boxShadow: {
        'luxury-soft': '0 20px 40px -15px rgba(27, 23, 21, 0.08)',
        'luxury-card': '0 30px 60px -20px rgba(27, 23, 21, 0.15)',
        'luxury-floating': '0 40px 80px -25px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
