/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "achroma-lightest": "#FEFEFF",
                "achroma-light": "#EBEBEB",
                "achroma-medium": "#BEBEBE",
                "achroma-dark": "#737373",
                "achroma-darkest": "#050505",
                "primary-light": "#FAF7FF",
                "primary-medium": "#C084FC",
                "primary-dark": "#7E22CE",
            },
            opacity: {
                lowest: "0.1",
                low: "0.3",
                medium: "0.5",
                high: "0.7",
                highest: "0.9",
            },
            ringColor: {
                "achroma-lightest": "#FEFEFF",
                "achroma-light": "#EBEBEB",
                "achroma-medium": "#BEBEBE",
                "achroma-dark": "#737373",
                "achroma-darkest": "#050505",
                "primary-light": "#FAF7FF",
                "primary-medium": "#C084FC",
                "primary-dark": "#7E22CE",
            },
            textColor: {
                "achroma-lightest": "#FEFEFF",
                "achroma-light": "#EBEBEB",
                "achroma-medium": "#BEBEBE",
                "achroma-dark": "#737373",
                "achroma-darkest": "#050505",
                "primary-light": "#FAF7FF",
                "primary-medium": "#C084FC",
                "primary-dark": "#7E22CE",
            },
        },
    },
    darkMode: "media",
    plugins: [require("@tailwindcss/forms")],
};
