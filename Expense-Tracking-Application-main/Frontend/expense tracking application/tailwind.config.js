// --- UPDATE THIS FILE: tailwind.config.js ---

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // <<<--- THIS IS THE KEY CONFIGURATION --- >>>
  // This tells Tailwind to apply dark mode styles whenever the 'dark' class
  // is present on the <html> element.
  darkMode: 'class',
  theme: {
    extend: {
      // You can define your project's primary colors here
      colors: {
        primary: '#875cf5', // Example primary color
      },
    },
  },
  plugins: [],
}