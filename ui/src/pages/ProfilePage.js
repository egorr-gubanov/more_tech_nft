import React, { useState } from 'react';
import './ProfilePage.css';
import { useUser } from './UserContext'; // Import useUser

const ProfilePage = () => {
    const { user, updateUser } = useUser(); // Get user data and update function from context
    const [profileImage, setProfileImage] = useState(user.profileImage || '../assets/profile%20img.png'); // Состояние для хранения URL изображения

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Обновляем состояние с загруженным изображением
                updateUser({ profileImage: reader.result }); // Обновляем пользователя в контексте
            };
            reader.readAsDataURL(file); // Читаем файл как Data URL
        }
    };

    return (
        <div className="profile-page">
            <div className="main-content">
                <div className="profile-info">
                    <div className="profile-photo" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={profileImage} alt="Добавить фото" />
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }} // Скрываем стандартный input
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className="profile-details">
                        <h3>{user ? `${user.lastName} ${user.firstName} ${user.middleName}` : 'Имя Не Указано'}</h3>
                        <p>id {user ? user.id : 'Не указано'}</p>
                        <p>{user.status || 'Статус не указан'}</p> {/* Выводим статус пользователя */}
                        <div className="profile-meta">
                            <p>Metamask: <span className="meta-mask-icon">🦊</span> 0x8F69...9KE</p>
                            <p>DID: 0x123456789ABCDEF</p>
                        </div>
                    </div>
                </div>
                <div className="profile-stats">
                    <div className="stat-block">ДОСТИЖЕНИЯ<br /><span>12</span></div>
                    <div className="stat-block">NFTs<br /><span>3</span></div>
                    <div className="stat-block">ОТЗЫВЫ<br /><span>666</span></div>
                </div>
                <div className="nfts-section">
                    <h3>Последние NFTs</h3>
                    <div className="nft-cards">
                        <div className="nft-card">Диплом #1337</div>
                        <div className="nft-card">Диплом #1338</div>
                        <div className="nft-card">Диплом #1339</div>
                    </div>
                </div>
                <div className="achievements-section">
                    <h3>Последние достижения</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Название</th>
                            <th>Дата</th>
                            <th>NFT id</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Achievements data here... */}
                        </tbody>
                    </table>
                </div>
                <div className="reviews-section">
                    <h3>Последние отзывы</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Автор</th>
                            <th>Комментарий</th>
                            <th>Дата</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Reviews data here... */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;