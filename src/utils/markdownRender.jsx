// components/MarkdownRender.js
import React, { Component, useState, useEffect, useCallback, useRef } from "react";
import { UseTheme } from "./themeContext";

// MARKDOWN ===============================================
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkEmoji from "remark-emoji";
import remarkIns from "remark-ins";
import remarkMarkers from "remark-flexible-markers";
import remarkMermaid from "remark-mermaidjs";
// monitor this to update remark-mermaidjs https://github.com/remarkjs/react-markdown/issues/680
import remarkCollapse from "remark-collapse";
import remarkDeflist from "remark-deflist";
import remarkSupersub from "remark-supersub";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import remarkBreak from "remark-breaks";
import remarkImg from "remark-images";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkFrontmatter from "remark-frontmatter";

import rehypeAutolink from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";

// MARKDOWN ===============================================

// SYNTAXHIGHLIGHTER ======================================
// import SyntaxHighlighter from "react-syntax-highlighter";
import { Prism as SyntaxHighlighter, createElement } from "react-syntax-highlighter";
import { vscDarkPlus, coldarkCold } from "react-syntax-highlighter/dist/cjs/styles/prism";
// SYNTAXHIGHLIGHTER ======================================

// PYTHON & CPP ===========================================
import Codeblock from "./../utils/codeblock";
import * as Comlink from "comlink/dist/esm/comlink";
import { useAsync } from "react-use";
// PYTHON & CPP ===========================================

// UILT  ==================================================
import { FaRegCopy } from "react-icons/fa";
import {
    HiOutlineInformationCircle,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlineXCircle,
} from "react-icons/hi";
import yaml from "js-yaml";
// UILT  ==================================================

