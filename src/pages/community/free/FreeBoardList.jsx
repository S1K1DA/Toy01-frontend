import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'; 
import { getFreeBoardList } from '../../../services/boardService';
import { formatTimeAgo } from '../../../utils/timeFormatter';
import '../../../styles/community/boardList.css';
import CommunityNav from '../../../components/CommusityNav';

const FreeBoardList = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1);

    // 백엔드에서 게시글 데이터 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getFreeBoardList("free", searchTerm, currentPage);
                setPosts(data); // 📌 데이터 업데이트
            } catch (error) {
                console.error("게시글 목록 불러오기 실패:", error);
            }
        };
        fetchPosts();
    }, [searchTerm, currentPage]); 


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
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div className="post-card" key={post.id} onClick={() => {
                            navigate(`/community/free/detail/${post.boardNo}`);
                        }}>
                            <div className="post-info">
                                <span className="author">{post.nickname}</span>
                                <span className="views">조회수 {post.views}👍{post.likes}</span>
                            </div>
                                <span className="time">{formatTimeAgo(post.createdAt)}</span>
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

export default FreeBoardList;
