// components/MarkdownPage.js
import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from 'remark-gfm'


const MarkdownPage = ({ content }) => {
    const { slug } = useParams();

    return (
        <>
            <div>
                <h2>{slug}</h2>
                {/* {content} */}



                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
        </>
    );
};

export default MarkdownPage;
