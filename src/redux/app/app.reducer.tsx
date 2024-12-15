import {
    SET_DARK_MODE,
    RESET_APP_STATE
} from './app.type';

const INIT_APP_STATE = {
    darkMode: false
}

const AppReducer = (state = INIT_APP_STATE, action) => {
    switch (action.type) {
        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            }

        case RESET_APP_STATE:
            return INIT_APP_STATE
    
        default:
            return state;
    }
}

export default AppReducer;