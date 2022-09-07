/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        handlee: 'Handlee',
        sans: 'Roboto, sans-serif',
      },
      colors: {
        green: {
          400: '#81B29A',
        },
        blue: {
          400: '#3E405B',
        },
        white: {
          200: '#F4F1DE',
        },
      },
    },
  },
  plugins: [],
}
