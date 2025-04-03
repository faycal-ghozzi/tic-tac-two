import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: ["animate-bounce-once", "animate-win-bounce"],
  theme: {
    extend: {
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "win-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(-12%)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0)" },
          "25%": { transform: "rotate(6deg)" },
          "75%": { transform: "rotate(-6deg)" },
        },
      },
      animation: {
        pop: "pop 0.3s ease-out",
        "win-bounce": "win-bounce 0.4s ease-in-out 4",
        "bounce-slow": "bounce-slow 2s infinite ease-in-out",
        "wiggle": "wiggle 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
