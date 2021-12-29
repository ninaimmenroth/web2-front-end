import * as RecipeActions from '../actions/RecipeActions'

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    recipes: null,
    pending: false
};

function RecipeReducer(state = initialState, action) {

    console.log('Reducer: ' + action.type)

    switch (action.type) {
        case RecipeActions.GET_RECIPES_SUCCESS:
            return {
                ...state,
                recipes: action.recipes,
                pending: false,
                error: null
            }
        case RecipeActions.GET_RECIPES_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case RecipeActions.GET_RECIPES_FAILED:
            return {
                ...state,
                pending: false,
                error: "Get recipes failed"
            }
        case RecipeActions.NEW_RECIPE_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                pending: false,
                user: action.user,
                accessToken: action.accessToken
            }
        case RecipeActions.NO_RECIPE:
            return {
                ...state,
                pending: false,
                error: 'Authentication failed'
            }
        default:
            return state;
    }

}

export default RecipeReducer;