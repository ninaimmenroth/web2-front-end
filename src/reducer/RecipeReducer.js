import * as RecipeActions from '../actions/RecipeActions'

const initialState = {
    recipes: [],
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
        case RecipeActions.NEW_RECIPE_SUCCESS:
            return {
                ...state,
                recipesPending: false,
                user: action.user,
                accessToken: action.accessToken
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