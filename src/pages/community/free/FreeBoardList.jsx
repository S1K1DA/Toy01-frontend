import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'; 
import '../../../styles/community/boardList.css';
import CommunityNav from '../../../components/CommusityNav';

const FreeBoard = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    // 더미 데이터 (백엔드 연동 전에 테스트용)
    const posts = [
        { id: 1, title: "자유게시판 첫 번째 글", author: "user01", time: "2시간 전", views: 120, likes: 5 },
        { id: 2, title: "오늘 날씨가 좋네요!", author: "user02", time: "3시간 전", views: 80, likes: 3 },
        { id: 3, title: "React 관련 질문 있습니다!", author: "user03", time: "5시간 전", views: 200, likes: 10 },
        { id: 4, title: "헬스장 어디가 좋은가요?", author: "user04", time: "1시간 전", views: 90, likes: 7 },
        { id: 5, title: "취업 준비하면서 느낀 점", author: "user05", time: "4시간 전", views: 150, likes: 12 },
    ];

    // 검색 필터링 적용
    const filteredPosts = posts.filter(post => post.title.includes(searchTerm));

    // 페이지네이션 적용 (8개씩)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="free-board-container">
            <CommunityNav />
            <h2 className="board-title">📌 자유게시판</h2>

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

            {/* 게시글 리스트 */}
            <div className="post-list">
                {currentPosts.length > 0 ? (
                    currentPosts.map(post => (
                        <div className="post-card" key={post.id}>
                            <div className="post-info">
                                <span className="author">{post.author}</span> · 
                                <span className="time">{post.time}</span> · 
                                <span className="views">조회 {post.views}</span>
                            </div>
                            <h3 className="post-title">{post.title}</h3>
                        </div>
                    ))
                ) : (
                    <p className="no-posts">📌 해당 검색어에 맞는 게시물이 없습니다.</p>
                )}
            </div>

            {isLoggedIn &&        
            <button className="write-btn" onClick={() => navigate("/community/free/create")}>✍️ 글쓰기</button>       
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

export default FreeBoard;
