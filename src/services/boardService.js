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

// 게시글 상세
export const getBoardDetail = async (boardNo) => {
    try {
        console.log("📌 API 요청 boardNo:", boardNo);
        const response = await api.get(`/boards/detail/${boardNo}`);
        return response.data;
    } catch (error) {
        console.error("게시글 상세 조회 실패:", error);
        throw error;
    }
};

// 게시글 삭제 API 호출
export const deleteBoard = async (boardNo) => {
    try {
        await api.delete(`/boards/delete/${boardNo}`);
    } catch (error) {
        console.error("게시글 삭제 실패:", error);
        throw error;
    }
};