import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { getBoardDetail } from "../../../services/boardService";
import { formatTimeAgo } from '../../../utils/timeFormatter';
import { deleteBoard } from "../../../services/boardService";
import { likeBoard } from "../../../services/boardService";
import { createComment, getComments } from "../../../services/commentService";
import "../../../styles/community/boardDetail.css";
import CommunityNav from "../../../components/CommusityNav";

const FreeBoardDetail = () => {
    const { id } = useParams();
    const boardNo = Number(id);
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const loggedInEmail = sessionStorage.getItem("email");

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyOpenId, setReplyOpenId] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [isSecret, setIsSecret] = useState(false);
    const [isSecretReply, setIsSecretReply] = useState(false);

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

        const fetchComments = async () => {
            try {
                const data = await getComments(boardNo);
                setComments(data);
            } catch (e) {
                console.error("댓글 로딩 실패", e);
            }
        };

        fetchPost();
        fetchComments();
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

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteBoard(boardNo);
                alert("게시글이 삭제되었습니다.");
                navigate("/community/free");
            } catch (error) {
                alert("게시글 삭제 실패: " + (error.response?.data || error.message));
            }
        }
    };

    const handleEdit = () => {
        navigate(`/community/free/edit/${id}`);
    };

    const handleCommentSubmit = async () => {
        try {
            await createComment({
                boardNo,
                comment: commentText,
                isSecret,
                parentId: null,
            });
            setCommentText("");
            setIsSecret(false);
            const updated = await getComments(boardNo);
            setComments(updated);
        } catch (err) {
            alert("댓글 등록 실패");
        }
    };

    const handleReplySubmit = async (parentId) => {
        try {
            const dto = { boardNo, comment: replyText, isSecret: isSecretReply, parentId };
            await createComment(dto);
            setReplyText("");
            setReplyOpenId(null);
            setIsSecretReply(false);
            const updated = await getComments(boardNo);
            setComments(updated);
        } catch (e) {
            console.error("대댓글 등록 실패", e);
        }
    };

    const toggleReply = (commentId) => {
        setReplyOpenId(prev => (prev === commentId ? null : commentId));
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

    return (
        <div className="detail-container">
            <CommunityNav />
            <h2 className="board-title">📌 자유게시판</h2>

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

            {showComments && (
                <div className="comment-section">
                    <h4 className="comment-title">💬 댓글 {comments.length}</h4>

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
                                /> 비밀댓글
                            </label>
                            <button className="comment-submit" onClick={handleCommentSubmit}>댓글 등록</button>
                        </div>
                    </div>

                    <div className="comment-list">
                        {comments
                            .filter(c => c.parentId === null)
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((comment) => (
                                <div className="comment-item" key={comment.commentNo}>
                                    <div className="comment-header">
                                        <strong>{comment.nickname}</strong> · <span className="comment-time">{formatTimeAgo(comment.createdAt)}</span>
                                    </div>
                                    <div className="comment-content">
                                        {comment.isSecret && comment.email !== loggedInEmail && post.email !== loggedInEmail
                                            ? "🔒비밀댓글입니다."
                                            : comment.comment}
                                    </div>
                                    <button className="reply-toggle" onClick={() => toggleReply(comment.commentNo)}>답글 달기</button>

                                    {replyOpenId === comment.commentNo && (
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
                                                    /> 비밀댓글
                                                </label>
                                                <button className="reply-submit" onClick={() => handleReplySubmit(comment.commentNo)}>답글 등록</button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="reply-list">
                                        {comment.replies && comment.replies
                                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                            .map((reply) => (
                                                <div className="reply-item" key={reply.commentNo}>
                                                    <div className="reply-header">
                                                        <strong>{reply.nickname}</strong> · <span className="reply-time">{formatTimeAgo(reply.createdAt)}</span>
                                                    </div>
                                                    <div className="reply-content">
                                                        {reply.isSecret &&
                                                            reply.email !== loggedInEmail &&
                                                            comment.email !== loggedInEmail &&
                                                            post.email !== loggedInEmail
                                                            ? "🔒비밀댓글입니다."
                                                            : reply.comment}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}

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

export default FreeBoardDetail;
