import React, { Component, useState, useEffect } from "react";
import { UseTheme , GetInitialTheme} from "./themeContext";

const Nav_bar = () => {
    const { isDarkTheme, setDarkTheme } = UseTheme();

    return (
        <>
            {String(isDarkTheme)}
            <div className="navbar">
                <select
                    data-choose-theme
                    onChange={(event) => {
                        setDarkTheme(
                            event.target.value == "dark"
                                ? true
                                : event.target.value == "light"
                                ? false
                                : GetInitialTheme()
                        );
                    }}>
                    <option value="">Follow system</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
            </div>

            <nav></nav>
        </>
    );
};

export default Nav_bar;
