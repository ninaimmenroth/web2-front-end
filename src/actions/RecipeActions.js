import config from '../config/config';

export const GET_RECIPES_SUCCESS = 'GET_RECIPES_SUCCESS';
export const GET_SINGLE_RECIPE_SUCCESS = 'GET_SINGLE_RECIPE_SUCCESS';
export const NEW_RECIPE_SUCCESS = 'NEW_RECIPE_SUCCESS';
export const NO_RECIPE = 'NO_RECIPE';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const GET_RECIPES_PENDING = 'GET_RECIPES_PENDING';
export const GET_SINGLE_RECIPE_PENDING = 'GET_SINGLE_RECIPE_PENDING';
export const NEW_RECIPE_PENDING = 'NEW_RECIPE_PENDING';
export const DELETE_RECIPE_PENDING = 'DELETE_RECIPE_PENDING';

export const SHOW_RECIPE_DIALOG = 'SHOW_RECIPE_DIALOG';
export const HIDE_RECIPE_DIALOG = 'HIDE_RECIPE_DIALOG';
export const SHOW_RECIPE_EDIT_DIALOG = 'SHOW_RECIPE_EDIT_DIALOG';
export const HIDE_RECIPE_EDIT_DIALOG = 'HIDE_RECIPE_EDIT_DIALOG';

export const EDIT_RECIPE_SUCCESS = 'EDIT_RECIPE_SUCCESS';
export const EDIT_RECIPE_PENDING = 'EDIT_RECIPE_PENDING';
export const EDIT_RECIPE_FAILED = 'EDIT_RECIPE_FAILED';

export const GET_RECIPES_FAILED = 'GET_RECIPES_FAILED';
export const GET_SINGLE_RECIPE_FAILED = 'GET_SINGLE_RECIPE_FAILED';
export const NEW_RECIPE_FAILED = 'NEW_RECIPE_FAILED';
export const DELETE_RECIPE_FAILED = 'DELETE_RECIPE_FAILED';

export function getUpdateRecipeSuccessAction(){
    return {
        type: EDIT_RECIPE_SUCCESS
    }
}

export function getUpdateRecipePendingAction(){
    return {
        type: EDIT_RECIPE_PENDING
    }
}

export function getUpdateRecipeFailedAction(){
    return {
        type: EDIT_RECIPE_FAILED
    }
}

export function getGetRecipesSuccessAction(recipeList){
    return {
        type: GET_RECIPES_SUCCESS,
        recipes: recipeList
    }
}

export function getGetSingleRecipeSuccessAction(recipeList){
    return {
        type: GET_SINGLE_RECIPE_SUCCESS,
        recipe: recipeList
    }
}

export function getNoRecipeAction(){
    return {
        type: NO_RECIPE
    }
}

export function getShowRecipeDialogAction(){
    return {
        type: SHOW_RECIPE_DIALOG
    }
}

export function getHideRecipeDialogAction(){
    return {
        type: HIDE_RECIPE_DIALOG
    }
}

export function getShowRecipeEditDialogAction(){
    return {
        type: SHOW_RECIPE_EDIT_DIALOG
    }
}

export function getHideRecipeEditDialogAction(){
    return {
        type: HIDE_RECIPE_EDIT_DIALOG
    }
}

export function getNewRecipeSuccessAction(newRecipe){
    return {
        type: NEW_RECIPE_SUCCESS,
        recipes: newRecipe
    }
}

export function getDeleteRecipeSuccessAction(recipes){
    return {
        type: DELETE_RECIPE_SUCCESS,
        recipes: recipes
    }
}

export function getGetRecipesPendingAction(){
    return {
        type: GET_RECIPES_PENDING
    }
}

export function getGetSingleRecipePendingAction(){
    return {
        type: GET_SINGLE_RECIPE_PENDING
    }
}

export function getNewRecipePendingAction(){
    return {
        type: NEW_RECIPE_PENDING
    }
}

export function getDeleteRecipePendingAction(){
    return {
        type: DELETE_RECIPE_PENDING
    }
}



export function getGetRecipesFailedAction(error){
    return {
        type: GET_RECIPES_FAILED,
        error: error
    }
}

export function getGetSingleRecipeFailedAction(error){
    return {
        type: GET_SINGLE_RECIPE_FAILED,
        error: error
    }
}

export function getNewRecipeFailedAction(error){
    return {
        type: NEW_RECIPE_FAILED,
        error: error
    }
}

