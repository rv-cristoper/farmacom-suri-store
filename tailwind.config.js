/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				background: 'var(--background)',
				'background-secondary': 'var(--background-secondary)',
				foreground: 'var(--foreground)',
				primary: "var(--primary)",
				secondary: "var(--secondary)",
			}
		}
  },
  plugins: [],
}

