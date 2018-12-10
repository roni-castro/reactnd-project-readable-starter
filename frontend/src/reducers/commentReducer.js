import {
    GET_ALL_COMMENTS_SUCCESS,
    GET_ALL_COMMENTS_FAILURE,
    GET_SINGLE_COMMENT_SUCCESS,
    GET_SINGLE_COMMENT_FAILURE,
    COMMENT_UP_VOTE_SUCCESS,
    COMMENT_UP_VOTE_FAILURE,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
} from '../actions'

const singleCommentStartState = {
    comment: {},
    error: null
};

export function singleCommentReducer(state = singleCommentStartState, action) {
    switch (action.type) {
        case GET_SINGLE_COMMENT_SUCCESS:
            return {
                ...state,
                comment: action.payload,
                error: null
            }
        case GET_SINGLE_COMMENT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

const commentsStartState = {
    comments: [],
    error: null
};

export function commentsReducer(state = commentsStartState, action) {
    switch (action.type) {
        case GET_ALL_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                error: null
            }
        case GET_ALL_COMMENTS_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case COMMENT_UP_VOTE_SUCCESS:
            return {
                ...state,
                comments: state.comments.map(comment => comment.id === action.payload.id ? action.payload : comment),
                error: null
            }
        case COMMENT_UP_VOTE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, action.payload],
                error: null
            }
        case CREATE_COMMENT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}