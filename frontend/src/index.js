import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCourseStatsPage from "./views/MyCourseStatsPage";
import LandingPage from "./views/LandingPage";
import UserHomePage from "./views/UserHomePage";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import AddScoreCardPage from "./views/AddScoreCardPage";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider>
        <React.StrictMode>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/user/viewCourse/:id"
                        element={<MyCourseStatsPage />}
                    />
                    <Route path="/home" element={<UserHomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                        path="/addScoreCard"
                        element={<AddScoreCardPage />}
                    />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </ChakraProvider>
);
