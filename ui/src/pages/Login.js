import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Логика проверки учетных данных
        if (formData.email === "test@test.com" && formData.password === "password123") {
            setIsAuthenticated(true); // Устанавливаем аутентификацию
            localStorage.setItem('isAuthenticated', true); // Сохраняем состояние в localStorage
            navigate('/'); // Переход на главную страницу после успешного входа
        } else {
            alert('Неверные данные для входа');
        }
    };

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setIsAuthenticated(true); // Устанавливаем аутентификацию
                localStorage.setItem('isAuthenticated', true); // Сохраняем состояние в localStorage
                navigate('/'); // Переход на главную страницу после MetaMask авторизации
            } catch (error) {
                console.error("Ошибка при подключении MetaMask:", error);
            }
        } else {
            alert('MetaMask не установлен. Пожалуйста, установите его для работы.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Вход</h1>
            <form className="w-full max-w-md" onSubmit={handleLogin}>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Электронная почта"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
            </form>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
                Войти
            </button>
            <button
                onClick={connectMetaMask}
                className="bg-gray-500 text-white py-2 px-4 rounded mb-4"
            >
                Войти через MetaMask
            </button>
            <button
                onClick={() => navigate('/register')}
                className="bg-green-500 text-white py-2 px-4 rounded"
            >
                Зарегистрироваться
            </button>
        </div>
    );
};

export default Login;