const MarkdownRender = (renderProps) => {
    // >> Customise remark plugin =========================
    function remarkCustomPlugin() {
        /**
         * @param {import('mdast').Root} tree
         *   Tree.
         * @returns {undefined}
         *   Nothing.
         */
        return function (tree) {
            visit(tree, function (node) {
                // console.log(node);
                if (
                    node.type === "containerDirective" ||
                    node.type === "leafDirective" ||
                    node.type === "textDirective"
                ) {
                    if (node.name === "note") {
                        // console.log(node)

                        // calling data in the following means assigning attributes to the node.data
                        const data = node.data || (node.data = {});
                        const tagName = node.type === "textDirective" ? "span" : "div";
                        // const tagName = node.type === "span" ;
                        data.hName = tagName;
                        if (node.attributes.class == "alert") {
                            data.hProperties = h(
                                tagName,
                                { class: "my-2 alert", role: "alert" } || {}
                            ).properties;
                        } else if (node.attributes.class == "info") {
                            data.hProperties = h(
                                tagName,
                                { class: "my-2 alert alert-info", role: "alert" } || {}
                            ).properties;
                        } else if (node.attributes.class == "success") {
                            data.hProperties = h(
                                tagName,
                                { class: "my-2 alert alert-success", role: "alert" } || {}
                            ).properties;
                        } else if (node.attributes.class == "warning") {
                            data.hProperties = h(
                                tagName,
                                { class: "my-2 alert alert-warning", role: "alert" } || {}
                            ).properties;
                        } else if (node.attributes.class == "error") {
                            data.hProperties = h(
                                tagName,
                                { class: "my-2 alert alert-error", role: "alert" } || {}
                            ).properties;
                        } else if (node.attributes.class == "openChat") {
                            data.hProperties = h(
                                tagName,
                                { class: "my-2 ml-4 chat chat-start" } || {}
                            ).properties;
                        } else if (node.attributes.class == "closeChat") {
                            data.hProperties = h(
                                tagName,
                                { class: "my-2 mr-4 chat chat-end" } || {}
                            ).properties;
                        } else if (node.attributes.class == "python") {
                            // included but not used in md
                            data.hProperties = h(
                                tagName,
                                { class: "my-2 python_code", role: "code" } || {}
                            ).properties;
                        } else {
                            data.hProperties = h(tagName, node.attributes || {}).properties;
                        }
                    } else {
                        const data = node.data || (node.data = {});
                        const hast = h(node.name, node.attributes || {});

                        data.hName = hast.tagName;
                        data.hProperties = hast.properties;
                        if (hast.tagName === "main") {
                            data.hProperties.class = ["bg-sky-200", "rounded-lg"];
                        }
                    }
                }
            });
        };
    }
    // >> Customise remark plugin =========================

    // >> Theme parameter =================================
    const { isDarkTheme, setDarkTheme } = UseTheme();
    // >> Theme parameter =================================

    // >> Get markdown parameter ==========================
    // Split the markdown string by the YAML delimiter ("+=+=+=+")
    const mdConfig = renderProps.mdstr.split("+=+=+=+")[1];

    let jsonData = {
        title: "YOU NEED A TITLE",
        date: "2001-01-01 00:00:00",
        exeCPP: false,
        exePYTHON: false,
        abstract: "",
    };
    // Convert YAML to JSON
    if (mdConfig?.length > 1) {
        const mdConfigJson = yaml.load(mdConfig);
        jsonData.title = mdConfigJson?.title || jsonData.title;
        jsonData.date = mdConfigJson?.date || jsonData.date;
        jsonData.exeCPP = mdConfigJson?.exeCPP || jsonData.exeCPP;
        jsonData.exePYTHON = mdConfigJson?.exePYTHON || jsonData.exePYTHON;
        jsonData.abstract = mdConfigJson?.abstract || jsonData.abstract;
    }
    // >> Get markdown parameter ==========================

    // >> Setup code workers ==============================
    const pyodideRef = useRef(null); // Ref to store the Comlink instance
    const cppRef = useRef(null); // Ref to store the Comlink instance
    const { loading } = useAsync(async () => {
        if (jsonData.exeCPP) {
            const py_worker = new Worker(new URL("./js/py_worker.js", import.meta.url), {
                type: "module",
            });
            let pyodideWorker = await Comlink.wrap(py_worker);
            await pyodideWorker.init();
            pyodideRef.current = pyodideWorker; // Store the Comlink instance in the ref
        }

        if (jsonData.exePYTHON) {
            const cpp_worker = new Worker(new URL("./cpp_worker/cpp_worker.js", import.meta.url), {
                type: "module",
            });
            let cppWorkerApi = await Comlink.wrap(cpp_worker);
            cppRef.current = cppWorkerApi; // Store the Comlink instance in the ref
        }
    }, []);
    // >> Setup code workers ==============================

    return (
        <>
            <div className="flex flex-col gap-2 mt-3">
                <h1 className="text-4xl md:text-5xl">{jsonData.title}</h1>
                <p>Created on {jsonData.date}</p>
                {jsonData.abstract != "" ? (
                    <>
                        <p className="indent-4 md:text-lg my-2">{jsonData.abstract}</p>
                    </>
                ) : (
                    <></>
                )}
            </div>

            <article className="prose mx-auton !w-full !max-w-full">
                <ReactMarkdown
                    children={renderProps.mdstr}
                    remarkPlugins={[
                        remarkSupersub,
                        remarkIns,
                        remarkDeflist,
                        remarkBreak,
                        remarkDirective,
                        [
                            remarkImg,
                            {
                                imageExtensions: [
                                    "JPG",
                                    "avif",
                                    "gif",
                                    "jpeg",
                                    "jpg",
                                    "png",
                                    "svg",
                                    "webp",
                                ],
                            },
                        ],
                        remarkUnwrapImages,
                        remarkMermaid,
                        [remarkGfm, { singleTilde: false }],
                        [remarkCollapse, { test: "Colltest" }],
                        [remarkEmoji, { emoticon: false }],
                        [remarkToc, { maxDepth: 3 }],
                        [
                            remarkMarkers,
                            {
                                dictionary: {
                                    b: "DeepSkyBlue",
                                    r: "HotPink",
                                },
                                markerProperties: (color) => {
                                    return color
                                        ? {
                                              style: `background-color:${color};`,
                                          }
                                        : "";
                                },
                            },
                        ],
                        [remarkFrontmatter, [{ type: "yaml", fence: "+=+=+=+" }]],
                        remarkCustomPlugin,
                    ]}
                    rehypePlugins={[
                        () => {
                            return function (tree) {
                                visit(tree, function (node) {
                                    if (node.tagName == "code" && node.data?.meta) {
                                        node.properties.dataMeta = node.data.meta;
                                    }
                                });
                            };
                        },
                        rehypeRaw,
                        rehypeSlug,
                        [
                            rehypeAutolink,
                            {
                                behavior: "wrap",
                                properties: {
                                    class: "flex flex-wrap items-center gap-2 group w-fit no-underline",
                                },
                                content: [
                                    {
                                        type: "element", // Type of node
                                        tagName: "span", // HTML tag name
                                        properties: {
                                            class: " text-base hidden group-hover:block",
                                        }, // HTML attributes
                                        children: [
                                            // Child nodes
                                            {
                                                type: "text", // Type of child node (text node)
                                                value: "#", // Text content
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    ]}
                    components={{
                        pre: (props) => {
                            const { children, className, node, ...rest } = props;
                            const codeChunk = node.children[0].children[0].value;
                            const [copyTip, setCopyTip] = useState("Copy code");
                            const language = children.props.className?.replace(/language-/g, "");
                            const dataMeta = node.children[0].properties?.dataMeta;
                            const isRun = dataMeta?.match(/^(run\b.*)$/i);
                            const isPython =
                                language?.toLowerCase() == "py" ||
                                language?.toLowerCase() == "python";
                            const isCpp =
                                language?.toLowerCase() == "cpp" || language?.toLowerCase() == "c";
                            return (
                                <>
                                    <div className="relative overflow-x-hidden ">
                                        <button
                                            className="right-0 tooltip tooltip-left absolute z-40 mr-2 mt-5"
                                            data-tip={copyTip}
                                            onClick={async () => {
                                                setCopyTip("Copied");
                                                try {
                                                    await navigator.clipboard.writeText(codeChunk);
                                                    await new Promise((resolve) =>
                                                        setTimeout(resolve, 500)
                                                    );
                                                } catch (error) {
                                                    console.error(error.message);
                                                }
                                                setCopyTip(`Copy code`);
                                            }}>
                                            {/* <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer hover:text-blue-600" /> */}
                                            <FaRegCopy className="h-5 w-5 cursor-pointer hover:text-blue-600" />
                                        </button>

                                        {language ? (
                                            <span className="right-0 bottom-0 z-40 absolute mb-4 mr-2 rounded-lg p-1 text-xs uppercase text-base-300 bg-base-content/40 backdrop-blur-sm">
                                                {language}
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                        <pre className="not-prose ">
                                            <SyntaxHighlighter
                                                //
                                                style={isDarkTheme ? vscDarkPlus : coldarkCold}
                                                // style={vscDarkPlus}
                                                language={language ? language : "plaintext"}
                                                PreTag="div"
                                                className="text-sm mockup-code "
                                                codeTagProps={{ className: " " }}
                                                showLineNumbers={true}
                                                useInlineStyles={true}
                                                lineNumberStyle={{ minWidth: "3em" }}
                                                wrapLongLines={true}
                                                renderer={({
                                                    rows,
                                                    stylesheet,
                                                    useInlineStyles,
                                                }) => {
                                                    return rows.map((row, index) => {
                                                        const children = row.children;
                                                        const lineNumberElement = children?.shift();

                                                        /**
                                                         * We will take current structure of the rows and rebuild it
                                                         * according to the suggestion here https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/376#issuecomment-1246115899
                                                         */
                                                        if (lineNumberElement) {
                                                            row.children = [
                                                                lineNumberElement,
                                                                {
                                                                    children,
                                                                    properties: {
                                                                        className: [],
                                                                    },
                                                                    tagName: "span",
                                                                    type: "element",
                                                                },
                                                            ];
                                                        }

                                                        return createElement({
                                                            node: row,
                                                            stylesheet,
                                                            useInlineStyles,
                                                            key: index,
                                                        });
                                                    });
                                                }}>
                                                {String(codeChunk).replace(/\n$/, "")}
                                            </SyntaxHighlighter>
                                        </pre>
                                    </div>

                                    {isRun && isPython ? (
                                        <>
                                            {/* the code in this code block is python, try to render the output for it */}
                                            <pre className="not-prose">
                                                {loading ? (
                                                    <p>Loading Pyodide...</p>
                                                ) : pyodideRef.current ? (
                                                    <div>
                                                        <Codeblock
                                                            langWorker={pyodideRef.current}
                                                            code={codeChunk}
                                                            metaInfo={dataMeta}
                                                            lang={"py"}
                                                        />
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </pre>
                                        </>
                                    ) : isRun && isCpp ? (
                                        <>
                                            {/* the code in this code block is Cpp, try to render the output for it */}
                                            <pre className="not-prose">
                                                {loading ? (
                                                    <p>Loading Clang...</p>
                                                ) : cppRef.current ? (
                                                    <div>
                                                        <Codeblock
                                                            langWorker={cppRef.current}
                                                            code={codeChunk}
                                                            metaInfo={dataMeta}
                                                            lang={"cpp"}
                                                        />
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </pre>
                                        </>
                                    ) : (
                                        <>
                                            <span>{node.children[0].properties?.dataMeta}</span>
                                        </>
                                    )}
                                </>
                            );
                        },

                        div: ({ node, children, ...props }) => {
                            if (node.properties.className?.includes("alert")) {
                                // console.log(children);
                                // console.log(node);
                                return (
                                    <div {...props}>
                                        {node.properties.className?.includes("alert-info") ? (
                                            <HiOutlineInformationCircle className="stroke-current shrink-0 h-6 w-6" />
                                        ) : node.properties.className?.includes("alert-success") ? (
                                            <HiOutlineCheckCircle className="stroke-current shrink-0 h-6 w-6" />
                                        ) : node.properties.className?.includes("alert-warning") ? (
                                            <HiOutlineExclamationCircle className="stroke-current shrink-0 h-6 w-6" />
                                        ) : node.properties.className?.includes("alert-error") ? (
                                            <HiOutlineXCircle className="stroke-current shrink-0 h-6 w-6" />
                                        ) : (
                                            <HiOutlineInformationCircle className="stroke-info shrink-0 h-6 w-6" />
                                        )}
                                        <span>{children.props.children}</span>
                                    </div>
                                );
                            } else if (node.properties.className?.includes("chat")) {
                                return (
                                    <div {...props}>
                                        <div className="chat-bubble bg-neutral-content text-neutral">
                                            {children.props.children}
                                        </div>
                                    </div>
                                );
                            } else if (node.properties.className?.includes("python_code")) {
                                return (
                                    <>
                                        <div {...props}>{children}</div>
                                    </>
                                );
                            } else {
                                return <div {...props}>{children}</div>;
                            }
                        },

                        svg: ({ node, children, ...props }) => {
                            // console.log(node.children)
                            // console.log(props);
                            if (props.id.includes("remark-mermaid")) {
                                return (
                                    <svg
                                        {...props}
                                        className={
                                            isDarkTheme
                                                ? "bg-gray-400 rounded-lg mx-auto "
                                                : "rounded-lg mx-auto "
                                        }>
                                        {children}
                                    </svg>
                                );
                            } else {
                                return <svg {...props}> {children}</svg>;
                            }
                        },

                        a: ({ node, ...props }) => {
                            if (
                                props.children.type === "img" &&
                                props.href === props.children.props.src &&
                                props.children.props.alt === ""
                            ) {
                                // console.log(props);
                                return <img {...props.children.props}></img>;
                            }
                            return <a {...props}></a>;
                        },

                        h1: ({ node, ...props }) => {
                            return (
                                <h1
                                    {...props}
                                    className={`${
                                        node.properties.id === "contents" ? "mt-2" : "mt-12"
                                    } mb-0 border-b leading-snug scroll-my-20 ${
                                        isDarkTheme ? "border-gray-200" : "border-gray-800"
                                    } `}></h1>
                            );
                        },

                        h2: ({ node, ...props }) => {
                            return (
                                <h2
                                    {...props}
                                    className={`mt-4 mb-3 leading-snug scroll-my-20`}></h2>
                            );
                        },

                        h3: ({ node, ...props }) => {
                            return <h3 {...props} className={`scroll-my-20`}></h3>;
                        },

                        h4: ({ node, ...props }) => {
                            return <h4 {...props} className={`scroll-my-20`}></h4>;
                        },

                        h5: ({ node, ...props }) => {
                            return <h5 {...props} className={`scroll-my-20`}></h5>;
                        },

                        h6: ({ node, ...props }) => {
                            return <h6 {...props} className={`scroll-my-20`}></h6>;
                        },

                        iframe: ({ node, ...pros }) => {
                            return pros.title.includes("YouTube") ? (
                                <div className="mockup-window border bg-base-300 max-w-full mx-4 my-4">
                                    <div className="flex justify-center bg-base-200 p-2">
                                        <iframe
                                            src={pros.src}
                                            className="aspect-video w-full"
                                            title="YouTube video player"
                                            allowFullScreen></iframe>
                                    </div>
                                </div>
                            ) : (
                                <iframe pros></iframe>
                            );
                        },
                    }}
                />
            </article>
        </>
    );
};

export default MarkdownRender;
