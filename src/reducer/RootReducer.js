import { combineReducers } from "redux";
import authReducer from './AuthenticationReducer';
import recipeReducer from './RecipeReducer';

const RootReducer = combineReducers(
    {
        authReducer,
        recipeReducer
    }
);

export default RootReducer;