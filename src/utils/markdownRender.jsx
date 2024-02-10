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

import rehypeAutolink from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";

// MARKDOWN ===============================================

// SYNTAXHIGHLIGHTER ======================================
// import SyntaxHighlighter from "react-syntax-highlighter";
import { Prism as SyntaxHighlighter, createElement } from "react-syntax-highlighter";
import { vscDarkPlus, coldarkCold } from "react-syntax-highlighter/dist/cjs/styles/prism";
// SYNTAXHIGHLIGHTER ======================================

// PYTHON =================================================
import Codeblock from "./../utils/codeblock";
import * as Comlink from "comlink/dist/esm/comlink";
import { useAsync } from "react-use";
// PYTHON =================================================

// UILT  ==================================================
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";

// UILT  ==================================================

const MarkdownRender = (renderProps) => {
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
    const { isDarkTheme, setDarkTheme } = UseTheme();


    const pyodideRef = useRef(null); // Ref to store the Comlink instance
    const { loading } = useAsync(async () => {
        // const worker = new Worker();
        const worker = new Worker(new URL('./js/worker.js', import.meta.url), { type: 'module' })
        let pyodideWorker = await Comlink.wrap(worker);
        await pyodideWorker.init();
        pyodideRef.current = pyodideWorker; // Store the Comlink instance in the ref
    }, []);

    return (
        <>
            {console.log("render")}
            
            <div className=" p-11">
                <article className="prose !max-w-[80ch]">
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
                                const language = children.props.className?.replace(
                                    /language-/g,
                                    ""
                                );
                                const libList = node.children[0].properties?.dataMeta;

                                return (
                                    <>
                                        <div className="relative overflow-x-hidden ">
                                            <button
                                                className="right-0 tooltip tooltip-left absolute z-40 mr-2 mt-5"
                                                data-tip={copyTip}
                                                onClick={async () => {
                                                    setCopyTip("Copied");
                                                    try {
                                                        await navigator.clipboard.writeText(
                                                            codeChunk
                                                        );
                                                        await new Promise((resolve) =>
                                                            setTimeout(resolve, 500)
                                                        );
                                                    } catch (error) {
                                                        console.error(error.message);
                                                    }
                                                    setCopyTip(`Copy code`);
                                                }}>
                                                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer hover:text-blue-600" />
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
                                                            const lineNumberElement =
                                                                children?.shift();

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

                                        {node.children[0].properties?.dataMeta?.match(
                                            /^(run\b.*)$/i
                                        ) ? (
                                            <>
                                            {/* the code in this code block is python, try to render the output for it */}
                                            <pre className="not-prose">
                                                {loading ? (
                                                    <p>Loading Pyodide...</p>
                                                ) : (
                                                    <div>
                                                        <Codeblock
                                                            pyodide={pyodideRef.current}
                                                            code={codeChunk}
                                                            libListStr={libList}
                                                        />
                                                    </div>
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
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    className="stroke-current shrink-0 w-6 h-6">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            ) : node.properties.className?.includes(
                                                  "alert-success"
                                              ) ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="stroke-current shrink-0 h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            ) : node.properties.className?.includes(
                                                  "alert-warning"
                                              ) ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="stroke-current shrink-0 h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                    />
                                                </svg>
                                            ) : node.properties.className?.includes(
                                                  "alert-error"
                                              ) ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="stroke-current shrink-0 h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    className="stroke-info shrink-0 w-6 h-6">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            )}
                                            <span>{children.props.children}</span>
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
                                        className={`mt-12 mb-0 border-b leading-snug ${
                                            isDarkTheme ? "border-gray-200" : "border-gray-800"
                                        } `}></h1>
                                );
                            },

                            h2: ({ node, ...props }) => {
                                return <h2 {...props} className={`mt-4 mb-3 leading-snug`}></h2>;
                            },
                        }}
                    />
                </article>
            </div>
        </>
    );
};

export default MarkdownRender;
