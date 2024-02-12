import React, {useState, useEffect} from "react";
import { ThemeProvider } from "../utils/themeContext";
import Nav_bar from "../utils/nav_bar";
import MarkdownRender from "../utils/markdownRender";

const MarkdownPage = (renderProps) => {

    return (
        <>
            <div>
                <ThemeProvider>
                    <Nav_bar></Nav_bar>
                    <MarkdownRender mdstr={renderProps.mdstr}></MarkdownRender>
                </ThemeProvider>
            </div>
        </>
    );
};

export default MarkdownPage;
