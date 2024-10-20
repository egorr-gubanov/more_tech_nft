import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        phone: '',
        status: '', // Добавляем статус
    });

    const updateUser = (updatedUser) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updatedUser,
        }));
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};