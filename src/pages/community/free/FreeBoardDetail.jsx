import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "../../../styles/community/boardDetail.css";
import CommunityNav from "../../../components/CommusityNav";

const FreeBoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext); // 로그인된 사용자 정보

    // 더미 데이터 (백엔드 연동 전)
    const post = {
        id: 1,
        title: "오늘 날씨가 좋네요!",
        author: "user01",
        time: "2시간 전",
        views: 120,
        likes: 5,
        content: "오늘 날씨가 너무 좋아요! 다들 산책 나가셨나요?"
    };

    // 삭제 핸들러
    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            console.log(`게시글 ${id} 삭제`);
            alert("게시글이 삭제되었습니다.");
            navigate("/community/free"); // 삭제 후 자유게시판 목록으로 이동
        }
    };

    // 수정 핸들러
    const handleEdit = () => {
        navigate(`/community/free/edit/${id}`);
    };

    return (
        <div className="detail-container">
            <CommunityNav />
            <h2 className="board-title">📌 자유게시판</h2>

            <div className="post-detail">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-meta">
                    <span>작성자: {post.author}</span> · <span>{post.time}</span> · <span>조회 {post.views}</span>
                </div>
                <div className="post-content">{post.content}</div>
            </div>

            {/* 본인이 작성한 글일 때만 수정 & 삭제 버튼 표시 */}
            {currentUser === post.author && (
                <div className="button-group">
                    <button className="edit-btn" onClick={handleEdit}>✏️ 수정</button>
                    <button className="delete-btn" onClick={handleDelete}>🗑️ 삭제</button>
                </div>
            )}

            <button className="back-btn" onClick={() => navigate(-1)}>← 목록으로</button>
        </div>
    );
};

export default FreeBoardDetail;
