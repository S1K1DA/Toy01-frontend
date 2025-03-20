import React from "react";
import { Routes, Route } from "react-router-dom";
import StudyBoardList from "../../pages/community/study/StudyBoardList";
import StudyBoardCreate from "../../pages/community/study/StudyBoardCreate";
import StudyBoardDetail from "../../pages/community/study/StudyBoardDetail";
import StudyBoardEdit from "../../pages/community/study/StudyBoardEdit";
import FreeBoardList from "../../pages/community/free/FreeBoardList";
import FreeBoardCreate from "../../pages/community/free/FreeBoardCreate";
import FreeBoardDetail from "../../pages/community/free/FreeBoardDetail";
import FreeBoardEdit from "../../pages/community/free/FreeBoardEdit";

const BoardRouter = () => {
    return (
        <Routes>
            <Route path="/study" element={<StudyBoardList />} />
            <Route path="/free" element={<FreeBoardList />} />

            <Route path="/study/create" element={<StudyBoardCreate />} />
            <Route path="/free/create" element={<FreeBoardCreate />} />

            <Route path="/study/detail/:id" element={<StudyBoardDetail />} />
            <Route path="/free/detail/:id" element={<FreeBoardDetail />} />

            <Route path="/study/edit/:id" element={<StudyBoardEdit />} />
            <Route path="/free/edit/:id" element={<FreeBoardEdit />} />
        </Routes>
    );
};

export default BoardRouter;