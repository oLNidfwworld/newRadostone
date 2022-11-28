const defaultTheme = require('tailwindcss/defaultTheme');
const colorTheme = require('./src/config/tailwind.conf').colorTheme;
const spacingTheme = require('./src/config/tailwind.conf').spacingTheme;
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{pug,html,js}"],
  important: true,
  purge: false,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      spacing:{
        '130px':'130px'
      },
      width: {
        ...defaultTheme.width,
        fit: 'fit-content'
      },
      height: {
        ...defaultTheme.height,
        fit: 'fit-content'
      }
    },
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        // lg: "1280px",
        // xl: "1400px",
      }
    },
    screens: {
      'xs': '320px',
      'sm': '480px',
      'md': '720px',
      'lg': '1024px',
      'llg':'1280px',
      'xl': '1440px',
    },
    spacing: {
      ...spacingTheme,
    },
    colors: {
      'black':'var(--black)',
      'white':'var(--white)',
      'gray':'var(--gray)',
      'light-gray':'var(--light-gray)',
      'rad':'var(--rad)',
      'transparent':'var(--transparent)',
    },
    borderColor: {
      ...colorTheme,
    },
    backgroundColor: {
      ...colorTheme,
    },
    fontSize: {
      '90px':'90px',
      '70px':'70px',
      '60px':'60px',
      '56px':'56px',
      '54px':'54px',
      '50px':'50px',
      '40px':'40px',
      '32px':'32px',
      '30px':'30px',
      '28px':'28px',
      '24px':'24px',
      '21px':'21px',
      '20px':'20px',
      '18px':'18px',
      '16px':'16px',
      '12px':'12px',
    },
    lineHeight: {
      ...defaultTheme.lineHeight,
      tight: '1.2',
      relaxed: '1.6',
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          padding:'0 15px',
          '@screen xs': {
          },
          '@screen sm': {
            maxWidth: '480px',
            padding:'0 30px',
            margin:'auto'
          },
          '@screen md': {
            maxWidth: '720px',
            padding:'0 28px',
          },
          '@screen lg': {
            maxWidth: '980px', 
            padding:'0 33px',
          },
          '@screen llg': {
            maxWidth: '1280px',  
          },
          '@screen xl': {
            maxWidth: '1440px',
            padding:'0px'
          },

        }
      })
    })
  ],
}
