import React from 'react';
import './AchievementsPage.css';

const AchievementsPage = () => {
    return (
        <div className="achievements-page">
            <h2>Мои достижения</h2>
            <div className="achievements-list">
                {/* Пример элемента достижения */}
                <div className="achievement-card">
                    <img src="../assets/degree.png" alt="Achievement" />
                    <p>Диплом #1337</p>
                </div>
                {/* Другие достижения */}
            </div>
        </div>
    );
};

export default AchievementsPage;
