import * as UserActions from '../actions/UserActions'

const initialState = {
    users: [{}],
    user: [{}],
    usersPending: false,
    userLoaded: false,
    userDeletedPending: false,
    showUserEditDialog: false,
    showUserCreateDialog: false
};

function UserReducer(state = initialState, action) {

    console.log('Reducer: ' + action.type)

    switch (action.type) {
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
            console.log('Reducer: ' + action)
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
            console.log('Reducer gSRS: ' + action)
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
                user: action.newUser
            }
        case UserActions.NEW_USER_PENDING:
            return {
                ...state,
                usersPending: true,
                userLoaded: false,
                error: null
            }
        case UserActions.NEW_USER_FAILED:
            return {
                ...state,
                usersPending: false,
                userLoaded: false,
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
                error: null
            }
        case UserActions.EDIT_USER_PENDING:
            return {
                ...state,
                error: null
            }
        case UserActions.EDIT_USER_FAILED:
            return {
                ...state,
                error: "updating user failed"
            }
        case UserActions.DELETE_USER_SUCCESS:
            return {
                ...state,
                userDeletedPending: false,
                error: null
            }
        case UserActions.DELETE_USER_PENDING:
            return {
                ...state,
                userDeletedPending: true,
                error: null
            }
        case UserActions.DELETE_USER_FAILED:
            return {
                ...state,
                userDeletedPending: false,
                error: "deleting user failed"
            }
        default:
            return state;
    }

}

export default UserReducer;