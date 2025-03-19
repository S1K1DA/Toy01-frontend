import api from "./authService";

// 게시글 생성 API 호출
export const createBoard = async (boardData) => {
    try {
        const response = await api.post("/boards/create", boardData);
        return response.data; // 생성된 게시글 번호 반환
    } catch (error) {
        console.error("게시글 생성 실패:", error);
        throw error;
    }
};
