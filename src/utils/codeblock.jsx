import React, { useEffect, useState } from "react";

function Codeblock({ pyodide, code, libListStr }) {
    const [pythonOutput, setPythonOutput] = useState(null); // State to store the Python output
    useEffect(() => {
        const executePythonCode = async () => {
            const result = await pyodide.runPython(code, libListStr);
            setPythonOutput(result);
        };

        executePythonCode();
    }, [pyodide, code]);

    return (
        <div>
            <pre>{pythonOutput}</pre>
        </div>
    );
}

export default Codeblock;
