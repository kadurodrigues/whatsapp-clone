import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';
import listContactsReducer from './listContactsReducer';
import listChatsReducer from './listChatsReducer';

export default combineReducers({
    AuthReducer,
    AppReducer,
    listContactsReducer,
    listChatsReducer
})