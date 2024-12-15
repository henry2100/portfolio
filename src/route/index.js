import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Auth from '../pages/auth';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Dashboard from '../pages/dashboard';
import Home from '../pages/dashboard/Home';
import Settings from '../pages/dashboard/Settings';
import NotFound from '../components/atoms/NotFound';
import { connect } from 'react-redux';
import {setLoginStatus} from '../redux/auth/auth.action';

const AppRouter = (props) => {
    // const userAvailable = props.user_auth_res?.length > 0;
    const userAvailable = true;
    // const userAvailable = false;

    console.log("userAvailable:",  props.user_auth_res);

    useEffect(() => {
        if (userAvailable) {
            props.setLoginStatus(true);
        } else {
            props.setLoginStatus(false);
        }
    }, [userAvailable]);
    
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to={userAvailable ? '/dashboard' : '/auth'} />} />

                <Route path='/auth' element={userAvailable ? <Navigate to='/dashboard' /> : <Navigate to='/auth/login' />} />
                <Route path='/auth' element={userAvailable ? <Navigate to='/dashboard' /> :  <Auth/>}>
                    <Route path='/auth/login' element={userAvailable ? <Navigate to='/dashboard' /> : <Login />} />
                    <Route path='/auth/register' element={userAvailable ? <Navigate to='/dashboard' /> : <Register />} />
                </Route>

                <Route path='/dashboard' element={userAvailable ? <Navigate to='/dashboard/home' /> : <Navigate to='/auth' />} />
                <Route path='/dashboard' element={userAvailable ? <Dashboard /> : <Navigate to='/auth' />}>
                    <Route path='/dashboard/home' element={userAvailable ? <Home /> : <Navigate to='/auth' />} />
                    <Route path='/dashboard/settings' element={userAvailable ? <Settings /> : <Navigate to='/auth' />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

const mapStateToProps = (state) => ({
    user_auth_res: state.auth.user_auth_res
})

const mapDispatchToProps = (dispatch) => ({
    setLoginStatus: (data) => dispatch(setLoginStatus(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);