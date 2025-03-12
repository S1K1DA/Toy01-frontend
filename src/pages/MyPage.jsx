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
        profileImagePath: "",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 마이페이지 데이터 불러오기 (초기 렌더링)
    useEffect(() => {
        let isMounted = true;
        if (isLoggedIn) {
            api.get("/mypage")
                .then((response) => {
                    if (isMounted) {
                        setUserData(response.data);
                        setPreviewImage(`http://localhost:8080${response.data.profileImagePath}`);
                        sessionStorage.setItem("email", response.data.email);
                    }
                })
                .catch((error) => {
                    console.error("마이페이지 데이터 불러오기 실패:", error);
                });
        }
        return () => { isMounted = false; };
    }, [isLoggedIn]);

    // 프로필 이미지 변경 핸들러 (업로드 시 미리보기 즉시 반영)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedFile(file);
            setPreviewImage(previewUrl);  
        }
    };

    // 입력 필드 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 프로필 업데이트
    const handleProfileUpdate = async () => {
        if (!userData.nickname || !userData.email || !userData.name) {
            alert("모든 필드를 입력해야 합니다.");
            return;
        }

        const formData = new FormData();
        formData.append("nickname", userData.nickname);
        formData.append("email", userData.email);
        formData.append("name", userData.name);

        if (selectedFile) {
            formData.append("profileImage", selectedFile);
        }

        try {
            await api.post("/update-profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("프로필 수정 완료!");

            // 서버에서 최신 데이터 가져오기
            const updatedResponse = await api.get("/mypage");
            setUserData(updatedResponse.data);

            // 수정 후에도 즉시 이미지 반영
            setPreviewImage(`http://localhost:8080${updatedResponse.data.profileImagePath}?timestamp=${new Date().getTime()}`);

        } catch (error) {
            console.error("❌ 프로필 수정 실패:", error);
        }
    };

    return (
        <div className="mypage-container">
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
                {activeTab === "profile" && (
                    <div className="profile-container">
                        <h2>정보 수정</h2>
                        <div className="profile-section">
                            {/* 프로필 이미지 */}
                            <div className="profile-image-wrapper">
                                <img
                                    src={previewImage || "/default-profile.png"}
                                    className="profile-image"
                                    alt="프로필"
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
                                    <input
                                        type="text"
                                        name={field}
                                        value={userData[field]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="upload-btn" onClick={handleProfileUpdate}>수정</button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default MyPage;
