const spacing = 

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    spacing: {
      '0': '0px',
      px: '1px',
      xs: '5px',
      sm: '10px',
      md: '15px',
      lg: '20px',
      xl: '30px',
      //larger explicit values 👇
      '90': '90px',
      '160': '160px',
      '400': '400px',
      '600': '600px',
    },
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
      black: '800',
    },
    borderColor: {
      DEFAULT: '#eee',
      black: '#111',
      transparent: 'transparent',
      primary: "#74FF66",
    },
    borderRadius: {
      sm: '1rem',
      DEFAULT: '1.5rem',
      full: '9999px'
    },
    maxWidth: {
      lg: '600px',
    },
    ringColor: {
      primary: "#74FF66",
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
