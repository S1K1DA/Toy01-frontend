import React, { useState, useEffect, useContext } from "react";
import "../styles/mypage.css";
import { AuthContext } from "../context/AuthContext";
import api from "../services/authService";

const MyPage = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("profile");
    const [userData, setUserData] = useState({
        nickname: "",
        email: "",
        name: "",
        profileImage: "",
    });

    const [editingField, setEditingField] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 로그인한 경우 데이터 불러오기
    useEffect(() => {
        if (isLoggedIn) {
            api.get("/mypage")
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error("마이페이지 데이터 불러오기 실패:", error);
                });
        }
    }, [isLoggedIn]);

    // 프로필 이미지 변경 핸들러
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUserData((prev) => ({ ...prev, profileImage: URL.createObjectURL(file) }));
    };

    // 정보 수정 저장 핸들러
    const handleProfileSave = () => {
        console.log("프로필 저장:", userData);
        setEditingField(null);
        // API 요청 추가 예정
    };

    // 비밀번호 변경 핸들러
    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        console.log("비밀번호 변경:", newPassword);
        // API 요청 추가 예정
    };

    // 계정 삭제 핸들러
    const handleDeleteAccount = () => {
        if (window.confirm("정말 계정을 삭제하시겠습니까?")) {
            alert("계정이 삭제되었습니다.");
            // API 요청 추가 예정
        }
    };

    return (
        <div className="mypage-container">
            {/* 사이드바 */}
            <aside className="mypage-sidebar">
                <h2>마이페이지</h2>
                <ul>
                    <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
                        정보 수정
                    </li>
                    <li className={activeTab === "password" ? "active" : ""} onClick={() => setActiveTab("password")}>
                        비밀번호 변경
                    </li>
                    <li className={activeTab === "payments" ? "active" : ""} onClick={() => setActiveTab("payments")}>
                        결제 내역
                    </li>
                    <li className={activeTab === "account" ? "active" : ""} onClick={() => setActiveTab("account")}>
                        계정 삭제
                    </li>
                </ul>
            </aside>

            {/* 메인 콘텐츠 */}
            <section className="mypage-content">
                {/* 정보 수정 */}
                {activeTab === "profile" && (
                    <div className="profile-container">
                        <h2>정보 수정</h2>
                        <div className="profile-section">
                            {/* 프로필 이미지 */}
                            <div className="profile-image-wrapper">
                                <img
                                    src={userData.profileImage || "/default-profile.png"}
                                    className="profile-image"
                                />
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="file-input"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="file-upload" className="upload-label">업로드</label>
                            </div>
                        </div>

                        {/* 닉네임, 이메일, 이름 */}
                        <div className="profile-info">
                            {["nickname", "email", "name"].map((field) => (
                                <div key={field} className="info-item">
                                    <label>{field === "nickname" ? "닉네임" : field === "email" ? "이메일" : "이름"}</label>
                                    {editingField === field ? (
                                        <input
                                            type="text"
                                            value={userData[field]}
                                            onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                                            onBlur={handleProfileSave}
                                            autoFocus
                                        />
                                    ) : (
                                        <span onClick={() => setEditingField(field)}>{userData[field]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="upload-btn">수정</button>
                    </div>
                )}

                {/* 비밀번호 변경 */}
                {activeTab === "password" && (
                    <div className="password-container">
                        <h2>비밀번호 변경</h2>
                        <input
                            type="password"
                            placeholder="새 비밀번호"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button className="save-btn" onClick={handleChangePassword}>비밀번호 변경</button>
                    </div>
                )}

                {/* 결제 내역 */}
                {activeTab === "payments" && (
                    <div className="payments-container">
                        <h2>결제 내역</h2>
                        <p>아직 결제 내역이 없습니다.</p>
                    </div>
                )}

                {/* 계정 삭제 */}
                {activeTab === "account" && (
                    <div className="account-container">
                        <h2>계정 삭제</h2>
                        <p>계정을 삭제하면 복구할 수 없습니다.</p>
                        <button className="delete-btn" onClick={handleDeleteAccount}>계정 삭제</button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default MyPage;
