import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/community/boardCreate.css";
import CommunityNav from "../../../components/CommusityNav";

const FreeBoardEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 더미 데이터 (백엔드 연동 전)
    const post = {
        id: 1,
        title: "오늘 날씨가 좋네요!",
        author: "user01",
        content: "오늘 날씨가 너무 좋아요! 다들 산책 나가셨나요?"
    };

    // 상태 관리 (기존 글 데이터 불러오기)
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    // 수정 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = { id, title, content };
        console.log("수정된 글:", updatedPost);
        alert("게시글이 수정되었습니다.");
        navigate(`/community/free/detail/${id}`); // 수정 완료 후 상세 페이지로 이동
    };

    return (
        <div className="edit-container">
            <CommunityNav />
            <h2 className="board-title">✏️ 자유게시판 글 수정</h2>

            <form className="post-form" onSubmit={handleSubmit}>
                {/* 제목 입력 */}
                <input
                    type="text"
                    placeholder="제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                {/* 내용 입력 */}
                <textarea
                    placeholder="내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                {/* 버튼 그룹 */}
                <div className="button-group">
                    <button type="submit" className="submit-btn">✅ 수정 완료</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate(`/community/free/detail/${id}`)}>❌ 취소</button>
                </div>
            </form>
        </div>
    );
};

export default FreeBoardEdit;
