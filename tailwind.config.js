module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#4caf50'
      }
    }
  },
  plugins: []
};
