// tailwind.config.js
import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", ""],
    },
    colors: {
      Primary: "#171717",
      Secondary: "#0D0D0D",
      "accent-gradient-start": "#4434F6",
      "accent-gradient-end": "#8345FF",
      "Primary-text": "#ffffff",
      "Secondary-text": "#555555",
      Star: "#DADE00",
      "black-op": "rgb(0, 0, 0, .3)",
    },
    dropShadow: {
      "shadow-color": "0 0 25px rgba(131, 69, 255, 0.45)",
    },
    boxShadow: {
      "custom-inner": "inset 0 -150px 50px rgba(0, 0, 0, 0.6)",
    },
  },
  plugins: [],
});
