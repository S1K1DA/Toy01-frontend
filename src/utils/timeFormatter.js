export const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000); // 초 단위 차이 계산

    if (diff < 60) {
        return `${diff}초 전`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)}분 전`;
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)}시간 전`;
    } else if (diff < 7 * 86400) {
        return `${Math.floor(diff / 86400)}일 전`;
    } else {
        return past.toLocaleDateString(); // 오래된 글은 날짜 그대로 표시
    }
};
