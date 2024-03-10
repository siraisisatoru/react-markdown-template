import Codeblock from "./../utils/codeblock";
import * as Comlink from "comlink/dist/esm/comlink";
import { useAsync } from "react-use";

import { useState, useRef } from "react";
function ReactPyClone() {
    const [input, setInput] = useState("");
    const pyodideRef = useRef(null); // Ref to store the Comlink instance
    const { loading } = useAsync(async () => {
        const py_worker = new Worker(new URL("../utils/js/py_worker.js", import.meta.url), {
            type: "module",
        });
        let pyodideWorker = await Comlink.wrap(py_worker);
        await pyodideWorker.init();
        pyodideRef.current = pyodideWorker; // Store the Comlink instance in the ref
    }, []);
    return (
        <>
            <form>
                <textarea
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your code here"
                />
            </form>
            {loading  ? (
                <p>Loading Pyodide...</p>
            ) : pyodideRef.current ? (
                <div>
                    <Codeblock
                        langWorker={pyodideRef.current}
                        code={input}
                        metaInfo={"run"}
                        lang={"py"}
                    />
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default ReactPyClone;
