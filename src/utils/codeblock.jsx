// Codeblock.js
import React, { useEffect, useState } from "react";

function parseString(inputString) {
    // GPT
    const imgRegex = /<img src="data:image\/png;base64,([^"]+)">/g;

    let match;
    const parsedData = [];
    let lastIndex = 0;

    // Iterate through all matches
    while ((match = imgRegex.exec(inputString)) !== null) {
        // Push text before the match
        const textBeforeMatch = inputString.substring(lastIndex, match.index);
        if (textBeforeMatch) {
            parsedData.push({ type: "text", content: textBeforeMatch });
        }

        // Push the image data
        parsedData.push({ type: "image", content: match[1] });

        // Update lastIndex
        lastIndex = imgRegex.lastIndex;
    }

    // Push remaining text after the last match
    const textAfterLastMatch = inputString.substring(lastIndex);
    if (textAfterLastMatch) {
        parsedData.push({ type: "text", content: textAfterLastMatch });
    }
    console.log(parsedData);
    return parsedData;
}

function Codeblock({ langWorker, code, metaInfo, lang }) {
    const [executeOutput, setExecuteOutput] = useState(null); // State to store the Python output
    const [parsedData, setParsedData] = useState([]);

    useEffect(() => {
        const executePythonCode = async () => {
            const result = await langWorker.runPython(code, metaInfo);
            setExecuteOutput(result);
            if (metaInfo.toLowerCase().includes("monitor")) {
                const newData = parseString(result);
                setParsedData(newData);
            }
        };

        const executeCPPcode = async () => {
            const result = await langWorker.compileLinkRun(code);
            setExecuteOutput(result.consoleOutput);
        };

        if (lang.toLowerCase() === "py" || lang.toLowerCase() === "python") {
            executePythonCode();
        } else if (lang.toLowerCase() === "cpp") {
            executeCPPcode();
        }
    }, [langWorker, code]);

    return (
        <div>
            {metaInfo.toLowerCase().includes("monitor") ? (
                <>
                    {parsedData.map((item, index) => {
                        // console.log(index);
                        if (item.type === "text") {
                            return <span key={index}>{item.content}</span>;
                        } else if (item.type === "image") {
                            return (
                                <React.Fragment key={index}>
                                    <img src={`data:image/png;base64, ${item.content}`} />
                                </React.Fragment>
                            );
                        }
                        return null;
                    })}
                </>
            ) : (
                <>
                    <pre className="overflow-auto" >{executeOutput}</pre>
                </>
            )}
        </div>
    );
}

export default Codeblock;
