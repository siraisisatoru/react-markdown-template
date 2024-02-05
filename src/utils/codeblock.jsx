import { useState, useEffect, useRef } from "react";
// import { useEffect, useState } from 'react';
// import script from "/python/script.py?url&raw";
// import { loadPyodide } from "/node_modules/pyodide/pyodide.mjs";

function Codeblock(props) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    // const resultRef = useRef(null);

    console.log("run useState");

    const runPy = async () => {
        try {
            // props.libList =
            // console.log(props.libList);

            var setup_code = `
            import sys, io, traceback
            namespace = {}  # use separate namespace to hide run_code, modules, etc.
            def run_code(code):
              """run specified code and return stdout and stderr"""
              out = io.StringIO()
              oldout = sys.stdout
              olderr = sys.stderr
              sys.stdout = sys.stderr = out
              try:
                  # change next line to exec(code, {}) if you want to clear vars each time
                  # exec(code, namespace)
                  exec(code, {})
              except:
                  traceback.print_exc()
            
              sys.stdout = oldout
              sys.stderr = olderr
              return out.getvalue()
            `;
            const pyodide = await loadPyodide({
                // indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
                // indexURL: "/node_modules/pyodide/",
                pyproxyToStringRepr: true,
            });
            // pyodide.setStdout({ batched: (msg) =>{ return (msg)} })
            pyodide.runPython(setup_code);

            if (props.libList.length == 0) {
                await pyodide.loadPackagesFromImports(props.code);
            } else {
                // there is package list
                // need to modify the following line to get
                // console.log(JSON.parse(props.libList[0].replace('lib:','')));
                // console.log(props.libList[0].replace('lib:','').replaceAll(`'`,`"`));
                console.log("Manual lib: " , JSON.parse(props.libList[0].replace('lib:','').replaceAll(`'`,`"`)));
                
                await pyodide.loadPackage(JSON.parse(props.libList[0].replace('lib:','').replaceAll(`'`,`"`)));
            }

            pyodide.globals.set("code_to_run", props.code);
            const output = pyodide.runPython("run_code(code_to_run)");
            // const output = pyodide.runPython(props.code);
            // console.log(output?.toString());
            // console.log(pyodide.globals.get("add_res").toString());
            // resultRef.current = output?.toString();
            setResult(output?.toString());
        } catch (error) {
            console.error("Error processing data:", error);
        } finally {
            setLoading(false);
        }
        // setLoading(true);

        // output.destroy();

        // setOutput(output);
        // setLoading(false);

        // fetch("https://jsonplaceholder.typicode.com/todos/1")
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setTodo(data);
        //     setLoading(false);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     setLoading(false);
        //   });
    };

    useEffect(() => {
        runPy();
    }, []);

    // useEffect(() => {
    //     console.log("run useEffect");

    // (async () => {
    // let initPyodide = loadPyodide({
    //     indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    // });
    // const pyodide = await initPyodide();
    // const pyodide = await loadPyodide({
    //     indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    // });
    // await pyodide.loadPackage("micropip");
    // const micropip = pyodide.pyimport("micropip");
    // await micropip.install("numpy");
    // await pyodide.loadPackage("numpy");
    // await pyodide.runPython(props.code);
    // await micropip.install("snowballstemmer");
    //             pyodide.runPython(`
    //   import snowballstemmer
    //   stemmer = snowballstemmer.stemmer('english')
    //   print(stemmer.stemWords('go goes going gone'.split()))
    // `);
    // console.log("run asyc");
    // const output = await pyodide.runPythonAsync(props.code);
    // setOutput(output);
    // setOutput(pyodide.runPython(props.code));
    // setOutput(await pyodide.runPython(props.code));
    // console.log(pyodide.runPython(props.code));
    // })();
    // async function main() {

    // }

    // async function runPython() {
    //     try {
    //         const pyodide = await loadPyodide({
    //             indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    //         });
    //         await pyodide.loadPackage("numpy");
    //         const output = await pyodide.runPythonAsync(props.code);
    //         setOutput(output);

    //         //   const data = await runPython('https://api.example.com/data');
    //         //   setData(data);
    //         //   setLoading(false);
    //     } catch (error) {
    //         //   setError(error);
    //         //   setLoading(false);
    //         console.log(error);
    //     }
    // }

    // runPython();
    // });

    // ======== works for v 16
    {
        /* <script type="text/javascript">
// set the pyodide files URL (packages.json, pyodide.asm.data etc)
window.languagePluginUrl = 'https://cdn.jsdelivr.net/pyodide/v0.16.1/full/';
</script>
<script src="https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js"></script> */
    }
    // const runScript = (code) => {
    //     window.pyodide.loadPackage([]).then(() => {
    //         const output = window.pyodide.runPython(code);
    //         setOutput(output);
    //     });
    // };
    // useEffect(() => {
    //     window.languagePluginLoader.then(() => {
    //         // runScript(porps.code);
    //         runScript(script);
    //     });
    // });
    // ======== works for v 16

    if (loading) {
        return <pre>Loading...</pre>;
    }

    // Render the result or handle errors
    return (
        <div>
            {result === null ? (
                // Handle errors or no data case
                <pre>Error or no data</pre>
            ) : (
                // Render the result
                <pre>{result}</pre>
            )}
        </div>
    );

    // return resultRef.current;
}

export default Codeblock;
