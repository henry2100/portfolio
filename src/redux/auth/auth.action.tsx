import {
    LOGIN_STATUS,
    AUTH_USER_RES,
    RESET_AUTH_STATE
} from './auth.type';

export const setLoginStatus = (data: boolean) => ({
    type: LOGIN_STATUS,
    payload: data
})

export const storeUserAuthRes = (data: any[]) => ({
    type: AUTH_USER_RES,
    payload: data
})

export const resetAuthState = () => ({
    type: RESET_AUTH_STATE
})