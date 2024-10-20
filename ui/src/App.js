// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeesPage from "./pages/EmployeesPage";
import AchievementsPage from "./pages/AchievementsPage";
import { UserProvider } from './pages/UserContext'; // Import UserProvider
import './App.css';
import SettingsPage from "./pages/SettingsPage";

const AppContent = ({ isAuthenticated }) => {
    const location = useLocation();
    const hideSidebarRoutes = ['/login', '/register'];

    // Show content only for authenticated users
    return (
        <div className="app-container">
            {!hideSidebarRoutes.includes(location.pathname) && isAuthenticated && <Sidebar />}
            {isAuthenticated && (
                <div className="content">
                    <Routes>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/employees" element={<EmployeesPage />} />
                        <Route path="/achievements" element={<AchievementsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        {/* Other routes */}
                    </Routes>
                </div>
            )}
        </div>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        const isUserLoggedIn = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(!!isUserLoggedIn);
    }, []);

    return (
        <UserProvider> {/* Wrap the entire app with UserProvider */}
            <Router>
                <Routes>
                    {/* If not authenticated, redirect to the login page */}
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />

                    {/* If authenticated, render the main content with navigation */}
                    <Route path="*" element={isAuthenticated ? <AppContent isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
