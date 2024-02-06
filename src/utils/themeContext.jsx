import React, { createContext, useState, useContext, useEffect } from "react";
import { themeChange } from "theme-change";

const ThemeContext = createContext();

export function GetInitialTheme() {
    if (localStorage.getItem("theme") && localStorage.getItem("theme") != "") {
        return localStorage.getItem("theme") == "dark";
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQuery.matches;
}

export const ThemeProvider = ({ children }) => {

    // THEME ==================================================
    useEffect(() => {
        themeChange(false);
        // 👆 false parameter is required for react project
    }, []);

    const [isDarkTheme, setDarkTheme] = useState(GetInitialTheme);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = (e) => {
            console.log(e.matches, "color: #bada55");

            if (!localStorage.getItem("theme") || localStorage.getItem("theme") == "") {
                // if the item 'theme' does not exists or the theme belongs to follow os theme
                setDarkTheme(e.matches);
            } else {
                setDarkTheme(localStorage.getItem("theme") == "dark");
            }
        };
        mediaQuery.addEventListener("change", handleSystemThemeChange);
        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
    }, []);
    // THEME ==================================================

    return (
        <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const UseTheme = () => useContext(ThemeContext);

