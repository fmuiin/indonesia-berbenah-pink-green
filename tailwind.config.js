/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brave-pink': '#E44C99',
        'hero-green': '#01A923',
        'resistance-blue': '#0D1E91',
      }
    },
  },
  plugins: [],
}
