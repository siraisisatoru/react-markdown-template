// pyodideWorker.js
import { loadPyodide, version } from "pyodide";
// import { loadPyodide,version } from "/node_modules/pyodide/pyodide.mjs";


import { expose } from "comlink";

const indexURL = `https://cdn.jsdelivr.net/pyodide/v${version}/full/`;

let pyodideReady = loadPyodide({ indexURL });
// let pyodideReady =null;
function parseLibraries(metaInfo) {
    // GPT
    // Convert the metaInfo to lowercase to handle case-insensitive parsing
    const lowerMetaInfo = metaInfo.toLowerCase();

    // Find the index of "run" in the lowercase metaInfo
    const runIndex = lowerMetaInfo.indexOf("run");

    // If "run" is not found, return an empty array
    if (runIndex === -1) {
        return [];
    }

    // Find the substring starting from "run" to the end of the metaInfo
    const substring = lowerMetaInfo.substring(runIndex);

    // Find the index of "[" in the substring
    const startIndex = substring.indexOf("[");
    // Find the index of "]" in the substring
    const endIndex = substring.indexOf("]");

    // If "[" and "]" are not found, return an empty array
    if (startIndex === -1 || endIndex === -1) {
        return [];
    }

    // Extract the substring containing the array elements
    const arraySubstring = substring.substring(startIndex + 1, endIndex);

    // Replace single quotes with double quotes for consistent parsing
    const replacedSubstring = arraySubstring.replace(/'/g, '"');

    // Parse the substring as JSON to convert it into an array
    let libraries;
    try {
        libraries = JSON.parse("[" + replacedSubstring + "]");
    } catch (error) {
        console.error("Error parsing library array:", error);
        return [];
    }

    // Convert each library name to lowercase
    return libraries.map((library) => library.toLowerCase());
}

const pyodideWorker = {
    async init() {
        self.pyodide = await pyodideReady;
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
        self.pyodide.runPython(setup_code);
    },
    async runPython(code, libListStr) {
        const libList = parseLibraries(libListStr);

        if (libList.length == 0) {
            await self.pyodide.loadPackagesFromImports(code);
        } else {
            // there is package list
            console.log("Manual lib: ", libList);
            await self.pyodide.loadPackage(libList);
        }

        self.pyodide.globals.set("code_to_run", code);
        const output = self.pyodide.runPython("run_code(code_to_run)");

        return output;
    },
};

expose(pyodideWorker);
