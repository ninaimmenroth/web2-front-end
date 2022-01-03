import config from '../config/config';
import {Buffer} from 'buffer';
export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export function getShowLoginDialogAction(){
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction(){
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticateUserPendingAction(){
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticateUserSuccessAction(userSession){
    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getAuthenticateUserErrorAction(error){
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function authenticateUser(userID, password){
    console.log('Authenticate');

    return dispatch => {
        dispatch(getAuthenticateUserPendingAction());
        loginBasic(userID, password)
            .then(
                userSession => {
                    const action = getAuthenticateUserSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getAuthenticateUserErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAuthenticateUserErrorAction(error));
            })
    }
}

function login(userID, password){
    const requestOptions= {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({userID, password})
    };

    return fetch(config.backendURL + '/auth/login', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        })
}

function loginBasic(userID, password){
    const requestOptions= {
        method: 'POST',
        headers: {'Authorization': 'Basic ' + Buffer.from(userID + ":" + password).toString('base64')}
    };

    return fetch(config.backendURL + '/auth/loginBasic', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        })
}

function handleResponse(response){

    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {
        console.log('receive results: '+ authorizationHeader);

        const data = text && JSON.parse(text);
        var token;
        if(authorizationHeader){
            token = authorizationHeader.split(" ")[1];
        } 
        if (!response.ok){
            if(response.status === 401){
                //auto logout
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                user: data,
                accessToken: token
            }
            return userSession;
        }
    })
}

function logout(){
    //user und token null setzen
    console.error('Should logout user');

//    return dispatch => {
//        dispatch();
//    }
}