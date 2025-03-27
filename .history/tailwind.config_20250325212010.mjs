/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}'], // ✅ Scan all your App Router pages
	theme: {
	  extend: {}, // Optional for custom colors, fonts, etc.
	},
	plugins: [require('@tailwindcss/typography')], // ✅ This adds the "prose" class
  };
  