import {
    SET_DARK_MODE,
    SET_IN_VIEW,
    RESET_APP_STATE
} from './app.type';

const INIT_APP_STATE = {
    darkMode: false,
    sectionInView: ''
}

const AppReducer = (state = INIT_APP_STATE, action) => {
    switch (action.type) {
        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            }

        case SET_IN_VIEW:
            return {
                ...state,
                sectionInView: action.payload
            }

        case RESET_APP_STATE:
            return INIT_APP_STATE

        default:
            return state;
    }
}

export default AppReducer;