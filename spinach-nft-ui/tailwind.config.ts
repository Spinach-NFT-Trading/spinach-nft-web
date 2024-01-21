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
        '108': '28rem',
      },
      animation: {
        'enter': 'fadeIn 300ms ease-out',
        'leave': 'fadeOut 300ms ease-in forwards',
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
    require('@savvywombat/tailwindcss-grid-areas'),
    plugin(({addVariant}) => {
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
};

export default config;
