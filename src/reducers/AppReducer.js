import {
    CHANGE_ADD_CONTACT,
    SUCCESS_ADD_CONTACT,
    SUCCESS_FIND_CONTACT,
    DISMISS_SUCCESS_VIEW,
    ERROR_ADD_CONTACT,
    LOADING_ADD_CONTACT
} from '../actions/type';

const INITIAL_STATE = {
    contact_to_add: '',
    successViewAddContact: false,
    errorViewAddContact: false,
    loadingAddContact: false,
    errorTextAddContact: '',
    contactSearchResult: false,
    contactFoundName: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case CHANGE_ADD_CONTACT:
            return { ...state, contact_to_add: action.payload };

        case LOADING_ADD_CONTACT:
            return { ...state, loadingAddContact: true, errorViewAddContact: false, contactSearchResult: false };

        case SUCCESS_FIND_CONTACT:
            return { ...state, contactSearchResult: true, loadingAddContact: false, contactFoundName: action.payload };

        case SUCCESS_ADD_CONTACT:
            return { ...state, contact_to_add: '', loadingAddContact: false,  successViewAddContact: true };

        case ERROR_ADD_CONTACT:
            return { ...state, loadingAddContact: false, errorTextAddContact: action.payload, errorViewAddContact: true };
        
        case DISMISS_SUCCESS_VIEW:
            return { ...state, successViewAddContact: false };

        default: return state;
    }
}