/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'vh-100': '100vh',
      },
      width: {
        'vw-60': '60vw',
        '32rem': '32rem',
      },
    },
  },
  plugins: [],
}

