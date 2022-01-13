import * as CommentActions from '../actions/CommentActions'

const initialState = {
    comments: [{}],
    comment: [{}],
    commentsPending: false,
    showCommentEditDialog: false,
    showCommentCreateDialog: false
};

function CommentReducer(state = initialState, action) {

    console.log('Reducer: ' + action.type)

    switch (action.type) {
        case CommentActions.SHOW_COMMENT_EDIT_DIALOG:
            return {
                ...state,
                showCommentEditDialog: true,
                error: null
            }
        case CommentActions.HIDE_COMMENT_EDIT_DIALOG:
            return {
                ...state,
                showCommentEditDialog: false,
                error: null
            }
            case CommentActions.SHOW_COMMENT_NEW_DIALOG:
                return {
                    ...state,
                    showCommentCreateDialog: true,
                    error: null
                }
            case CommentActions.HIDE_COMMENT_NEW_DIALOG:
                return {
                    ...state,
                    showCommentCreateDialog: false,
                    error: null
                }
        case CommentActions.EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                showCommentEditDialog: false,
                error: null
            }
        case CommentActions.EDIT_COMMENT_PENDING:
            return {
                ...state,
                error: null
            }
        case CommentActions.EDIT_COMMENT_FAILED:
            return {
                ...state,
                error: "updating user failed"
            }
        case CommentActions.GET_COMMENTS_SUCCESS:
            console.log('Reducer: ' + action)
            return {
                ...state,
                comments: action.comments,
                commentsPending: false,
                error: null
            }
        case CommentActions.GET_COMMENTS_PENDING:
            return {
                ...state,
                commentsPending: true,
                error: null
            }
        case CommentActions.GET_COMMENTS_FAILED:
            return {
                ...state,
                commentsPending: false,
                error: "Get comments failed"
            }

        case CommentActions.GET_SINGLE_COMMENT_SUCCESS:
            console.log('Reducer gSRS: ' + action)
            return {
                ...state,
                comment: action.comment,
                commentsPending: false,
                error: null
            }
        case CommentActions.GET_SINGLE_COMMENT_PENDING:
            return {
                ...state,
                commentsPending: true,
                error: null
            }
        case CommentActions.GET_SINGLE_COMMENT_FAILED:
            return {
                ...state,
                commentsPending: false,
                error: "Get single comment failed"
            }
        case CommentActions.NEW_COMMENT_SUCCESS:
            return {
                ...state,
                comment: action.comments,
                showCommentCreateDialog: false,
                commentsPending: false
            }
        case CommentActions.NEW_COMMENT_PENDING:
            return {
                ...state,
                commentsPending: true,
                error: null
            }
        case CommentActions.NEW_COMMENT_FAILED:
            return {
                ...state,
                commentsPending: false,
                error: "Create comment failed"
            }
        case CommentActions.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                comment: action.comments,
                commentsPending: false
            }
        case CommentActions.DELETE_COMMENT_PENDING:
            return {
                ...state,
                commentsPending: true,
                error: null
            }
        case CommentActions.DELETE_COMMENT_FAILED:
            return {
                ...state,
                commentsPending: false,
                error: "Delete comment failed"
            }
        case CommentActions.NO_COMMENT:
            return {
                ...state,
                commentsPending: false,
                error: 'Authentication failed'
            }
        default:
            return state;
    }

}

export default CommentReducer;