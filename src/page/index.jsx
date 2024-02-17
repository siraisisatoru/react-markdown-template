import React from "react";
import { ThemeProvider, UseTheme } from "../utils/themeContext";
import Nav_bar from "../utils/nav_bar";
import Footer from "../utils/footer";
import { FaCheckCircle } from "react-icons/fa";


function MainHome() {
    const { isDarkTheme, setDarkTheme } = UseTheme();

    return (

        <div className=" flex flex-col max-w-[120ch] px-8 md:px-20 mx-auto mt-6 gap-4">
            <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 m-4 sm:my-auto ">
                        <img
                            className="w-40 h-40 mx-auto rounded-2xl shadow-lg "
                            src="img/profileIcon.jpg"></img>
                    </div>
                    {/* <div className="w-full bg-pink-500 z-50 p-4"> */}
                    <div className="w-full p-4">
                        <h1 className="mb-2 border-b leading-snug border-gray-800 text-center text-2xl">
                            Hi 👋, I'm SiraisiSatoru
                        </h1>
                        <h3 className="indent-4">
                            A passionate full stack developer, IoT architect from Hong Kong living
                            in Sydney
                        </h3>
                        <ul className="list-disc ml-4">
                            <li>
                                <span>🔭 I'm currently working on </span>
                                <a
                                    className="link"
                                    href="https://github.com/siraisisatoru/react-markdown-template">
                                    react wiki template
                                </a>
                            </li>
                            <li>
                                <span>🌱 I’m currently learning </span>
                                <strong>Python and C</strong>
                            </li>
                            <li>
                                <span>💬 Ask me about </span>
                                <strong>IoT and Python</strong>
                            </li>
                            <li>
                                <span>⚡ Fun fact, </span>
                                <strong>
                                    I am an electronic graduate but develop websites and train
                                    machine learning models.
                                </strong>
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 className="text-lg mb-4 font-bold">Languages and Tools:</h3>
                {/* <div className="flex flex-row flex-wrap justify-center gap-4 p-3 bg-neutral-content/50 rounded-xl"> */}
                <div
                    className={`flex flex-row flex-wrap justify-center gap-4 p-3 rounded-xl ${
                        isDarkTheme ? "bg-gray-300/80" : ""
                    }`}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/e/ef/SystemVerilog_logo.png"
                        alt="system verilog"
                        className="h-10 "
                    />
                    <a href="https://www.arduino.cc/">
                        <img
                            src="https://cdn.worldvectorlogo.com/logos/arduino-1.svg"
                            alt="arduino"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://www.cprogramming.com/">
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg"
                            alt="c"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://www.w3schools.com/cpp/">
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg"
                            alt="cplusplus"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://www.docker.com/">
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"
                            alt="docker"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://reactjs.org/">
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
                            alt="react"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://tailwindcss.com/">
                        <img
                            src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
                            alt="tailwind"
                            className="h-10 w-10"
                        />
                    </a>

                    <a href="https://www.w3schools.com/css/">
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"
                            alt="css3"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://www.w3.org/html/">
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
                            alt="html5"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                            alt="javascript"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="hexo.io/">
                        <img
                            src="https://www.vectorlogo.zone/logos/hexoio/hexoio-icon.svg"
                            alt="hexo"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://firebase.google.com/">
                        <img
                            src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
                            alt="firebase"
                            className="h-10 w-10"
                        />
                    </a>

                    <a href="https://git-scm.com/">
                        <img
                            src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg"
                            alt="git"
                            className="h-10 w-10"
                        />
                    </a>

                    <a href="https://www.python.org">
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
                            alt="python"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://pytorch.org/">
                        <img
                            src="https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg"
                            alt="pytorch"
                            className="h-10 w-10"
                        />
                    </a>

                    <a href="https://scikit-learn.org/" className="flex justify-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg"
                            alt="scikit_learn"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://opencv.org/">
                        <img
                            src="https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg"
                            alt="opencv"
                            className="h-10 w-10"
                        />
                    </a>
                    <a href="https://www.mathworks.com/">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png"
                            alt="matlab"
                            className="h-10 w-10"
                        />
                    </a>
                </div>
            </div>

            <div className="">
                <h3 className="text-lg mb-4 font-bold">Other projects:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        className={`card shadow-xl m-4 ${
                            isDarkTheme ? "bg-gray-800 " : "bg-base-300 shadow-slate-400"
                        }`}>
                        <div className="card-body">
                            <h2 className="card-title">Indoor smart bin monitoring system</h2>
                            <p>
                                An IoT project that constantly sense bin fullness and upload to
                                Firebase in real time. Fully accessible use customised dashboard.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`card shadow-xl m-4 ${
                            isDarkTheme ? "bg-gray-800 " : "bg-base-300 shadow-slate-400"
                        }`}>
                        <div className="card-body">
                            <h2 className="card-title">Two stage pipelined RISC-V CPU</h2>
                            <p>Program a RISC-V CPU using system verilog</p>
                        </div>
                    </div>
                    <div
                        className={`card shadow-xl m-4 ${
                            isDarkTheme ? "bg-gray-800 " : "bg-base-300 shadow-slate-400"
                        }`}>
                        <div className="card-body">
                            <h2 className="card-title">WSPR decoder</h2>
                            <p>
                                A simple implementation decodes WSPR signals via microphone input
                                and convert into string.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`card shadow-xl m-4 ${
                            isDarkTheme ? "bg-gray-800 " : "bg-base-300 shadow-slate-400"
                        }`}>
                        <div className="card-body">
                            <h2 className="card-title">Image process library for Hexo in js</h2>
                            <p>An alternative user script that manupulates image in HEXO.</p>
                        </div>
                    </div>
                    <div
                        className={`card shadow-xl m-4 ${
                            isDarkTheme ? "bg-gray-800 " : "bg-base-300 shadow-slate-400"
                        }`}>
                        <div className="card-body">
                            <h2 className="card-title">
                                Logistic system simulation with data server and arduino devices
                            </h2>
                            <p>A simulation of modern logistic system.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Home() {
    return (
        <>

            <div className="flex flex-col min-h-screen">
                <ThemeProvider>
                    <div className="mb-6">
                        <Nav_bar></Nav_bar>

                        <MainHome></MainHome>
                    </div>
                    <Footer></Footer>
                </ThemeProvider>
            </div>
        </>
    );
}
export default Home;
