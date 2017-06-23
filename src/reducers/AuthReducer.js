import {
    CHANGE_NAME,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CLEAR_STATES,
    SUCCESS_AUTH_SIGNUP,
    SUCCESS_AUTH_SIGNIN,
    ERROR_AUTH_SIGNIN,
    ERROR_AUTH_SIGNUP,
    LOADING_SIGNIN 
} from '../actions/type';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    emailUserAuth: '',
    errorSignUp: '',
    errorSignIn: '',
    errorView: false,
    successView: false,
    loadingAuthSignIn: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return{ ...state, name: action.payload };

        case CHANGE_EMAIL:
            return{ ...state, email: action.payload };

        case CHANGE_PASSWORD:
            return{ ...state, password: action.payload };

        case CLEAR_STATES:
            return{ ...state, name: '', email: '', password: '', successView: false};
        
        case LOADING_SIGNIN:
            return{ ...state, loadingAuthSignIn: true };

        case SUCCESS_AUTH_SIGNIN:
            return{ ...state, emailUserAuth: action.payload };

        case SUCCESS_AUTH_SIGNUP:
            return{ ...state, email: action.payload, password: '', successView: true };

        case ERROR_AUTH_SIGNUP:
            return{ ...state, errorSignUp: action.payload, errorView: true };

        case ERROR_AUTH_SIGNIN:
            return{ ...state, errorSignIn: action.payload, loadingAuthSignIn: false };

        default: return state;
    }
}