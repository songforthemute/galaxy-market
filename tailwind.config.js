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
                "purple-light": "#E9D5FF",
                "purple-medium": "#C084FC",
                "purple-dark": "#7E22CE",
            },
            opacity: {
                light: "0.3",
                medium: "0.5",
                heavy: "0.7",
            },
            ringColor: {
                "slate-light": "#E2E8F0",
                "slate-medium": "#94A3B8",
                "slate-dark": "#334155",
                "purple-light": "#E9D5FF",
                "purple-medium": "#C084FC",
                "purple-dark": "#7E22CE",
            },
        },
    },
    darkMode: "media",
    plugins: [require("@tailwindcss/forms")],
};
