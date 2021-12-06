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
      border: '#E1E1E1'
    },
    fontSize: {
      tall: ['18px', '140%'],
      default: ['15px', '140%'],
      tiny: ['12px', '150%'],
      labelTiny: ['12px', '100%']
    },
    fontWeight: {
      regular: '400',
      semibold: '500',
      bold: '600',
    },
    borderColor: {
      DEFAULT: '#E1E1E1',
      black: '#111',
      transparent: 'transparent',
    },
    borderRadius: {
      DEFAULT: '1.5rem',
      full: '9999px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
