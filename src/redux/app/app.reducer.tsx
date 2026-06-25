import {
    SET_DARK_MODE,
    SET_IN_VIEW,
    RESET_APP_STATE
} from './app.type';

export interface AppState {
    darkMode: boolean;
    sectionInView: string;
}

const INIT_APP_STATE: AppState = {
    darkMode: false,
    sectionInView: ''
};

const AppReducer = (state: AppState = INIT_APP_STATE, action: { type: string; payload?: string }) => {
    switch (action.type) {
        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            };

        case SET_IN_VIEW:
            return {
                ...state,
                sectionInView: action.payload ?? ''
            };

        case RESET_APP_STATE:
            return INIT_APP_STATE;

        default:
            return state;
    }
};

export default AppReducer;