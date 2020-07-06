import { AppReducer } from './appActions';
import {combineReducers } from 'redux';
export const allReducer = combineReducers({
    appReducer: AppReducer
})
