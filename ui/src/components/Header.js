import React from 'react';

const Header = ({ title }) => {
    return (
        <div className="p-4 bg-gray-200">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
};

export default Header;