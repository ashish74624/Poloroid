/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add your font families here
        custom: ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

