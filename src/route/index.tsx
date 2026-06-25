import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Home from '../pages/dashboard/Home';
import NotFound from '../components/atoms/NotFound';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to='/dashboard/home' replace />} />
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route index element={<Navigate to='/dashboard/home' replace />} />
                    <Route path='home' element={<Home />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
