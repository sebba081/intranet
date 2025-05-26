module.exports = {
  darkMode: 'class', // or 'media' for system preference
  content: [
    './src/**/*.{html,js,ejs}', // Adjust the paths according to your project structure
    './public/**/*.{html,js,ejs}',
  ],
  theme: {
    extend: {
      // Custom theme configurations
    },
  },
  plugins: [],
}