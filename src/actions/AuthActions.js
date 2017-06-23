import firebase from 'firebase';
import base64 from 'base-64';
import { Actions } from 'react-native-router-flux';
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
} from './type';    

export const changeName = name => {
    return {
        type: CHANGE_NAME,
        payload: name
    }
}

export const changeEmail = email => {
    return {
        type: CHANGE_EMAIL,
        payload: email
    }
}

export const changePassword = password => {
    return {
        type: CHANGE_PASSWORD,
        payload: password
    }
}

export const clearStates = () => {
    return {
        type: CLEAR_STATES
    }
}

export const authSignUp = ({name, email, password}) => {
    return dispacth => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                let emailEncript = base64.encode(email);
                firebase.database().ref(`/contacts/${emailEncript}`)
                    .push({ name })
                    .then(response => successAuthSignUp(dispacth))
            })
            .catch(error => errorAuthSignUp(error, dispacth))
    }
}

export const authSignIn = ({email,password}) => {
    return dispatch => {

        dispatch({ type: LOADING_SIGNIN })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => successAuthSignIn(user, dispatch))
            .catch(error => errorAuthSignIn(error, dispatch))
    }
}

const successAuthSignUp = (dispatch) => {
    dispatch(
        { 
            type: SUCCESS_AUTH_SIGNUP 
        }
    )
    Actions.signIn();
}

const successAuthSignIn = (user, dispatch) => {
    dispatch(
        {
            type: SUCCESS_AUTH_SIGNIN,
            payload: user.email
        }
    )
    Actions.home();
}

const errorAuthSignUp = (error, dispatch) => {
    dispatch(
        {
            type: ERROR_AUTH_SIGNUP,
            payload: error.message
        }
    )
}

const errorAuthSignIn = (error, dispatch) => {
    dispatch(
        {
            type: ERROR_AUTH_SIGNIN,
            payload: error.message
        }
    )
}