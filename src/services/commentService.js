import api from "./authService";



// 댓글 등록 API
export const createComment = async (commentData) => {
    try {
        const response = await api.post("/comments", commentData);
        return response.data;
    } catch (error) {
        console.error("❌ 댓글 등록 실패:", error);
        throw error;
    }
};

// 댓글 조회 API
export const getComments = async (boardNo) => {
    try {
        const response = await api.get(`/comments/${boardNo}`);
        return response.data;  // List<CommentResponseDto>
    } catch (error) {
        console.error("❌ 댓글 목록 불러오기 실패:", error);
        throw error;
    }
};