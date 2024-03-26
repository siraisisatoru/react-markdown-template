import React, { useContext } from "react";
import { UseTheme, GetInitialTheme } from "./themeContext";
import { FaBars, FaFlaskVial } from "react-icons/fa6";
import { FaGoogle, FaUserAlt, FaHome, FaRoute } from "react-icons/fa";
import wikiLogo from "/img/logo.svg";
import { FullFilesContext } from "../App";
import SiteTreeRender from "./siteTreerender";
import SearchBar from "./searchBar";

const Nav_bar = () => {
    const { isDarkTheme, setDarkTheme } = UseTheme();
    const { groupedFiles, searchList } = useContext(FullFilesContext);

    return (
        <>
            <nav className="navbar bg-base-200 sticky top-0 z-50">
                <div className="flex-none">
                    <div className="drawer z-50">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label
                                htmlFor="my-drawer"
                                className="btn bg-transparent border-none shadow-none drawer-button">
                                <FaBars />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label
                                htmlFor="my-drawer"
                                aria-label="close sidebar"
                                className="drawer-overlay"></label>
                            <ul className="menu pt-8 p-4 w-[16rem] sm:w-80 gap-4  min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <a
                                    className="btn btn-ghost gap-1 sm:gap-4 hover:bg-transparent text-lg sm:text-xl my-8"
                                    href="/">
                                    <img
                                        src={wikiLogo}
                                        alt="react-markdown-template"
                                        className="h-7 sm:h-10"
                                    />
                                    <p>react markdown template</p>
                                </a>

                                <li>
                                    <a href="/">
                                        <FaHome />
                                        Home page
                                    </a>
                                </li>
                                <li>
                                    <a href="/test">
                                        <FaFlaskVial />
                                        Markdown function tests
                                    </a>
                                </li>
                                <li>
                                    {/* <SiteTreeRender></SiteTreeRender> */}
                                    <strong className="pointer-events-none">
                                        <FaRoute />
                                        Notes index
                                    </strong>

                                    <SiteTreeRender groupedFiles={groupedFiles} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1">
                    <a
                        className="btn btn-ghost gap-4 hover:bg-transparent text-lg sm:text-xl"
                        href="/">
                        <img src={wikiLogo} alt="react-markdown-template" className="h-10" />
                        react markdown template
                    </a>
                </div>

                <div className="flex-none">
                    <SearchBar searchList={searchList} />
                    <div className="dropdown dropdown-hover dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm sm:btn-md m-1 btn-square btn-ghost">
                            {/* <FaEllipsis /> */}
                            <FaUserAlt />
                        </div>

                        <ul
                            tabIndex={0}
                            className={`dropdown-content z-[1]shadow-xl border ${
                                isDarkTheme ? "border-neutral-600" : "border-neutral-300"
                            }  bg-base-100 rounded-box w-44`}>
                            <li className="m-3">
                                <button className="btn btn-ghost w-full">
                                    <FaGoogle /> Log-in
                                </button>
                            </li>

                            <li className="m-3">
                                <select
                                    data-choose-theme
                                    onChange={(event) => {
                                        setDarkTheme(
                                            event.target.value == "dark"
                                                ? true
                                                : event.target.value == "light"
                                                ? false
                                                : GetInitialTheme()
                                        );
                                        event.target.blur();
                                    }}
                                    className="select btn-ghost w-full max-w-40 border-none focus:outline-none focus:ring focus:ring-transparent ">
                                    <option value="">System theme</option>
                                    <option value="dark">Dark theme</option>
                                    <option value="light">Light theme</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav_bar;
