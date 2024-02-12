import { ThemeProvider } from "../utils/themeContext";
import Nav_bar from "../utils/nav_bar";
import MarkdownRender from "../utils/markdownRender";
import mdstr from "./../Notes/markdownCheatsheet.md?raw";

function TestPage() {
    return (
        <>
            <ThemeProvider>
                <Nav_bar></Nav_bar>
                <MarkdownRender mdstr={mdstr}></MarkdownRender>
            </ThemeProvider>
        </>
    );
}

export default TestPage;
