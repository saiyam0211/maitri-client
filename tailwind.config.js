// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DA627D',
        secondary: '#FFA5AB',
        background: '#F9DBBD',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}