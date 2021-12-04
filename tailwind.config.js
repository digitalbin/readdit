const spacing = 

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      default: '#111',
      subtle: '#808080',
      inverse: '#fff',
    },
    backgroundColor: {
      default: '#fff',
      subtle: '#f1f2f3',
      inverse: '#111',
    },
    fontSize: {
      tall: ['18px', '135%'],
      default: ['15px', '140%'],
      tiny: ['12px', '150%'],
    },
    fontWeight: {
      regular: '400',
      bold: '700',
    },
    borderColor: {
      DEFAULT: '#E1E1E1'
    },
    borderRadius: {
      DEFAULT: '1rem',
      full: '9999px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
