import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../utils/themeContext";
import Nav_bar from "../utils/nav_bar";

function NoteIndex(renderProps) {
    function FileItem({ files }) {
        return (
            <ul className="menu">
                {files.map((file, index) => (
                    <li key={index}>
                        <a href={file.url}>{file.name}</a>
                    </li>
                ))}
            </ul>
        );
    }

    function Directory({ directory }) {
        return (
            <ul className="menu">
                {Object.entries(directory).map(([key, value]) => (
                    <li key={key}>
                        <strong className="pointer-events-none">{key}</strong>
                        <FileItem files={value.files} />
                        <Directory directory={value.subdirectory} />
                    </li>
                ))}
            </ul>
        );
    }
    function addElement(obj, elements, filename, url) {
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
    }
    
    const renderTree = (notesList) => {
        function extractInfo(filePath) {
            const parts = filePath.split("/");
            const directories = parts.slice(2, parts.length - 1);
            const filename = parts[parts.length - 1].split(".")[0];
            const url = filePath.replace(parts[0] + "/" + parts[1], "").replace(".md", "");
            return { directories, filename, url };
        }
    
        let groupedFiles = {};
        notesList.forEach((filePath) => {
            const { directories, filename, url } = extractInfo(filePath);
            groupedFiles = addElement(groupedFiles, directories, filename, url);
        });
    
        return <Directory directory={groupedFiles} />;
    };


    return (
        <>
            <ThemeProvider>
                <Nav_bar></Nav_bar>
                {renderTree(renderProps.notesList)}
            </ThemeProvider>
        </>
    );
}
export default NoteIndex;
