/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#1a202c', // Dark gray or custom color
        secondary: '#ed64a6', // Light pink or custom color
      },
      spacing: {
        8: '2rem',
        6: '1.5rem',
        4: '1rem',
      },
      fontSize: {
        '3xl': '1.875rem',
      },
    },
  },
  plugins: [],
};
