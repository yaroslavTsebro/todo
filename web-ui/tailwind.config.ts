// tailwind.config.ts

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

// Функция-плагин для экспорта цветовых переменных в CSS
const exposeColorVariables = plugin(function ({ addBase, theme }) {
  const colors: object = theme('colors');
  const variables: Record<string, string> = {};

  Object.keys(colors).forEach((colorKey) => {
    const colorValue = colors[colorKey];
    if (typeof colorValue === 'string') {
      // Если значение цвета — строка, устанавливаем переменную без оттенка
      variables[`--color-${colorKey}`] = colorValue;
    } else {
      // Если значение цвета — объект (с оттенками), устанавливаем переменные с оттенками
      Object.keys(colorValue).forEach((shade) => {
        variables[`--color-${colorKey}-${shade}`] = colorValue[shade];
      });
    }
  });

  addBase({
    ':root': variables,
  });
});

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey-1': '#BCBCBC',
        'grey-2': '#636561',
      },
      keyframes: {
        'popup-open': {
          '0%': { position: 'relative', bottom: '-100%', transform: 'scale(1)' },
          '20%': { position: 'relative', bottom: '-40%', transform: 'scale(1.1)' },
          '40%': { position: 'relative', bottom: '-30%', transform: 'scale(1.15)' },
          '60%': { position: 'relative', bottom: '-20%', transform: 'scale(1.15)' },
          '80%': { position: 'relative', bottom: '-10%', transform: 'scale(1.1)' },
          '100%': { position: 'relative', bottom: '0', transform: 'scale(1)' },
        },
        'appear': {
          '0%': { display: 'none', opacity: '0' },
          '20%': { opacity: '.2' },
          '40%': { opacity: '.4' },
          '60%': { opacity: '.6' },
          '80%': { opacity: '.8' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'popup-open': 'popup-open 0.25s ease-in-out forwards',
        'popup-close': 'popup-open 0.25s ease-in-out forwards reverse',
        
        'appear': 'appear 0.25s ease-in-out forwards',
        'disappear': 'appear 0.25s ease-in-out forwards reverse',
      },
    },
  },
  plugins: [
    exposeColorVariables,
    // Вы можете добавить другие плагины здесь
  ],
};

export default config;
