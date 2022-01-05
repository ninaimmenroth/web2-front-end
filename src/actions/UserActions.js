import config from '../config/config';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_SINGLE_USER_SUCCESS = 'GET_SINGLE_USER_SUCCESS';
export const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS';
export const NO_USER = 'NO_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const GET_USERS_PENDING = 'GET_USERS_PENDING';
export const GET_SINGLE_USER_PENDING = 'GET_SINGLE_USER_PENDING';
export const NEW_USER_PENDING = 'NEW_USER_PENDING';
export const DELETE_USER_PENDING = 'DELETE_USER_PENDING';

export const SHOW_USER_DIALOG = 'SHOW_USER_DIALOG';
export const HIDE_USER_DIALOG = 'HIDE_USER_DIALOG';
export const SHOW_USER_EDIT_DIALOG = 'SHOW_USER_EDIT_DIALOG';
export const HIDE_USER_EDIT_DIALOG = 'HIDE_USER_EDIT_DIALOG';

export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_PENDING = 'EDIT_USER_PENDING';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

export const GET_USERS_FAILED = 'GET_USERS_FAILED';
export const GET_SINGLE_USER_FAILED = 'GET_SINGLE_USER_FAILED';
export const NEW_USER_FAILED = 'NEW_USER_FAILED';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';

export function getUpdateUserSuccessAction(){
    return {
        type: EDIT_USER_SUCCESS
    }
}

export function getUpdateUserPendingAction(){
    return {
        type: EDIT_USER_PENDING
    }
}

export function getUpdateUserFailedAction(){
    return {
        type: EDIT_USER_FAILED
    }
}

export function getGetUsersSuccessAction(userList){
    return {
        type: GET_USERS_SUCCESS,
        users: userList
    }
}

export function getGetSingleUserSuccessAction(userList){
    return {
        type: GET_SINGLE_USER_SUCCESS,
        user: userList
    }
}

export function getNoUserAction(){
    return {
        type: NO_USER
    }
}

export function getShowUserDialogAction(){
    return {
        type: SHOW_USER_DIALOG
    }
}

export function getHideUserDialogAction(){
    return {
        type: HIDE_USER_DIALOG
    }
}

export function getShowUserEditDialogAction(){
    return {
        type: SHOW_USER_EDIT_DIALOG
    }
}

export function getHideUserEditDialogAction(){
    return {
        type: HIDE_USER_EDIT_DIALOG
    }
}

export function getNewUserSuccessAction(newUser){
    return {
        type: NEW_USER_SUCCESS,
        newUser: newUser
    }
}

export function getDeleteUserSuccessAction(users){
    return {
        type: DELETE_USER_SUCCESS,
        users: users
    }
}

export function getGetUsersPendingAction(){
    return {
        type: GET_USERS_PENDING
    }
}

export function getGetSingleUserPendingAction(){
    return {
        type: GET_SINGLE_USER_PENDING
    }
}

export function getNewUserPendingAction(){
    return {
        type: NEW_USER_PENDING
    }
}

export function getDeleteUserPendingAction(){
    return {
        type: DELETE_USER_PENDING
    }
}

export function getGetUsersFailedAction(error){
    return {
        type: GET_USERS_FAILED,
        error: error
    }
}

export function getGetSingleUserFailedAction(error){
    return {
        type: GET_SINGLE_USER_FAILED,
        error: error
    }
}

export function getNewUserFailedAction(error){
    return {
        type: NEW_USER_FAILED,
        error: error
    }
}

export function getDeleteUserFailedAction(error){
    return {
        type: DELETE_USER_FAILED,
        error: error
    }
}

export function getAllUsers(token){
    console.log('get users');

    return dispatch => {
        dispatch(getGetUsersPendingAction());
        getAllUsersRequest(token)
            .then(
                users => {
                    const action = getGetUsersSuccessAction(users);
                    dispatch(action);
                },
                error => {
                    dispatch(getGetUsersFailedAction(error));
                }
            )
            .catch(error => {
                dispatch(getGetUsersFailedAction(error));
            })
    }
}

function getAllUsersRequest(token){
    const requestOptions= {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    };

    return fetch(config.backendURL + config.backendEndpoints.users, requestOptions)
        .then(handleResponse)
        .then(userList => {
            return userList;
        })
}

export function getSingleUser(userID){
    console.log('get one user');

    return dispatch => {
        dispatch(getGetSingleUserPendingAction());
        getSingleUserRequest(userID)
            .then(
                users => {
                    const action = getGetSingleUserSuccessAction(users);
                    dispatch(action);
                },
                error => {
                    dispatch(getGetSingleUserFailedAction(error));
                }
            )
            .catch(error => {
                dispatch(getGetSingleUserFailedAction(error));
            })
    }
}

function getSingleUserRequest(userID){
    const requestOptions= {
        method: 'GET',
    };

    return fetch(config.backendURL + config.backendEndpoints.singleUser + userID, requestOptions)
        .then(handleResponse)
        .then(userList => {
            return userList;
        })
}

export function updateUser(token, userID, userName, password, deleted_flag, isAdministrator) {
    return dispatch => {
        dispatch(getUpdateUserPendingAction());
        updateUserRequest(token, userID, userName, password, deleted_flag, isAdministrator)
        .then(
            userSession => {
                const action = getUpdateUserSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                dispatch(getUpdateUserFailedAction(error));
            }
        )
        .catch(error =>{
            dispatch(getUpdateUserFailedAction(error));
        })
    }
}

function updateUserRequest(token, userID, userName, password, deleted_flag, isAdministrator) {
    const requestOptions= {
        method: 'PUT',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ userName, password, deleted_flag, isAdministrator })
    };
    console.log("DEBUG REQUEST");
    console.log(token);
    console.log(config.backendURL + config.backendEndpoints.singleUser + userID);
    return fetch(config.backendURL + config.backendEndpoints.singleUser + userID, requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        })
}

export function deleteUser(token, userID) {
    return dispatch => {
        dispatch(getDeleteUserPendingAction());
        deleteUserRequest(token, userID)
        .then(
            userSession => {
                const action = getDeleteUserSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                dispatch(getDeleteUserFailedAction(error));
            }
        )
        .catch(error =>{
            dispatch(getDeleteUserFailedAction(error));
        })
    }
}

function deleteUserRequest(token, userID) {
    const requestOptions= {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    };
    return fetch(config.backendURL + config.backendEndpoints.singleUser + userID, requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        })
}

function handleResponse(response){
    console.log("HANDLERESPONSE");
    return response.text().then(text => {
        
        const data = text && JSON.parse(text);
        
        if (!response.ok){
            if(response.status === 401){
                //auto logout
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            console.log(data)
            let userList = data;
            return userList;
        }
    })
}

function logout(){
    //user und token null setzen
    console.error('Should logout user');
}
