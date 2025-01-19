import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { resetAppState } from '../../redux_/app/app.action';
import { setLoginStatus, resetAuthState } from '../../redux/auth/auth.action';
import { postRequest, BASE_URL } from 'services/http';
import Alert from 'components/atoms/Alert';
import { useLocation, useNavigate } from 'react-router-dom';

const useNavData = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const userStatus = useSelector((state: any) => state.auth.login_state);

    const currentPage = location.pathname.split('/').slice(-1).toString();
    const onHome = currentPage === 'home'
;
    const headers = {
        "Content-Type": "application/json"
    };
    
    const logoutFunc = async () => {
        const res = await postRequest(`${BASE_URL}/users/user/logout`, headers);
        console.log("logoutFunc: ", res);
    }

    const handleLogout = () => {
        dispatch(setLoginStatus(false));
        // dispatch(resetAppState());
        dispatch(resetAuthState());
        logoutFunc();
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/dashboard";
    };

    const resumeStyle = 'py-1 px-3 border flex justify-center items-center border-Primary !text-Primary hover:bg-Primary hover:text-white rounded-full transition ease-in-out duration-250 cursor-pointer'

    const navItems = [
        { newPage: false, navItem: 'Home', navType: 'dash', action: null, style: '!hidden', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'About Me', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Projects', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Skills', navType: 'dash', action: null, style: `!flex`, icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Service', navType: 'dash', action: null, style: `!flex`, icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Contact', navType: 'dash', action: null, style: `!flex`, icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'My Resume', navType: 'dash', action: null, style: `!flex ${resumeStyle}`, icon1: '', icon2: '', available: true },
    ];

    const onBoardingData = [
        { newPage: true, navItem: 'Register', navType: 'auth', action: () => navigate('/auth/register'), style: `hidden ${!userStatus && '!flex' }`, icon1: '', icon2: '', available: true },
        { newPage: true, navItem: 'Login', navType: 'auth', action: () => navigate('/auth/login'), style: `hidden ${!userStatus && '!flex' }`, icon1: '', icon2: '', available: true },
        { newPage: true, navItem: 'Hire', navType: 'auth', action: () => Alert('success', "Successful"), style: `hidden ${userStatus && '!flex' }`, icon1: '', icon2: '', available: true },
        { newPage: true, navItem: 'Logout', navType: 'auth', action: handleLogout, style: `hidden ${userStatus && '!flex' }`, icon1: '', icon2: '', available: true },
    ];

    return { navItems, onBoardingData };
};

export default useNavData;