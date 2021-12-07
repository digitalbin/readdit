const spacing = 

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      default: '#111',
      subtle: '#404040',
      inverse: '#fff',
    },
    backgroundColor: {
      default: '#fff',
      subtle: '#eee',
      inverse: '#111',
      foreground: '#fafafa'
    },
    fontSize: {
      tall: ['18px', '140%'],
      default: ['15px', '140%'],
      tiny: ['12px', '150%'],
      labelTiny: ['12px', '100%']
    },
    fontWeight: {
      regular: '400',
      bold: '600',
    },
    borderColor: {
      DEFAULT: '#eee',
      black: '#111',
      transparent: 'transparent',
    },
    borderRadius: {
      DEFAULT: '1.5rem',
      full: '9999px'
    },
    maxWidth: {
      lg: '600px',
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
