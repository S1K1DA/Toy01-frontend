import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoardDetail, updateBoard } from "../../../services/boardService";
import "../../../styles/community/boardCreate.css";
import CommunityNav from "../../../components/CommusityNav";

const StudyBoardEdit = () => {
    const { id } = useParams();
    const boardNo = Number(id);
    const navigate = useNavigate();

    const [post, setPost] = useState({ title: "", content: "", tags: [] });
    const [selectedTags, setSelectedTags] = useState([]);

    const tagsList = ["프로그래밍", "취업준비", "언어공부", "자격증", "프로젝트", "스킬업", "취미"];

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getBoardDetail(boardNo);
                setPost({ title: data.title, content: data.content, tags: data.tags });
                setSelectedTags(data.tags);
            } catch (error) {
                alert("게시글 정보를 불러오는데 실패했습니다.");
                navigate(-1);
            }
        };
        fetchPost();
    }, [boardNo, navigate]);


    const handleTagClick = (tag) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };


    // 제목 & 내용 수정 핸들러
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    // 수정 버튼 핸들러
    const handleEdit = async (e) => {
        e.preventDefault();

        if (!post.title.trim() || !post.content.trim()) {
            alert("제목과 내용을 입력해주세요!");
            return;
        }

        try {
            const updatedData = { ...post, tags: selectedTags };
            await updateBoard(boardNo, updatedData);
            alert("게시글이 수정되었습니다!");
            navigate(`/community/study/detail/${boardNo}`);
        } catch (error) {
            alert("게시글 수정 실패: " + (error.response?.data || error.message));
        }
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

                <button type="submit" className="submit-btn">수정하기</button>
            </form>
        </div>
    );
};

export default StudyBoardEdit;
