import "./App.css";

import React, {createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/index";
import NoMatch from "./page/404";
import TestPage from "./page/test";

import MarkdownPage from "./page/markdownPage";
import NoteIndex from "./page/noteIndex";

export const GroupedFilesContext = createContext();

function App() {
    const noteBase = "Notes"; // modify this to change base folder stores markdown files

    const modules = import.meta.glob("./**/*.md", { query: "?raw", eager: true }); // get all md files within noteBase directory
    const notesList = Object.keys(modules).filter(
        (filePath) =>
            filePath.startsWith(`./${noteBase}/`) && !filePath.endsWith("markdownCheatsheet.md")
    );
    const regex = /\.\/Notes\/((?:[^/]+\/)+)[^/]+\.md/;

    const addElement = (obj, elements, filename, url) => {
        if (elements.length === 0) {
            return obj;
        } else {
            const currentElement = elements.shift();
            if (!obj[currentElement]) {
                obj[currentElement] = { files: [], subdirectory: {} };
            }
            if (elements.length === 0) {
                obj[currentElement].files.push({ name: filename, url: url });
            }
            obj[currentElement].subdirectory = addElement(
                obj[currentElement].subdirectory,
                elements,
                filename,
                url
            );
            return obj;
        }
    };

    const extractInfo = (filePath) => {
        const parts = filePath.split("/");
        const directories = parts.slice(2, parts.length - 1);
        const filename = parts[parts.length - 1].split(".")[0];
        const url = filePath.replace(parts[0] + "/" + parts[1], "").replace(".md", "");
        return { directories, filename, url };
    };

    let groupedFiles = {};
    notesList.forEach((filePath) => {
        const { directories, filename, url } = extractInfo(filePath);
        groupedFiles = addElement(groupedFiles, directories, filename, url);
    });

    return (
        <GroupedFilesContext.Provider value={groupedFiles}>
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

                    <Route exact path="notes" element={<NoteIndex groupedFiles={groupedFiles} />} />
                    <Route path="/*" element={<NoMatch />} />
                </Routes>
            </Router>
        </GroupedFilesContext.Provider>
    );
}
export default App;
