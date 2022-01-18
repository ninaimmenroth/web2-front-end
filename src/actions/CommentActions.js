import config from '../config/config';

export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_SINGLE_COMMENT_SUCCESS = 'GET_SINGLE_COMMENT_SUCCESS';
export const NEW_COMMENT_SUCCESS = 'NEW_COMMENT_SUCCESS';
export const NO_COMMENT = 'NO_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const GET_COMMENTS_PENDING = 'GET_COMMENTS_PENDING';
export const GET_SINGLE_COMMENT_PENDING = 'GET_SINGLE_COMMENT_PENDING';
export const NEW_COMMENT_PENDING = 'NEW_COMMENT_PENDING';
export const DELETE_COMMENT_PENDING = 'DELETE_COMMENT_PENDING';

export const SHOW_COMMENT_NEW_DIALOG = 'SHOW_COMMENT_NEW_DIALOG';
export const HIDE_COMMENT_NEW_DIALOG = 'HIDE_COMMENT_NEW_DIALOG';
export const SHOW_COMMENT_EDIT_DIALOG = 'SHOW_COMMENT_EDIT_DIALOG';
export const HIDE_COMMENT_EDIT_DIALOG = 'HIDE_COMMENT_EDIT_DIALOG';

export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_PENDING = 'EDIT_COMMENT_PENDING';
export const EDIT_COMMENT_FAILED = 'EDIT_COMMENT_FAILED';

export const GET_COMMENTS_FAILED = 'GET_COMMENTS_FAILED';
export const GET_SINGLE_COMMENT_FAILED = 'GET_SINGLE_COMMENT_FAILED';
export const NEW_COMMENT_FAILED = 'NEW_COMMENT_FAILED';
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED';

export function getUpdateCommentSuccessAction(){
    return {
        type: EDIT_COMMENT_SUCCESS
    }
}

export function getUpdateCommentPendingAction(){
    return {
        type: EDIT_COMMENT_PENDING
    }
}

export function getUpdateCommentFailedAction(){
    return {
        type: EDIT_COMMENT_FAILED
    }
}

export function getGetCommentsSuccessAction(commentList){
    return {
        type: GET_COMMENTS_SUCCESS,
        comments: commentList
    }
}

export function getGetSingleCommentSuccessAction(commentList){
    return {
        type: GET_SINGLE_COMMENT_SUCCESS,
        comment: commentList
    }
}

export function getNoCommentAction(){
    return {
        type: NO_COMMENT
    }
}

export function getShowCommentEditDialogAction(){
    return {
        type: SHOW_COMMENT_EDIT_DIALOG
    }
}

export function getHideCommentEditDialogAction(){
    return {
        type: HIDE_COMMENT_EDIT_DIALOG
    }
}

export function getShowCommentCreateDialogAction(){
    return {
        type: SHOW_COMMENT_NEW_DIALOG
    }
}

export function getHideCommentCreateDialogAction(){
    return {
        type: HIDE_COMMENT_NEW_DIALOG
    }
}

export function getNewCommentSuccessAction(newComment){
    return {
        type: NEW_COMMENT_SUCCESS,
        comments: newComment
    }
}

export function getDeleteCommentSuccessAction(comments){
    return {
        type: DELETE_COMMENT_SUCCESS,
        comments: comments
    }
}

export function getGetCommentsPendingAction(){
    return {
        type: GET_COMMENTS_PENDING
    }
}

export function getGetSingleCommentPendingAction(){
    return {
        type: GET_SINGLE_COMMENT_PENDING
    }
}

export function getNewCommentPendingAction(){
    return {
        type: NEW_COMMENT_PENDING
    }
}

export function getDeleteCommentPendingAction(){
    return {
        type: DELETE_COMMENT_PENDING
    }
}



export function getGetCommentsFailedAction(error){
    return {
        type: GET_COMMENTS_FAILED,
        error: error
    }
}

export function getGetSingleCommentFailedAction(error){
    return {
        type: GET_SINGLE_COMMENT_FAILED,
        error: error
    }
}

