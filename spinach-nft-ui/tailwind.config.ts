import {Config} from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';


const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      '3xl': '1780px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateAreas: {
        'inner-div': [
          'inner-div',
        ],
      },
      boxShadow: {
        'border': 'inset 0 0 0.3rem',
        'border-outer': '0 0 0.3rem',
      },
      width: {
        108: '28rem',
      },
      animation: {
        enter: 'fadeIn 300ms ease-out',
        leave: 'fadeOut 300ms ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [
    /* eslint-disable @typescript-eslint/no-require-imports */
    require('@savvywombat/tailwindcss-grid-areas'),
    plugin(({addVariant, addUtilities}) => {
      addVariant('not-last', '&:not(:last-child)');
      addUtilities(
        {
          '.filter-logo': {
            filter: 'brightness(0) saturate(100%) invert(68%) sepia(72%)' +
              ' saturate(3539%) hue-rotate(9deg) brightness(89%) contrast(97%)',
          },
        },
      );
    }),
    plugin(({matchUtilities, theme}) => {
      matchUtilities(
        {
          'grid-auto-width': (value) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
          }),
        },
        {
          values: theme('spacing'),
          supportsNegativeValues: false,
        },
      );
    }),
  ],
};

export default config;
