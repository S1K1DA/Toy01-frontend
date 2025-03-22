import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'; 
import { getStudyBoardList } from '../../../services/boardService';
import { formatTimeAgo } from '../../../utils/timeFormatter';
import '../../../styles/community/boardList.css';
import CommunityNav from '../../../components/CommusityNav';

const StudyBoardList = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");  
    const [selectedTag, setSelectedTag] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    // 백엔드에서 게시글 데이터 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getStudyBoardList("study", searchTerm, selectedTag, currentPage);
                setPosts(data); // 📌 데이터 업데이트
            } catch (error) {
                console.error("게시글 목록 불러오기 실패:", error);
            }
        };
        fetchPosts();
    }, [searchTerm, selectedTag, currentPage]); 

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="study-board-container">
            <CommunityNav />
            <h2 className="board-title">📌 스터디 구인/구직 게시판</h2>

            {/* 검색창 */}
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="검색어를 입력하세요..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">🔍</button>
            </div>

            {/* 태그 리스트 */}
            <div className="tag-list">
                {["프로그래밍", "취업준비", "언어공부", "자격증", "프로젝트", "스킬업", "취미"].map(tag => (
                    <button 
                        key={tag} 
                        className={`tag ${selectedTag === tag ? "active" : ""}`} 
                        onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* 게시글 리스트 */}
            <div className="post-list">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div className="post-card" 
                             key={post.id}
                             onClick={() => {
                                navigate(`/community/study/detail/${post.boardNo}`);
                            }}
                             style={{ cursor: "pointer" }}
                        >
                            <div className="post-info">
                                <span className="author">{post.nickname}</span>  
                                <span className="views">조회수 {post.views} 👍{post.likes}</span>
                            </div>
                                <span className="time">{formatTimeAgo(post.createdAt)}</span>
                            <h3 className="post-title">{post.title}</h3>
                            <div className="tags">
                                {post.tags.map(tag => (
                                    <span className="tag-item" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-posts">📌 해당 검색어/태그에 맞는 게시물이 없습니다.</p>
                )}
            </div>
                    
            {isLoggedIn &&
            <button className="write-btn" onClick={() => navigate("/community/study/create")}>✍️ 글쓰기</button>
            }

            {/* 페이지네이션 */}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                <button className={currentPage === 1 ? "active" : ""} onClick={() => handlePageChange(1)}>1</button>
                <button className={currentPage === 2 ? "active" : ""} onClick={() => handlePageChange(2)}>2</button>
                <button className={currentPage === 3 ? "active" : ""} onClick={() => handlePageChange(3)}>3</button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === 3}>&gt;</button>
            </div>
        </div>
    );
};

export default StudyBoardList;
