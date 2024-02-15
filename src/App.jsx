import "./App.css";

import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/index";
import NoMatch from "./page/404";
import TestPage from "./page/test";

import MarkdownPage from "./page/markdownPage";
import NoteIndex from "./page/noteIndex";

function App() {
    const noteBase = "Notes"; // modify this to change base folder stores markdown files

    const modules = import.meta.glob("./**/*.md", { query: "?raw", eager: true }); // get all md files within noteBase directory
    const notesList = Object.keys(modules).filter(
        (filePath) =>
            filePath.startsWith(`./${noteBase}/`) && !filePath.endsWith("markdownCheatsheet.md")
    );
    const regex = /\.\/Notes\/((?:[^/]+\/)+)[^/]+\.md/;

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="test" element={<TestPage />} />

                {/* Dynamically generate routes for each markdown file */}
                {notesList.map((noteUrl, index) => (
                    <Route
                        key={`${noteUrl.match(regex)[1]}-${index}`}
                        exact
                        path={`${noteUrl.replace(`./${noteBase}/`, "").replace(".md", "")}`}
                        element={<MarkdownPage mdstr={modules[noteUrl].default} />}
                    />
                ))}
                
                <Route exact path="notes" element={<NoteIndex notesList={notesList} />} />
                <Route path="/*" element={<NoMatch />} />
            </Routes>
        </Router>
    );
}
export default App;
