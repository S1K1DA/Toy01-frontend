import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoardDetail, updateBoard } from "../../../services/boardService";
import "../../../styles/community/boardCreate.css";
import CommunityNav from "../../../components/CommusityNav";

const FreeBoardEdit = () => {
    const { id } = useParams();
    const boardNo = Number(id);
    const navigate = useNavigate();

    // 게시글 상태 (기본값 빈 값)
    const [post, setPost] = useState({ title: "", content: "" });

    // 📌 기존 게시글 데이터 불러오기
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getBoardDetail(boardNo);
                setPost({ title: data.title, content: data.content });
            } catch (error) {
                alert("게시글 정보를 불러오는 데 실패했습니다.");
                navigate(-1); // 실패 시 뒤로가기
            }
        };
        fetchPost();
    }, [boardNo, navigate]);

    // 📌 제목 & 내용 수정 핸들러
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    // 📌 게시글 수정 요청
    const handleEdit = async (e) => {
        e.preventDefault();

        if (!post.title.trim() || !post.content.trim()) {
            alert("제목과 내용을 입력해주세요!");
            return;
        }

        try {
            await updateBoard(boardNo, post);
            alert("게시글이 수정되었습니다!");
            navigate(`/community/free/detail/${boardNo}`);
        } catch (error) {
            alert("게시글 수정 실패: " + (error.response?.data || error.message));
        }
    };

    return (
        <div className="Create-Container">
            <CommunityNav />
            <h2 className="board-title">✏️ 자유게시판 글 수정</h2>

            <form className="post-form" onSubmit={handleEdit}>
                {/* 제목 입력 */}
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                />

                {/* 내용 입력 */}
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    required
                />

                {/* 버튼 그룹 */}
                    <button type="submit" className="submit-btn">수정하기</button>
            </form>
        </div>
    );
};

export default FreeBoardEdit;
