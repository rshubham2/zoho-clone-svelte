/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'], 
  theme: {
    extend: {
      colors: {
        'primary-dark': '#014372',
        'primary-light': '#054F83',
        'secondary': '#080A0E',
        'background': '#FFFFFF',
        'text': '#080A0E',
      },
    },
  },
  plugins: [],
}