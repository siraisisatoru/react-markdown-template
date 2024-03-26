import React, { useState } from "react";
import Fuse from "fuse.js";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { HiOutlineInformationCircle } from "react-icons/hi";

/*
The highlighter function is completely developed menually and contain bugs in displaying the result.
This is the temporary solution and need to be reflect later.
*/

var highlighter = (resultItem) => {
    resultItem.matches.forEach((matchItem) => {
        const text = resultItem.item[matchItem.key];
        var result = [];
        var matches = [].concat(matchItem.indices); // limpar referencia
        var pair = matches.shift();

        var skip = false;
        for (let i = 0; i < text.length; i++) {
            // console.log(pair);

            if (
                (pair && (i < (pair[0] >= 30 ? pair[0] - 30 : pair[0]) || i > pair[1] + 30)) ||
                !pair
            ) {
                skip = true;
                continue;
            }

            if (skip) {
                result.push(" ... ");
                skip = false;
            }
            if (pair && i == pair[0]) {
                result.push("<span class='text-red-600'>");
            }

            result.push(text.charAt(i));

            if (pair && i == pair[1]) {
                result.push("</span>");
                // pair = matches.shift();
            }
            // console.log(matches[0]);
            if (pair && (i == pair[1] + 30 || (matches.length > 0 && i == matches[0][0] - 1))) {
                pair = matches.shift();
            }
        }

        result = result.join("");

        resultItem.highlight = result;

        if (resultItem.children && resultItem.children.length > 0) {
            resultItem.children.forEach((child) => {
                highlighter(child);
            });
        }
    });
};

const SearchBar = (renderProps) => {
    const [results, setResults] = useState([]);

    const handleSearch = (text) => {
        const fuseOptions = {
            isCaseSensitive: false,
            // includeScore: true,
            includeMatches: true,
            useExtendedSearch: true,
            ignoreLocation: true,
            keys: ["content"], // Keys to search for exact matches
        };

        const fuse = new Fuse(renderProps.searchList, fuseOptions);
        let result = fuse
            .search(`${text ? `'"` + text + `"` : ""}`)
            .reverse()
            .slice(0, 10);

        result.forEach((resultItem) => {
            highlighter(resultItem);
        });
        setResults(result);
    };

    return (
        <div className="relative">
            <button
                className="btn btn-sm sm:btn-md m-1 btn-square btn-ghost "
                onClick={() => {
                    document.getElementById("search").value = "";
                    handleSearch("");
                    document.getElementById("searchModal").showModal();
                }}>
                <FaMagnifyingGlass />
            </button>
            <dialog id="searchModal" className="modal shadow-lg rounded-lg p-4">
                <div className="modal-box overflow-visible">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500">
                            <FaXmark />
                        </button>
                    </form>
                    <div className="flex flex-row items-center gap-2">
                        <h3 className="my-2 font-bold text-lg text-blue-500">Searching ... </h3>

                        <div className="dropdown dropdown-hover dropdown-opven dropdown-bottom sm:dropdown-right flex sm:flex-none justify-center items-center">
                            <button className="m-4">
                                <HiOutlineInformationCircle />
                            </button>
                            <div
                                tabIndex={0}
                                className=" dropdown-content z-50 p-4 shadow-[0_0px_20px] shadow-slate-500 bg-base-100 rounded-lg w-80 max-h-64 overflow-auto">
                                {/* className="dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-52"> */}
                                <p className="text-xs">
                                    This search perform 'exact' search and capable separating words
                                    with white spaces. AND and OR function does not supported.
                                </p>
                            </div>
                        </div>
                    </div>
                    <input
                        type="text"
                        id="search"
                        placeholder="Find something"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="my-2  w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:outline-none hover:ring-2 hover:ring-blue-500"
                    />

                    <div className="my-2 overflow-y-auto">
                        <div className="max-h-80 w-full">
                            <table className="table table-pin-rows w-full table-fixed border-separate scroll-smooth">
                                {results.map((result, i) => (
                                    <React.Fragment key={`result-${i}`}>
                                        <thead>
                                            <tr>
                                                <th className="bg-gradient-to-tr from-base-300 to-bafrom-base-300/5 rounded-md shadow-inner shadow-slate-300 ">
                                                    <a
                                                        href={result.item.url}
                                                        className="link text-lg capitalize">
                                                        {result.item.filename}
                                                    </a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="whitespace-normal bg-base-200/50 rounded-md ">
                                                    <p
                                                        className="break-words text-base-content"
                                                        dangerouslySetInnerHTML={{
                                                            __html: result.highlight,
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody className="h-[1rem]"></tbody>
                                    </React.Fragment>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className="text-blue-500">close</button>
                </form>
            </dialog>
        </div>
    );
};

export default SearchBar;
