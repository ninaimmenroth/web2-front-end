import * as RecipeActions from '../actions/RecipeActions'

const initialState = {
    recipes: [{}],
    recipe: [{}],
    recipesPending: false
};

function RecipeReducer(state = initialState, action) {

    console.log('Reducer: ' + action.type)

    switch (action.type) {
        case RecipeActions.GET_RECIPES_SUCCESS:
            console.log('Reducer: ' + action)
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

        case RecipeActions.GET_SINGLE_RECIPE_SUCCESS:
            console.log('Reducer gSRS: ' + action)
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
                recipesPending: false
            }
        case RecipeActions.NEW_RECIPE_PENDING:
            return {
                ...state,
                recipesPending: true,
                error: null
            }
        case RecipeActions.NEW_RECIPE_FAILED:
            return {
                ...state,
                recipesPending: false,
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