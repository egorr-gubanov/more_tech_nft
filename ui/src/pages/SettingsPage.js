import React, { useState } from 'react';
import './SettingsPage.css';
import { useUser } from './UserContext'; // Импортируем контекст пользователя
import { EthrDID } from 'ethr-did'; // Импортируем библиотеку для работы с DID
import { Issuer } from 'did-jwt-vc'; // Импортируем библиотеку для создания VC
import Web3 from 'web3'; // Импортируем Web3

const SettingsPage = () => {
    const { user, updateUser } = useUser(); // Получаем данные пользователя и функцию обновления
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [middleName, setMiddleName] = useState(user.middleName || '');
    const [status, setStatus] = useState(user.status || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [did, setDid] = useState(null); // Состояние для хранения DID

    // Замените эти значения на ваши реальные данные
    const infuraProjectId = 'YOUR_INFURA_PROJECT_ID'; // Получите его на сайте Infura
    const privateKey = 'YOUR_PRIVATE_KEY'; // Ваш приватный ключ

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        updateUser({ email, phone, firstName, lastName, middleName, status }); // Обновляем данные пользователя
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // Логика смены пароля
        console.log('Смена пароля:', password, newPassword);
    };

    const connectMetaMask = async () => {
        // Логика подключения MetaMask
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('MetaMask подключен');
            } catch (error) {
                console.error('Ошибка подключения MetaMask:', error);
            }
        } else {
            alert('Пожалуйста, установите MetaMask!');
        }
    };

    const connectDID = async () => {
        const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${infuraProjectId}`);
        const web3 = new Web3(provider);
        const newDid = new EthrDID({ privateKey, provider });
        setDid(newDid.did); // Сохраняем DID в состоянии

        console.log('Ваш DID:', newDid.did);
    };

    const issueVC = async () => {
        if (!did) {
            console.error('DID не подключен');
            return;
        }

        const vcPayload = {
            sub: did,
            nbf: Math.floor(Date.now() / 1000),
            vc: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential'],
                credentialSubject: {
                    id: did,
                    achievement: {
                        type: 'Certificate',
                        name: 'Certified Blockchain Developer',
                        date: '2024-10-15'
                    }
                }
            }
        };

        try {
            // const vcJwt = await Issuer.createVerifiableCredentialJwt(vcPayload, new EthrDID({ privateKey, provider }));
            // console.log('VC JWT:', vcJwt);
        } catch (error) {
            console.error('Ошибка при создании VC:', error);
        }
    };

    return (
        <div className="settings-page">
            <h2>Настройки профиля</h2>
            <div className="settings-block">
                <h3>Личные данные</h3>
                <form onSubmit={handleProfileSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Электронная почта:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон:</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Имя:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Фамилия:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="middleName">Отчество:</label>
                        <input
                            type="text"
                            id="middleName"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Статус:</label>
                        <input
                            type="text"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>
                    <button type="submit">Сохранить изменения</button>
                </form>
            </div>

            <div className="settings-block">
                <h3>Смена пароля</h3>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Текущий пароль:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Новый пароль:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Сменить пароль</button>
                </form>
            </div>

            <div className="settings-block">
                <h3>Интеграция с MetaMask и DID</h3>
                <button onClick={connectMetaMask}>
                    Подключить MetaMask
                </button>
                <button onClick={connectDID}>
                    Подключить DID
                </button>
                <button onClick={issueVC} disabled={!did}>
                    Создать VC
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;