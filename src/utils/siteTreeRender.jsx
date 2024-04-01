import { FaFolderClosed } from "react-icons/fa6";
const SiteTreeRender = (renderProps) => {
    function FileItem({ files }) {
        return (
            <ul className="menu gap-1 ">
                {files.map((file, index) => (
                    <li key={file.name} className="whitespace-normal">
                        <a
                            href={file.url}
                            className={`static ${
                                file.url == decodeURI(location.pathname)
                                    ? "active pointer-events-none "
                                    : ""
                            }`}>
                            <div className="capitalize">
                                {/* {!renderProps.isIndex &&
                                lookupObj["new"].includes(
                                    parseInt((file.name.match(/ch(\d+)/i) || [])[1])
                                ) ? (
                                    // <span className="indicator-item indicator-start badge badge-accent badge-xs -left-1 -top-0"></span>
                                    <>
                                        <span className="absolute flex h-3 w-3 top-1 left-1">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                        </span>
                                    </>
                                ) : null} */}

                                {file.name.includes(" - ") ? (
                                    file.name.split(" - ").map((part, index) => (
                                        <div
                                            key={index}
                                            className={`${index == 1 ? "font-bold" : null}`}>
                                            {part}
                                        </div>
                                    ))
                                ) : (
                                    <>{file.name}</>
                                )}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        );
    }

    function Directory({ directory }) {
        return (
            <ul className={`menu gap-1`}>
                {Object.entries(directory).map(([key, value]) => (
                    <li key={key} className="whitespace-normal">
                        <details
                            open={
                                decodeURI(location.pathname).includes(key) 
                            }>
                            <summary>
                                <strong className="pointer-events-none flex gap-4">
                                    <FaFolderClosed className="shrink-0" />
                                    <span>{key}</span>
                                </strong>
                            </summary>
                            {value.files.length > 0 ? <FileItem files={value.files} /> : <></>}
                            {Object.keys(value.subdirectory).length > 0 ? (
                                <Directory directory={value.subdirectory} />
                            ) : (
                                <></>
                            )}
                        </details>
                    </li>
                ))}
            </ul>
        );
    }

    return <Directory directory={renderProps.groupedFiles} />;
};

export default SiteTreeRender;
