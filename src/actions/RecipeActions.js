export const GET_RECIPES_SUCCESS = 'GET_RECIPES_SUCCESS';
export const NEW_RECIPE_SUCCESS = 'NEW_RECIPE_SUCCESS';
export const NO_RECIPE = 'NO_RECIPE';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const GET_RECIPES_PENDING = 'GET_RECIPES_PENDING';
export const NEW_RECIPE_PENDING = 'NEW_RECIPE_PENDING';
export const DELETE_RECIPE_PENDING = 'DELETE_RECIPE_PENDING';

export const SHOW_RECIPE_DIALOG = 'SHOW_RECIPE_DIALOG';
export const HIDE_RECIPE_DIALOG = 'HIDE_RECIPE_DIALOG';

export const GET_RECIPES_FAILED = 'GET_RECIPES_FAILED';
export const NEW_RECIPE_FAILED = 'NEW_RECIPE_FAILED';
export const DELETE_RECIPE_FAILED = 'DELETE_RECIPE_FAILED';

export function getGetRecipesSuccessAction(recipeList){
    return {
        type: GET_RECIPES_SUCCESS,
        recipes: recipeList
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

export function getNewRecipeSuccessAction(newRecipe){
    return {
        type: NEW_RECIPE_SUCCESS,
        newRecipe: newRecipe
    }
}

//give back list of all recipes, depending on which button was selected (all/my) ? possible?
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

    return fetch('https://localhost:8080/recipes', requestOptions)
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
            let recipeList = {
                recipes: data,
            }
            return recipeList;
        }
    })
}

function logout(){
    //user und token null setzen
    console.error('Should logout user');
}
