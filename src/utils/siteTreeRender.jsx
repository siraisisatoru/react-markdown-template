import { FaFolderClosed } from "react-icons/fa6";

const SiteTreeRender = (renderProps) => {
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
                        <strong className="pointer-events-none">
                            <FaFolderClosed />
                            {key}
                        </strong>
                        <FileItem files={value.files} />
                        <Directory directory={value.subdirectory} />
                    </li>
                ))}
            </ul>
        );
    }

    return <Directory directory={renderProps.groupedFiles} />;
};

export default SiteTreeRender;
