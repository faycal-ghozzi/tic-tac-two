import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["animate-bounce-once"],
  theme: {
    extend: {
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-20%)' },
          '50%': { transform: 'translateY(0)' },
          '75%': { transform: 'translateY(-10%)' },
        },
      },
      animation: {
        pop: 'pop 0.3s ease-out',
        'bounce-once': 'bounce-once 0.9s ease-out 1',
      },
    },
        
  },
  plugins: [],
};

export default config;
