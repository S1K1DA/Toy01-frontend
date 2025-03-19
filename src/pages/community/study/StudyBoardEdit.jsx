import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/community/boardCreate.css";
import CommunityNav from "../../../components/CommusityNav";

const StudyBoardEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 기존 게시글 데이터 (더미 데이터)
    const [post, setPost] = useState({
        title: "IT기획, PM, PO 취준생을 위한 스터디 모집",
        content: "이 스터디는 IT 기획과 PM, PO를 준비하는 분들을 위한 스터디입니다. 관심 있는 분들의 많은 참여 부탁드립니다!",
    });

    // 제목 & 내용 수정 핸들러
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    // 수정 버튼 핸들러
    const handleEdit = (e) => {
        e.preventDefault();
        console.log("수정된 글:", post);
        alert("게시글이 수정되었습니다!");
        navigate(`/community/study/detail/${id}`);
    };

    return (
        <div className="Create-Container">
            <CommunityNav />
            <h2 className="board-title">✏️ 스터디 구인/구직 게시판 수정</h2>

            <form className="post-form" onSubmit={handleEdit}>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-btn">수정하기</button>
            </form>
        </div>
    );
};

export default StudyBoardEdit;
