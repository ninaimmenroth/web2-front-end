import { combineReducers } from "redux";
import authReducer from './AuthenticationReducer';
import recipeReducer from './RecipeReducer';
import userReducer from './UserReducer';

const RootReducer = combineReducers(
    {
        authReducer,
        recipeReducer,
        userReducer
    }
);

export default RootReducer;