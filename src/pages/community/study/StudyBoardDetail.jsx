import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "../../../styles/community/boardDetail.css";
import CommunityNav from "../../../components/CommusityNav";

const StudyBoardDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext); // 현재 로그인한 유저 정보

    // 더미 데이터 (백엔드 연동 전)
    const post = {
        id: 1,
        title: "IT기획, PM, PO 취준생을 위한 스터디 모집",
        author: "효소",
        time: "1시간 전",
        views: 62,
        likes: 10,
        content: "이 스터디는 IT 기획과 PM, PO를 준비하는 분들을 위한 스터디입니다. 관심 있는 분들의 많은 참여 부탁드립니다!",
        tags: ["취업준비"]
    };

    // 삭제 버튼 핸들러
    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            console.log(`게시글 ${id} 삭제`);
            alert("게시글이 삭제되었습니다.");
            navigate("/community/study"); // 삭제 후 리스트 페이지로 이동
        }
    };

    // 수정 버튼 핸들러
    const handleEdit = () => {
        navigate(`/community/study/edit/${id}`);
    };

    return (
        <div className="detail-container">
            <CommunityNav />
            <h2 className="board-title">📌 스터디 구인/구직 게시판</h2>

            <div className="post-detail">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-meta">
                    <span>작성자: {post.author}</span> · <span>{post.time}</span> · <span>조회 {post.views}</span>
                </div>
                <div className="post-content">{post.content}</div>
            </div>

            <div className="tags">
                {post.tags.map(tag => (
                    <span className="tag-item" key={tag}>{tag}</span>
                ))}
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

export default StudyBoardDetail;