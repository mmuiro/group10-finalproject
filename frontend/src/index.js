import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCourseStatsPage from "./views/MyCourseStatsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MyCourseStatsPage />} />
                    <Route
                        path="/user/viewCourse/:id"
                        element={<MyCourseStatsPage />}
                    />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </ChakraProvider>
);
