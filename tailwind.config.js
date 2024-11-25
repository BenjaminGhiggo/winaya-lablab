/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'], // Consolidación de rutas
  theme: {
    extend: {
      height: {
        '50vh': '50vh', // 50% de la altura de la viewport
        '70vh': '70vh', // 70% de la altura de la viewport
      },
      animation: {
        gradient: 'gradientBG 3s ease infinite',
      },
      keyframes: {
        gradientBG: {
          '0%': { backgroundPosition: '0% 80%' },
          '50%': { backgroundPosition: '100% 80%' },
          '100%': { backgroundPosition: '0% 80%' },
        },
      },
      backgroundImage: {
        'auth-gradient2': 'linear-gradient(to left, #ffa91e, #ec4899)', // Segundo gradiente
      },
      colors: { 
        'plomo-chat': '#f2f2f2',
        'cabello-bot': '#ac2a2a',
        'colorInputMark' : '#ffc35b',
        'turquesa' : '#00a9b1',
        'turquesa-claro' : '#7DDCDD'
      },
      borderWidth: {
        '3': '3px', // Define un borde de 3px
      },
    },
  },
  plugins: [],
};
