import React from "react";

import MarkdownRender from "./markdownRender";

const MarkdownPage = (renderProps) => {
    return (
        <>
            <div>
                <MarkdownRender mdstr={renderProps.mdstr}></MarkdownRender>
            </div>
        </>
    );
};

export default MarkdownPage;
