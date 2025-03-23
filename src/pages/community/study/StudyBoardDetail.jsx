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

    // 댓글 기능
    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyOpenId, setReplyOpenId] = useState(null);
    const [showComments, setShowComments] = useState(false);

    const [isSecret, setIsSecret] = useState(false);
    const [isSecretReply, setIsSecretReply] = useState(false);

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

    
    // 댓글 등록
    const handleCommentSubmit = () => {
    console.log("댓글 등록:", commentText);
    setCommentText("");
    setIsSecret(false);
    };
    // 대댓글 등록
    const handleReplySubmit = (parentId) => {
    console.log("대댓글 등록 (부모:", parentId, "):", replyText);
    setReplyText("");
    setReplyOpenId(null);
    setIsSecretReply(false);
    };
    // 대댓글 입력창 토글
    const toggleReply = (commentId) => {
    setReplyOpenId(prev => (prev === commentId ? null : commentId));
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
            
                <div className="button-group" style={{ justifyContent: 'center', marginTop: '10px' }}>
                    <button className="toggle-comment-btn" onClick={() => setShowComments(!showComments)}>
                        {showComments ? "댓글 접기 🔼" : "댓글 보기 🔽"}
                    </button>
                </div>
            </div>

            <div className="tags">
                {post.tags.map(tag => (
                    <span className="tag-item" key={tag}>{tag}</span>
                ))}
            </div>

            
            {showComments && (
                <div className="comment-section">
                    <h4 className="comment-title">💬 댓글 0</h4>

                    <div className="comment-form">
                        <textarea
                            className="comment-input"
                            placeholder="댓글을 입력하세요."
                            rows={3}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isSecret}
                                onChange={() => setIsSecret(!isSecret)}
                            />
                            비밀댓글
                        </label>
                            <button className="comment-submit" onClick={handleCommentSubmit}>
                            댓글 등록
                        </button>
                    </div>
                </div>
                    <div className="comment-list">
                        {/* 댓글 반복 예시 */}
                        <div className="comment-item">
                            <div className="comment-header">
                                <strong>예시닉네임</strong> · <span className="comment-time">1시간 전</span>
                            </div>
                            <div className="comment-content">예시 댓글입니다.</div>

                            <button className="reply-toggle" onClick={() => toggleReply(1)}>답글 달기</button>

                            {replyOpenId === 1 && (
                                <div className="reply-form">
                                    <textarea
                                        className="reply-input"
                                        placeholder="답글을 입력하세요."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    />
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={isSecretReply}
                                            onChange={() => setIsSecretReply(!isSecretReply)}
                                        />
                                        비밀댓글
                                    </label>
                                    <button className="comment-submit" onClick={handleCommentSubmit}>
                                        댓글 등록
                                    </button>
                                    </div>
                                    <button className="reply-submit" onClick={() => handleReplySubmit(1)}>답글 등록</button>
                                </div>
                            )}

                            <div className="reply-list">
                                <div className="reply-item">
                                    <div className="reply-header">
                                        <strong>대댓글유저</strong> · <span className="reply-time">방금 전</span>
                                    </div>
                                    <div className="reply-content">이것은 대댓글입니다.</div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            )}
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