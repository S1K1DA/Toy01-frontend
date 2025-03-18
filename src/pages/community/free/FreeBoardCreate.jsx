import React, { useState } from "react";
import "../../../styles/community/boardCreate.css";
import CommunityNav from "../../../components/CommusityNav";

const FreeBoardCreate = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 글 작성 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { title, content };
        console.log("작성된 글:", newPost);
        alert("자유 게시판에 글이 등록되었습니다!");
    };

    return (
        <div className="Create-Container">
            <CommunityNav />
            <h2 className="board-title">✍️ 자유게시판 글쓰기</h2>

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

                {/* 작성 버튼 */}
                <button type="submit" className="submit-btn">등록하기</button>
            </form>
        </div>
    );
};

export default FreeBoardCreate;
