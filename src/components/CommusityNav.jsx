import React from "react";
import { Link } from "react-router-dom";
import "../styles/community/community.css";

const CommunityNav = () => {
    return (
        <div className="community-nav">
            <Link to="/community/study" className="nav-btn">스터디 구인/구직</Link>
            <Link to="/community/free" className="nav-btn">자유게시판</Link>
        </div>
    );
};

export default CommunityNav;