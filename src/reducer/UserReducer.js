import * as UserActions from '../actions/UserActions'

const initialState = {
    users: [{}],
    user: [{}],
    usersPending: false,
    userLoaded: false,
    showUserEditDialog: false,
    showUserCreateDialog: false,
    showUserDeleteDialog: false,
    spinner: false
};

function UserReducer(state = initialState, action) {

    switch (action.type) {
        case UserActions.SHOW_USER_DEL_DIALOG:
            return {
                ...state,
                showUserDelDialog: true,
                error: null
            }
        case UserActions.HIDE_USER_DEL_DIALOG:
            return {
                ...state,
                showUserDelDialog: false,
                error: null
            }
        case UserActions.SHOW_USER_EDIT_DIALOG:
            return {
                ...state,
                showUserEditDialog: true,
                error: null
            }
        case UserActions.HIDE_USER_EDIT_DIALOG:
            return {
                ...state,
                showUserEditDialog: false,
                error: null
            }
        case UserActions.SHOW_USER_NEW_DIALOG:
            return {
                ...state,
                showUserCreateDialog: true,
                error: null
            }
        case UserActions.HIDE_USER_NEW_DIALOG:
            return {
                ...state,
                showUserCreateDialog: false,
                error: null
            }
        case UserActions.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
                usersPending: false,
                userLoaded: true,
                error: null
            }
        case UserActions.GET_USERS_PENDING:
            return {
                ...state,
                usersPending: true,
                userLoaded: false,
                error: null
            }
        case UserActions.GET_USERS_FAILED:
            return {
                ...state,
                usersPending: false,
                userLoaded: false,
                error: "Get users failed"
            }

        case UserActions.GET_SINGLE_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                usersPending: false,
                error: null
            }
        case UserActions.GET_SINGLE_USER_PENDING:
            return {
                ...state,
                usersPending: true,
                error: null
            }
        case UserActions.GET_SINGLE_USER_FAILED:
            return {
                ...state,
                usersPending: false,
                error: "Get single user failed"
            }

        case UserActions.NEW_USER_SUCCESS:
            return {
                ...state,
                usersPending: false,
                spinner: false,
                showUserCreateDialog: false,
                user: action.newUser
            }
        case UserActions.NEW_USER_PENDING:
            return {
                ...state,
                usersPending: true,
                userLoaded: false,
                spinner: true,
                error: null
            }
        case UserActions.NEW_USER_FAILED:
            return {
                ...state,
                usersPending: false,
                userLoaded: false,
                spinner: false,
                error: "Create user failed"
            }
        case UserActions.NO_USER:
            return {
                ...state,
                usersPending: false,
                error: 'Authentication failed'
            }
        case UserActions.EDIT_USER_SUCCESS:
            return {
                ...state,
                showUserEditDialog: false,
                spinner: false,
                error: null
            }
        case UserActions.EDIT_USER_PENDING:
            return {
                ...state,
                spinner: true,
                error: null
            }
        case UserActions.EDIT_USER_FAILED:
            return {
                ...state,
                spinner: false,
                error: "updating user failed"
            }
        case UserActions.DELETE_USER_SUCCESS:
            return {
                ...state,
                usersPending: false,
                showUserDelDialog: false,
                spinner: false,
                error: null
            }
        case UserActions.DELETE_USER_PENDING:
            return {
                ...state,
                usersPending: true,
                spinner: true,
                error: null
            }
        case UserActions.DELETE_USER_FAILED:
            return {
                ...state,
                usersPending: false,
                spinner: false,
                error: "deleting user failed"
            }
        default:
            return state;
    }

}

export default UserReducer;