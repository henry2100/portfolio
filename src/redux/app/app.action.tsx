import {
    SET_DARK_MODE,
    RESET_APP_STATE,
    SET_IN_VIEW
} from './app.type';

export const toggleDarkMode = () => ({
    type: SET_DARK_MODE
})

export const setSectionInView = (data: string) => ({
    type: SET_IN_VIEW,
    payload: data
})

export const resetAppState = () => ({
    type: RESET_APP_STATE
})