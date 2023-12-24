import {Config} from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';


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
    },
  },
  plugins: [],
};

export default config;
