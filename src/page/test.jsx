import { ThemeProvider } from "../utils/themeContext";
import Nav_bar from "../utils/nav_bar";
import MarkdownPage from "../utils/markdownPage";
import mdstr from "./../Notes/markdownCheatsheet.md?raw";


function TestPage() {
    return (
        <>
            <ThemeProvider>
                <Nav_bar></Nav_bar>
                <MarkdownPage mdstr={mdstr}></MarkdownPage>
            </ThemeProvider>
        </>
    );
}

export default TestPage;
