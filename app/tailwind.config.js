/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "20%, 80%": { transform: "translateY(-10%)", opacity: "1" },
          "30%, 50%, 70%": { transform: "translateY(-20%)", opacity: "1" },
          "40%, 60%": { transform: "translateY(-40%)", opacity: "1" },
        },
        drop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".2", transform: "scale(1.05)" },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
      },
      animation: {
        bounce: "bounce 0.5s ease-in-out",
        drop: "drop 0.5s ease-in-out",
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
    },
  },
  plugins: [],
};
