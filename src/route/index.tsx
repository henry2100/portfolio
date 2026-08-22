import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Home from '../pages/dashboard/Home';
import AdminLayout from '../pages/admin';
import AdminLogin from '../pages/admin/Login';
import AdminOverview from '../pages/admin/pages/Overview';
import AdminProjects from '../pages/admin/pages/Projects';
import AdminHeroImage from '../pages/admin/pages/HeroImage';
import AdminAboutImages from '../pages/admin/pages/AboutImages';
import AdminCv from '../pages/admin/pages/Cv';
import NotFound from '../components/atoms/NotFound';
import { SiteDataProvider } from '../context/SiteDataContext';
import { ThemeProvider } from '../context/ThemeContext';

const RouteTitle: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const isAdmin = location.pathname.startsWith('/dashboard');
        document.title = isAdmin
            ? 'Admin | Henry Adedugba'
            : 'Henry Adedugba | Portfolio';
    }, [location.pathname]);

    return null;
};

const AppRouter: React.FC = () => {
    return (
        <Router>
            <RouteTitle />
            <ThemeProvider>
            <SiteDataProvider>
                <Routes>
                    <Route path='/' element={<Navigate to='/main' replace />} />
                    <Route path='/main' element={<Dashboard />}>
                        <Route index element={<Navigate to='/main/home' replace />} />
                        <Route path='home' element={<Home />} />
                    </Route>
                    <Route path='/dashboard/login' element={<AdminLogin />} />
                    <Route path='/dashboard' element={<AdminLayout />}>
                        <Route index element={<Navigate to='/dashboard/overview' replace />} />
                        <Route path='overview' element={<AdminOverview />} />
                        <Route path='projects' element={<AdminProjects />} />
                        <Route path='hero' element={<AdminHeroImage />} />
                        <Route path='about' element={<AdminAboutImages />} />
                        <Route path='cv' element={<AdminCv />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </SiteDataProvider>
            </ThemeProvider>
        </Router>
    );
};

export default AppRouter;
