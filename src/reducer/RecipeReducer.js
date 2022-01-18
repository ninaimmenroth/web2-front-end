import * as RecipeActions from '../actions/RecipeActions'

const initialState = {
    recipes: [{}],
    userRecipes: [{}],
    recipe: [{}],
    recipesPending: false,
    showRecipeEditDialog: false,
    spinner: false
};

function RecipeReducer(state = initialState, action) {


    switch (action.type) {
        case RecipeActions.SHOW_RECIPE_EDIT_DIALOG:
            return {
                ...state,
                showRecipeEditDialog: true,
                error: null
            }
        case RecipeActions.HIDE_RECIPE_EDIT_DIALOG:
            return {
                ...state,
                showRecipeEditDialog: false,
                error: null
            }
        case RecipeActions.EDIT_RECIPE_SUCCESS:
            return {
                ...state,
                showRecipeEditDialog: false,
                spinner: false,
                error: null
            }
        case RecipeActions.EDIT_RECIPE_PENDING:
            return {
                ...state,
                spinner: true,
                error: null
            }
        case RecipeActions.EDIT_RECIPE_FAILED:
            return {
                ...state,
                spinner: false,
                error: "updating user failed"
            }
        case RecipeActions.GET_RECIPES_SUCCESS:
            return {
                ...state,
                recipes: action.recipes,
                recipesPending: false,
                error: null
            }
        case RecipeActions.GET_RECIPES_PENDING:
            return {
                ...state,
                recipesPending: true,
                error: null
            }
        case RecipeActions.GET_RECIPES_FAILED:
            return {
                ...state,
                recipesPending: false,
                error: "Get recipes failed"
            }
        case RecipeActions.GET_RECIPES_USER_SUCCESS:
            return {
                ...state,
                userRecipes: action.recipes,
                recipesPending: false,
                error: null
            }
        case RecipeActions.GET_RECIPES_USER_PENDING:
            return {
                ...state,
                recipesPending: true,
                error: null
            }
        case RecipeActions.GET_RECIPES_USER_FAILED:
            return {
                ...state,
                recipesPending: false,
                error: "Get recipes for user failed"
            }
        case RecipeActions.GET_SINGLE_RECIPE_SUCCESS:
            return {
                ...state,
                recipe: action.recipe,
                recipesPending: false,
                error: null
            }
        case RecipeActions.GET_SINGLE_RECIPE_PENDING:
            return {
                ...state,
                recipesPending: true,
                error: null
            }
        case RecipeActions.GET_SINGLE_RECIPE_FAILED:
            return {
                ...state,
                recipesPending: false,
                error: "Get single recipe failed"
            }
        case RecipeActions.NEW_RECIPE_SUCCESS:
            return {
                ...state,
                recipe: action.recipes,
                spinner: false,
                recipesPending: false
            }
        case RecipeActions.NEW_RECIPE_PENDING:
            return {
                ...state,
                recipesPending: true,
                spinner: true,
                error: null
            }
        case RecipeActions.NEW_RECIPE_FAILED:
            return {
                ...state,
                recipesPending: false,
                spinner: false,
                error: "Create recipe failed"
            }
        case RecipeActions.DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                recipe: action.recipes,
                recipesPending: false
            }
        case RecipeActions.DELETE_RECIPE_PENDING:
            return {
                ...state,
                recipesPending: true,
                error: null
            }
        case RecipeActions.DELETE_RECIPE_FAILED:
            return {
                ...state,
                recipesPending: false,
                error: "Delete recipe failed"
            }
        case RecipeActions.NO_RECIPE:
            return {
                ...state,
                recipesPending: false,
                error: 'Authentication failed'
            }
        default:
            return state;
    }

}

export default RecipeReducer;