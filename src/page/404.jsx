import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, UseTheme } from "../utils/themeContext";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Main404() {
    const { isDarkTheme, setDarkTheme } = UseTheme();
    const navigate = useNavigate();

    return (
        <>
            <section className={`${isDarkTheme ? "bg-gray-900" : "bg-white"} `}>
                <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                    <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                        <p
                            className={`p-3 text-sm font-medium text-blue-500 rounded-full ${
                                isDarkTheme ? "bg-gray-800" : "bg-blue-50"
                            } `}>
                            <HiOutlineExclamationCircle className="w-6 h-6" />
                        </p>
                        <h1
                            className={`mt-3 text-2xl font-semibold md:text-3xl ${
                                isDarkTheme ? "text-white" : "text-gray-800"
                            } `}>
                            Page not found
                        </h1>
                        <p className={`mt-4 ${isDarkTheme ? "text-gray-400" : "text-gray-500"} `}>
                            The page you are looking for doesn't exist. Here are some helpful links:
                        </p>

                        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                            <button
                                onClick={() => navigate(-1)}
                                className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm transition-colors duration-200 border rounded-lg gap-x-2 sm:w-auto ${
                                    isDarkTheme
                                        ? "hover:bg-gray-800 bg-gray-900 text-gray-200 border-gray-700"
                                        : "hover:bg-gray-100 bg-white text-gray-700"
                                } `}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 rtl:rotate-180">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                    />
                                </svg>

                                <span>Go back</span>
                            </button>

                            <a
                                href="/"
                                className={`w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200  rounded-lg shrink-0 sm:w-auto  ${
                                    isDarkTheme
                                        ? "hover:bg-blue-500 bg-blue-600"
                                        : "hover:bg-blue-600 bg-blue-500"
                                } `}>
                                Take me home
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function NoMatch() {
    return (
        <>
            <ThemeProvider>
                <Main404></Main404>
            </ThemeProvider>
        </>
    );
}

export default NoMatch;