export function getDeleteRecipeFailedAction(error){
    return {
        type: DELETE_RECIPE_FAILED,
        error: error
    }
}

export function getAllRecipes(){
    console.log('get recipes');

    return dispatch => {
        dispatch(getGetRecipesPendingAction());
        getAllRecipesRequest()
            .then(
                recipes => {
                    const action = getGetRecipesSuccessAction(recipes);
                    dispatch(action);
                },
                error => {
                    dispatch(getGetRecipesFailedAction(error));
                }
            )
            .catch(error => {
                dispatch(getGetRecipesFailedAction(error));
            })
    }
}

function getAllRecipesRequest(){
    const requestOptions= {
        method: 'GET',
    };

    return fetch(config.backendURL + config.backendEndpoints.recipes, requestOptions)
        .then(handleResponse)
        .then(recipeList => {
            return recipeList;
        })
}

export function getSingleRecipe(recipeID){
    console.log('get one recipe');

    return dispatch => {
        dispatch(getGetSingleRecipePendingAction());
        getSingleRecipeRequest(recipeID)
            .then(
                recipes => {
                    const action = getGetSingleRecipeSuccessAction(recipes);
                    dispatch(action);
                },
                error => {
                    dispatch(getGetSingleRecipeFailedAction(error));
                }
            )
            .catch(error => {
                dispatch(getGetSingleRecipeFailedAction(error));
            })
    }
}

function getSingleRecipeRequest(recipeID){
    const requestOptions= {
        method: 'GET',
    };

    return fetch(config.backendURL + config.backendEndpoints.singleRecipe + recipeID, requestOptions)
        .then(handleResponse)
        .then(recipeList => {
            return recipeList;
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
            console.log(data)
            let recipeList = data;
            return recipeList;
        }
    })
}

function logout(){
    //user und token null setzen
    console.error('Should logout user');
}

export function createRecipe(token, title, preparation_time, ingredients, instructions){
    console.log('create recipe');

    return dispatch => {
        dispatch(getNewRecipePendingAction());
        createRecipeRequest(token, title, preparation_time, ingredients, instructions)
            .then(
                recipes => {
                    const action = getNewRecipeSuccessAction(recipes);
                    dispatch(action);
                },
                error => {
                    dispatch(getNewRecipeFailedAction(error));
                }
            )
            .catch(error => {
                dispatch(getNewRecipeFailedAction(error));
            })
    }
}

function createRecipeRequest(token, title, preparation_time, ingredients, instructions){
    const requestOptions= {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, preparation_time, ingredients, instructions })
    };

    return fetch(config.backendURL + config.backendEndpoints.recipes, requestOptions)
        .then(handleResponse)
        .then(recipeList => {
            return recipeList;
        })
}

export function deleteRecipe(token, recipeID) {
    return dispatch => {
        dispatch(getDeleteRecipePendingAction());
        deleteRecipeRequest(token, recipeID)
        .then(
            userSession => {
                const action = getDeleteRecipeSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                dispatch(getDeleteRecipeFailedAction(error));
            }
        )
        .catch(error =>{
            dispatch(getDeleteRecipeFailedAction(error));
        })
    }
}

function deleteRecipeRequest(token, recipeID) {
    const requestOptions= {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    };
    console.log(config.backendURL + config.backendEndpoints.singleRecipe + recipeID);
    return fetch(config.backendURL + config.backendEndpoints.singleRecipe + recipeID, requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        })
}

export function updateRecipe(token, recipeID, title, preparation_time, ingredients, instructions) {
    return dispatch => {
        dispatch(getUpdateRecipePendingAction());
        updateRecipeRequest(token, recipeID, title, preparation_time, ingredients, instructions)
        .then(
            recipeSession => {
                const action = getUpdateRecipeSuccessAction(recipeSession);
                dispatch(action);
            },
            error => {
                dispatch(getUpdateRecipeFailedAction(error));
            }
        )
        .catch(error =>{
            dispatch(getUpdateRecipeFailedAction(error));
        })
    }
}

function updateRecipeRequest(token, recipeID, title, preparation_time, ingredients, instructions) {
    const requestOptions= {
        method: 'PUT',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ title, ingredients, instructions, preparation_time})
    };
    console.log("DEBUG REQUEST");
    console.log(token);
    console.log(config.backendURL + config.backendEndpoints.singleRecipe + recipeID);
    return fetch(config.backendURL + config.backendEndpoints.singleRecipe + recipeID, requestOptions)
        .then(handleResponse)
        .then(recipeSession => {
            return recipeSession;
        })
}