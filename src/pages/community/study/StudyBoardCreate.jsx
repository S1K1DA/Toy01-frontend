import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../../services/boardService";
import "../../../styles/community/boardCreate.css";
import CommunityNav from "../../../components/CommusityNav";

const StudyBoardCreate = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const tagsList = ["프로그래밍", "취업준비", "언어공부", "자격증", "프로젝트", "스킬업", "취미"];

    // 태그 선택 핸들러
    const handleTagClick = (tag) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };

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
                category: "study",
                tags: selectedTags,
            };

            const boardNo = await createBoard(boardData);
            alert("스터디 게시글이 성공적으로 등록되었습니다!");

            navigate(`/community/study/detail/${boardNo}`);
        } catch (error) {
            alert("게시글 작성 실패: " + (error.response?.data || error.message));
        }
    };

    return (
        <div className="Create-Container">
            <CommunityNav />
            <h2 className="board-title">✍️ 스터디 게시판 글쓰기</h2>

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

                <div className="tag-selection">
                    <h4>태그 선택</h4>
                    <div className="tag-list">
                        {tagsList.map((tag) => (
                            <button
                                type="button"
                                key={tag}
                                className={`tag-item ${selectedTags.includes(tag) ? "selected" : ""}`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-btn">등록하기</button>
            </form>
        </div>
    );
};

export default StudyBoardCreate;
