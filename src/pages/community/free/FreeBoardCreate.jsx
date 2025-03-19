import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../../services/boardService";
import "../../../styles/community/boardCreate.css";
import CommunityNav from "../../../components/CommusityNav";

const FreeBoardCreate = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 글 작성 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("제목과 내용을 입력해주세요!");
            return;
        }

        try {
            const boardData = {
                title,
                content,
                category: "free",
            };

            const boardNo = await createBoard(boardData);
            alert("자유 게시글이 등록되었습니다!");

            navigate(`/community/free/detail/${boardNo}`);
        } catch (error) {
            alert("게시글 작성 실패: " + (error.response?.data || error.message));
        }
    };



    return (
        <div className="Create-Container">
            <CommunityNav />
            <h2 className="board-title">✍️ 자유게시판 글쓰기</h2>

            <form className="post-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <button type="submit" className="submit-btn">등록하기</button>
            </form>
        </div>
    );
};

export default FreeBoardCreate;
