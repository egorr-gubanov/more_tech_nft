import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaTrophy, FaUsers, FaCog, FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="lg:hidden text-2xl text-white p-4 focus:outline-none" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <Link to="/profile" className="sidebar-link">
                    <FaUser className="mr-2" /> Профиль
                </Link>
                <Link to="/achievements" className="sidebar-link">
                    <FaTrophy className="mr-2" /> Мои достижения
                </Link>
                <Link to="/employees" className="sidebar-link">
                    <FaUsers className="mr-2" /> Сотрудники
                </Link>
                <Link to="/settings" className="sidebar-link">
                    <FaCog className="mr-2" /> Настройки
                </Link>
            </div>
        </>
    );
};

export default Sidebar;