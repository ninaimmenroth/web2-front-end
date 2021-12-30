import * as AuthenticationActions from '../actions/AuthenticationActions'

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false
};

function AuthenticationReducer(state = initialState, action) {

    console.log('Reducer: ' + action.type)

    switch (action.type) {
        case AuthenticationActions.SHOW_LOGIN_DIALOG:
            console.log('Changing state ')
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case AuthenticationActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }
        case AuthenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                loginPending: true,
                error: null
            }
        case AuthenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                loginPending: false,
                user: action.user,
                accessToken: action.accessToken
            }
        case AuthenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                loginPending: false,
                error: 'Authentication failed'
            }
        default:
            return state;
    }

}

export default AuthenticationReducer;