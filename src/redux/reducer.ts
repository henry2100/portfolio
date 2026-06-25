import { combineReducers } from 'redux';
import AppReducer from './app/app.reducer';

const rootReducer = combineReducers({
    app: AppReducer
});

export default rootReducer;
