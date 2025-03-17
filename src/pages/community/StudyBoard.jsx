import React from 'react';
import '../../styles/community/board.css';
import CommunityNav from '../../components/CommusityNav';

const StudyBoard = () => {
    // 더미 데이터 (백엔드 연동 전에 테스트용)
    const posts = [
        {
            id: 1,
            title: "IT기획, PM, PO 취준생을 위한 스터디 모집",
            author: "효소",
            time: "1시간 전",
            views: 62,
            likes: 10,
            tags: ["인프콘", "기획", "스터디"]
        },
        {
            id: 2,
            title: "맞춤 학습형 알고리즘 스터디 모집",
            author: "mandoo",
            time: "1시간 전",
            views: 47,
            likes: 8,
            tags: ["인프콘", "스터디"]
        },
        {
            id: 3,
            title: "신입 백엔드 취준 메이트 모집",
            author: "linavell",
            time: "3시간 전",
            views: 51,
            likes: 12,
            tags: ["인프콘", "스터디", "백엔드"]
        },
        {
            id: 3,
            title: "신입 백엔드 취준 메이트 모집",
            author: "linavell",
            time: "3시간 전",
            views: 51,
            likes: 12,
            tags: ["인프콘", "스터디", "백엔드"]
        },
        {
            id: 3,
            title: "신입 백엔드 취준 메이트 모집",
            author: "linavell",
            time: "3시간 전",
            views: 51,
            likes: 12,
            tags: ["인프콘", "스터디", "백엔드"]
        },
        {
            id: 3,
            title: "신입 백엔드 취준 메이트 모집",
            author: "linavell",
            time: "3시간 전",
            views: 51,
            likes: 12,
            tags: ["인프콘", "스터디", "백엔드"]
        },
        {
            id: 3,
            title: "신입 백엔드 취준 메이트 모집",
            author: "linavell",
            time: "3시간 전",
            views: 51,
            likes: 12,
            tags: ["인프콘", "스터디", "백엔드"]
        }
    ];

    return (
        <div className="study-board-container">
            
            <CommunityNav />
            
            {/* 태그 필터 */}
            <div className="tag-filter">
                <input type="text" placeholder="태그를 선택하세요..." />
                <button className="search-btn">🔍</button>
                <div className="tag-list">
                    <button className="tag">프로그래밍</button>
                    <button className="tag">취업준비</button>
                    <button className="tag">언어공부</button>
                    <button className="tag">자격증</button>
                    <button className="tag">프로젝트</button>
                    <button className="tag">스킬업</button>
                    <button className="tag">취미</button>
                </div>
            </div>

            {/* 게시글 리스트 */}
            <div className="post-list">
                {posts.map(post => (
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
                ))}
            </div>

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