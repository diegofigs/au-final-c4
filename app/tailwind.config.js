/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-25%)", opacity: "0" },
          "50%": { transform: "translateY(0)", opacity: "1" },
        },
        drop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        bounce: "bounce 0.5s ease-in-out",
        drop: "drop 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
