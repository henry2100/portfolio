import React from 'react';
import { combineReducers } from 'redux';
import AuthReducer from './auth/auth.reducer';
import AppReducer from './app/app.reducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    app: AppReducer
});

export default rootReducer;