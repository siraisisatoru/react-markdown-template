import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../utils/themeContext";
import Nav_bar from "../utils/nav_bar";

function NoteIndex(renderProps) {
    const renderCourse = (mdFileName, url) => {
        return (
            <li key={mdFileName}>
                <a href={url}>{mdFileName}</a>
            </li>
        );
    };

    const renderNode = (key, value) => {
        if (Array.isArray(value)) {
            return (
                <li key={key}>
                    <strong className="pointer-events-none">{key}</strong>
                    <ul>
                        {value.map((mdFileName) => {
                            const url = `/${key}/${mdFileName}`;
                            return renderCourse(mdFileName, url);
                        })}
                    </ul>
                </li>
            );
        } else if (typeof value === "object" && value !== null) {
            return (
                <li key={key}>
                    <strong>{key}</strong>
                    <ul>{renderTree(value)}</ul>
                </li>
            );
        } else {
            return null;
        }
    };

    const renderTree = (obj) => {
        return Object.entries(obj).map(([key, value]) => {
            return renderNode(key, value);
        });
    };

    return (
        <>
            <ThemeProvider>
                <Nav_bar></Nav_bar>
                <ul className="menu">{renderTree(renderProps.notesList)}</ul>

                {/* <MarkdownRender mdstr={renderProps.mdstr}></MarkdownRender> */}
            </ThemeProvider>
        </>
    );
}
export default NoteIndex;
