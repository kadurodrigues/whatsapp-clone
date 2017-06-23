import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';
import listContactsReducer from './listContactsReducer';

export default combineReducers({
    AuthReducer,
    AppReducer,
    listContactsReducer
})