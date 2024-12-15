import React from 'react';

import {
    LOGIN_STATUS,
    AUTH_USER_RES,
    RESET_AUTH_STATE
} from './auth.type';

const INIT_AUTH_STATE = {
    login_state: false,
    user_auth_res: []
}

const AuthReducer = (state = INIT_AUTH_STATE, action) => {
    switch (action.type) {
        case LOGIN_STATUS:
            return {
                ...state,
                login_state: action.payload
            }

        case AUTH_USER_RES:
            return {
                ...state,
                user_auth_res: action.payload
            }
        
        case RESET_AUTH_STATE:
            return INIT_AUTH_STATE
    
        default:
            return state
    }
}

export default AuthReducer