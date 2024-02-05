import "./App.css";

import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/index";
import NoMatch from "./page/404";
import TestPage from "./page/test";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path='test' element={<TestPage/>}/>

                <Route path="/*" element={<NoMatch />} />

            </Routes>
        </Router>
    );
}
export default App;
