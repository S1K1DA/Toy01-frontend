import React, { useState, useEffect, useContext } from "react";
import '../../styles/auth/mypage.css';
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/authService";

const MyPage = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("profile");
    const [userData, setUserData] = useState({
        nickname: "",
        email: "",
        name: "",
        profileImagePath: "",
        currentPassword: "",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [paymentList, setPaymentList] = useState([]); // 💡 추가해줘!


    useEffect(() => {
        // 임시 결제 데이터
        const dummyPayments = [
            {
                date: "2025-03-25",
                amount: "5,000원",
                validUntil: "2025-04-25",
                product: "프리미엄 1개월"
            },
            {
                date: "2025-01-10",
                amount: "50,000원",
                validUntil: "무제한",
                product: "프리미엄 평생권"
            }
        ];
        setPaymentList(dummyPayments);
    }, []);
    


    // 마이페이지 데이터 불러오기
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

    // 프로필 이미지 변경 핸들러
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

    // 비밀번호 변경
    const handleChangePassword = async () => {
        if (!userData.currentPassword || !newPassword) {
            alert("현재 비밀번호와 새 비밀번호를 입력하세요.");
            return;
        }
    
        try {
            await api.post("/update-password", {
                currentPassword: userData.currentPassword,  // ✅ 현재 비밀번호 추가
                newPassword: newPassword,
            });
    
            alert("비밀번호가 변경되었습니다.");
            setNewPassword("");
            setConfirmPassword("");
            setUserData((prev) => ({
                ...prev,
                currentPassword: "", // 입력값 초기화
            }));
        } catch (error) {
            console.error("변경 실패:", error);
            alert(error.response?.data || "비밀번호 변경 중 오류가 발생했습니다.");
        }
    };
    

    // 계정 삭제
    const handleDeleteAccount = () => {
        if (window.confirm("정말 계정을 삭제하시겠습니까?")) {
            alert("계정이 삭제되었습니다.");
            // 실제 API 연동 필요
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
                            <div className="profile-image-wrapper">
                                <img
                                    src={previewImage || "/default-profile.jpg"}
                                    className="profile-image"
                                    alt=""
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

                {activeTab === "password" && (
                    <div className="password-container">
                        <h2>비밀번호 변경</h2>
                        <input
                            type="password"
                            placeholder="현재 비밀번호"
                            value={userData.currentPassword}
                            onChange={(e) => setUserData({ ...userData, currentPassword: e.target.value })}
                        />
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


                {activeTab === "payments" && (
                    <div className="payments-container">
                        <h2>결제 내역</h2>

                        {paymentList && paymentList.length > 0 ? (
                            <table className="payment-table">
                                <thead>
                                    <tr>
                                        <th>결제일</th>
                                        <th>결제금액</th>
                                        <th>유효기간</th>
                                        <th>상품명</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentList.map((payment, index) => (
                                    <tr key={index}>
                                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                                        <td>{payment.amount}</td>
                                        <td>
                                            {payment.validUntil === "무제한"
                                                ? "무제한"
                                                : new Date(payment.validUntil).toLocaleDateString()}
                                        </td>
                                        <td>{payment.product}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>아직 결제 내역이 없습니다.</p>
                        )}
                    </div>
                )}


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
