/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "slate-light": "#E2E8F0",
                "slate-medium": "#94A3B8",
                "slate-dark": "#334155",
            },
            opacity: {
                light: "0.3",
                medium: "0.5",
                heavy: "0.7",
            },
        },
    },
    darkMode: "media",
    plugins: [require("@tailwindcss/forms")],
};
