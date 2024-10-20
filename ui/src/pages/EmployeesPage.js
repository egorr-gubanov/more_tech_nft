// EmployeesPage.js
import React from 'react';
import './EmployeesPage.css';
import { useUser } from './UserContext'; // Import useUser

const EmployeesPage = () => {
    const { user } = useUser(); // Get user data from context

    return (
        <div className="employees-page">
            <h2>Сотрудники</h2>
            <div className="employee-search">
                <input type="text" placeholder="Поиск по ФИО" />
            </div>
            <div className="employee-list">
                <div className="employee-card">
                    <div className="employee-info">
                        <h3>{user ? `${user.lastName} ${user.firstName} ${user.middleName}` : 'Имя Не Указано'}</h3>
                        <p>Senior System Architect</p>
                    </div>
                    <button>Оставить отзыв</button>
                </div>
                {/* Other employees... */}
            </div>
        </div>
    );
};

export default EmployeesPage;
