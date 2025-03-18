import React from "react";
import { Routes, Route } from "react-router-dom";
import StudyBoard from "../../pages/community/study/StudyBoardList";
import StudyBoardCreate from "../../pages/community/study/StudyBoardCreate";
import FreeBoard from "../../pages/community/free/FreeBoardList";
import FreeBoardCreate from "../../pages/community/free/FreeBoardCreate";

const BoardRouter = () => {
    return (
        <Routes>
            <Route path="/study" element={<StudyBoard />} />
            <Route path="/free" element={<FreeBoard />} />

            <Route path="/study/create" element={<StudyBoardCreate />} />
            <Route path="/free/create" element={<FreeBoardCreate />} />
        </Routes>
    );
};

export default BoardRouter;