import React from "react";
import { FaRegCopyright, FaGithub } from "react-icons/fa6";
import { FaReact, FaArrowUp } from "react-icons/fa";
import { SiTailwindcss, SiDaisyui } from "react-icons/si";
import ScrollToTop from "react-scroll-to-top";

const Footer = () => {
    return (
        <>
            <ScrollToTop
                smooth
                className="!bg-base-300 !bottom-24 !z-50"
                component={<FaArrowUp className="m-auto" />}
            />

            <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto ">
                <aside>
                    <p>
                        <a href="https://github.com/siraisisatoru/">
                            <FaGithub className="inline" />
                        </a>
                    </p>
                    <p>
                        <FaRegCopyright className="inline" />
                        <span> 2024 SiraisiSatoru. All right reserved.</span>
                    </p>
                    <p>
                        <span>Powered by </span>
                        <a href="https://react.dev/">
                            React <FaReact className="inline" />
                        </a>
                        <span> , </span>
                        <a href="https://tailwindcss.com/">
                            Tailwind <SiTailwindcss className="inline" />
                        </a>
                        <span> and </span>
                        <a href="https://daisyui.com/">
                            Daisyui <SiDaisyui className="inline text-3xl" />
                        </a>
                        <span>.</span>
                    </p>
                </aside>
            </footer>
        </>
    );
};

export default Footer;
