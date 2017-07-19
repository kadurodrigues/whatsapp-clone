import { LIST_USER_CHAT } from '../actions/type';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {

        case LIST_USER_CHAT:
            return action.payload

        default: return state;
    }
}