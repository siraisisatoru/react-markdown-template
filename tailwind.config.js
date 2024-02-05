/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],

    daisyui: {
        themes: {
            light: {
                ...require("daisyui/src/theming/themes")["emerald"],
            },
            dark: {
                ...require("daisyui/src/theming/themes")["dim"],
            },
        },
    },
};
