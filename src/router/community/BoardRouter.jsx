import React from "react";
import { Routes, Route } from "react-router-dom";
import StudyBoard from "../../pages/community/StudyBoard";
import FreeBoard from "../../pages/community/FreeBoard";

const BoardRouter = () => {
    return (
        <Routes>
            <Route path="/study" element={<StudyBoard />} />
            <Route path="/free" element={<FreeBoard />} />
        </Routes>
    );
};

export default BoardRouter;