import React, { useState } from 'react';
import '../../styles/community/board.css';
import CommunityNav from '../../components/CommusityNav';

const StudyBoard = () => {
    const [searchTerm, setSearchTerm] = useState("");  
    const [selectedTag, setSelectedTag] = useState("");  

    // 더미 데이터 (백엔드 연동 전에 테스트용)
    const posts = [
        { id: 1, title: "IT기획, PM, PO 취준생을 위한 스터디 모집", author: "효소", time: "1시간 전", views: 62, likes: 10, tags: ["취업준비"] },
        { id: 2, title: "맞춤 학습형 알고리즘 스터디 모집", author: "mandoo", time: "1시간 전", views: 47, likes: 8, tags: ["프로그래밍"] },
        { id: 3, title: "신입 백엔드 취준 메이트 모집", author: "뭉뭉", time: "3시간 전", views: 51, likes: 12, tags: ["프로그래밍"] },
        { id: 4, title: "취업을 위한 영어 스터디 모집", author: "빠샤", time: "3시간 전", views: 11, likes: 5, tags: ["언어공부", "취업준비"] },
        { id: 5, title: "언어 스킬업 스터디 모집", author: "데헷", time: "3시간 전", views: 61, likes: 65, tags: ["언어공부", "스킬업"] },
        { id: 6, title: "배드민턴 취미부 모집", author: "호우", time: "3시간 전", views: 51, likes: 21, tags: ["취미"] },
        { id: 7, title: "토익 자격증 스터디 들어가고싶어유!!", author: "야잉", time: "3시간 전", views: 511, likes: 121, tags: ["자격증", "언어공부"] },
        { id: 8, title: "풀스택 사이드 플젝 같이하실분", author: "나당", time: "3시간 전", views: 6, likes: 3, tags: ["프로그래밍", "취미"] },
    ];

    // 🔥 검색 & 태그 필터링 적용
    const filteredPosts = posts.filter(post => 
        post.title.includes(searchTerm) && 
        (selectedTag === "" || post.tags.includes(selectedTag))
    );

    return (
        <div className="study-board-container">
            <CommunityNav />
            <h2 className="board-title">📌 스터디 구인/구직 게시판</h2>

            {/* 🔥 검색창 */}
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="검색어를 입력하세요..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">🔍</button>
            </div>

            {/* 🔥 태그 리스트 */}
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
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <div className="post-card" key={post.id}>
                            <div className="post-info">
                                <span className="author">{post.author}</span> · 
                                <span className="time">{post.time}</span> · 
                                <span className="views">조회 {post.views}</span>
                            </div>
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

            <button className="write-btn">✍️ 글쓰기</button>

            {/* 페이지네이션 */}
            <div className="pagination">
                <button>&lt;</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>&gt;</button>
            </div>

        </div>
    );
};

export default StudyBoard;