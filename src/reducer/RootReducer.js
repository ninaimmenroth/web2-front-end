import { combineReducers } from "redux";
import authReducer from './AuthenticationReducer';
import recipeReducer from './RecipeReducer';
import userReducer from './UserReducer';
import commentReducer from './CommentReducer';


const RootReducer = combineReducers(
    {
        authReducer,
        recipeReducer,
        userReducer,
        commentReducer
    }
);

export default RootReducer;