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
          light: '#FAF8F5',
          DEFAULT: '#F3EFEA',
          dark: '#E8E2D9',
        },
        stone: {
          50: '#FDFCFB',
          100: '#F7F5F2',
          200: '#EAE5DE',
          300: '#D5CCC0',
          400: '#B5A99B',
          500: '#948777',
          600: '#756858',
          700: '#574C3F',
          800: '#3A3229',
          900: '#211C16',
          950: '#13100D',
        },
        bronze: {
          light: '#C7B7A6', // Natural Warm Cashmere / Champagne Stone
          DEFAULT: '#A69280', // Clean Muted Earth Taupe / Warm Titanium
          dark: '#7A6857', // Refined Deep Natural Umber
        },
        charcoal: {
          DEFAULT: '#181513',
          light: '#26221F',
          dark: '#0F0D0C',
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
