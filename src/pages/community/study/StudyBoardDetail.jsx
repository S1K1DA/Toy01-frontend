import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { getBoardDetail } from "../../../services/boardService";
import { formatTimeAgo } from '../../../utils/timeFormatter';
import { deleteBoard } from "../../../services/boardService";
import { likeBoard } from "../../../services/boardService";
import "../../../styles/community/boardDetail.css";
import CommunityNav from "../../../components/CommusityNav";

const StudyBoardDetail = () => {
    const { id } = useParams(); 
    const boardNo = Number(id);
    const navigate = useNavigate();
    const { isLoggedIn  } = useContext(AuthContext); // 현재 로그인한 유저 정보

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    
    const loggedInEmail = sessionStorage.getItem("email");
    
    // API 호출
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getBoardDetail(boardNo);
                setPost(data);
            } catch (error) {
                setError("게시글을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [boardNo]);

    const handleLike = async () => {
        try {
            const result = await likeBoard(boardNo); 
    
            setPost(prevPost => ({
                ...prevPost,
                likes: result.liked ? prevPost.likes + 1 : prevPost.likes - 1
            }));
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        }
    };
    

    // 삭제 버튼 핸들러
    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteBoard(boardNo);
                alert("게시글이 삭제되었습니다.");
                navigate("/community/study");
            } catch (error) {
                alert("게시글 삭제 실패: " + (error.response?.data || error.message));
            }
        }
    };

    // 수정 버튼 핸들러
    const handleEdit = () => {
        navigate(`/community/study/edit/${id}`);
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

    return (
        <div className="detail-container">
            <CommunityNav />
            <h2 className="board-title">📌 스터디 구인/구직 게시판</h2>

            <div className="post-detail">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-meta">
                    <span>작성자: {post.nickname}</span> · <span>{formatTimeAgo(post.createdAt)}</span> · <span>조회 {post.views}</span>
                </div>
                <div className="likes">
                    <button className="like-btn" onClick={handleLike}>
                        👍 {post.likes} 좋아요
                    </button>
                </div>
                <div className="post-content">{post.content}</div>
            </div>

            <div className="tags">
                {post.tags.map(tag => (
                    <span className="tag-item" key={tag}>{tag}</span>
                ))}
            </div>

            {/* 본인이 작성한 글일 때만 수정 & 삭제 버튼 표시 */}
            {isLoggedIn && loggedInEmail === post.email && (
                <div className="button-group">
                    <button className="board-edit" onClick={handleEdit}>✏️ 수정</button>
                    <button className="board-delete" onClick={handleDelete}>🗑️ 삭제</button>
                </div>
            )}

            <button className="back-btn" onClick={() => navigate(-1)}>← 목록으로</button>
        </div>
    );
};

export default StudyBoardDetail;