export function getNewCommentFailedAction(error){
    return {
        type: NEW_COMMENT_FAILED,
        error: error
    }
}

export function getDeleteCommentFailedAction(error){
    return {
        type: DELETE_COMMENT_FAILED,
        error: error
    }
}

export function getCommentsRecipe(recipeID){

    return dispatch => {
        dispatch(getGetCommentsPendingAction());
        getCommentsRecipeRequest(recipeID)
            .then(
                comments => {
                    const action = getGetCommentsSuccessAction(comments);
                    dispatch(action);
                },
                error => {
                    dispatch(getGetCommentsFailedAction(error));
                }
            )
            .catch(error => {
                dispatch(getGetCommentsFailedAction(error));
            })
    }
}

function getCommentsRecipeRequest(recipeID){
    const requestOptions= {
        method: 'GET',
    };

    return fetch(config.backendURL + config.backendEndpoints.comments + "recipe/" + recipeID, requestOptions)
        .then(handleResponse)
        .then(commentList => {
            return commentList;
        })
}

export function getSingleComment(commentID){

    return dispatch => {
        dispatch(getGetSingleCommentPendingAction());
        getSingleCommentRequest(commentID)
            .then(
                comments => {
                    const action = getGetSingleCommentSuccessAction(comments);
                    dispatch(action);
                },
                error => {
                    dispatch(getGetSingleCommentFailedAction(error));
                }
            )
            .catch(error => {
                dispatch(getGetSingleCommentFailedAction(error));
            })
    }
}

function getSingleCommentRequest(commentID){
    const requestOptions= {
        method: 'GET',
    };

    return fetch(config.backendURL + config.backendEndpoints.comments + commentID, requestOptions)
        .then(handleResponse)
        .then(commentList => {
            return commentList;
        })
}

function handleResponse(response){

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
            let commentList = data;
            return commentList;
        }
    })
}

function logout(){
    //user und token null setzen
    console.error('Should logout user');
}

export function createComment(token, recipeID, text){
   
    return dispatch => {
        dispatch(getNewCommentPendingAction());
        createCommentRequest(token, recipeID, text)
            .then(
                comments => {
                    const action = getNewCommentSuccessAction(comments);
                    dispatch(action);
                },
                error => {
                    dispatch(getNewCommentFailedAction(error));
                }
            )
            .catch(error => {
                dispatch(getNewCommentFailedAction(error));
            })
    }
}

function createCommentRequest(token, recipeID, text){
    const requestOptions= {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    };

    return fetch(config.backendURL + config.backendEndpoints.comments + recipeID, requestOptions)
        .then(handleResponse)
        .then(commentList => {
            return commentList;
        })
}

export function deleteComment(token, commentID) {
    return dispatch => {
        dispatch(getDeleteCommentPendingAction());
        deleteCommentRequest(token, commentID)
        .then(
            userSession => {
                const action = getDeleteCommentSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                dispatch(getDeleteCommentFailedAction(error));
            }
        )
        .catch(error =>{
            dispatch(getDeleteCommentFailedAction(error));
        })
    }
}

function deleteCommentRequest(token, commentID) {
    const requestOptions= {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    };
    
    return fetch(config.backendURL + config.backendEndpoints.comments + commentID, requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        })
}

export function updateComment(token, commentID, text) {
    return dispatch => {
        dispatch(getUpdateCommentPendingAction());
        updateCommentRequest(token, commentID, text)
        .then(
            commentSession => {
                const action = getUpdateCommentSuccessAction(commentSession);
                dispatch(action);
            },
            error => {
                dispatch(getUpdateCommentFailedAction(error));
            }
        )
        .catch(error =>{
            dispatch(getUpdateCommentFailedAction(error));
        })
    }
}

function updateCommentRequest(token, commentID, text) {
    const requestOptions= {
        method: 'PUT',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ text})
    };
    
    return fetch(config.backendURL + config.backendEndpoints.comments + commentID, requestOptions)
        .then(handleResponse)
        .then(commentSession => {
            return commentSession;
        })
}