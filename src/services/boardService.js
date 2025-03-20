import api from "./authService";

// 게시글 작성 API 호출
export const createBoard = async (boardData) => {
    try {
        const response = await api.post("/boards/create", boardData);
        return response.data; // 생성된 게시글 번호 반환
    } catch (error) {
        console.error("게시글 생성 실패:", error);
        throw error;
    }
};

// 스터디 게시판 API 호출
export const getStudyBoardList = async (category = "", search = "", tag = "", page = 1) => {
    try {
        const response = await api.get("/boards/list", {
            params: { category, search, tag, page }
        });
        return response.data;
    } catch (error) {
        console.error("게시글 목록 불러오기 실패:", error);
        throw error;
    }
};

// 자유 게시판 api 호출
export const getFreeBoardList = async (category = "", search = "", page = 1) => {
    try {
        const response = await api.get("/boards/list", {
            params: { category, search, page }
        });
        return response.data;
    } catch (error) {
        console.error("게시글 목록 불러오기 실패:", error);
        throw error;
    }
};
