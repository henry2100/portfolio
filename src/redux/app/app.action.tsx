import {
    SET_DARK_MODE,
    RESET_APP_STATE
} from './app.type';

export const toggleDarkMode = () => ({
    type: SET_DARK_MODE
})

export const resetAppState = () => ({
    type: RESET_APP_STATE
})