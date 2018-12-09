import * as ServerAPI from '../ServerAPI';
import { 
    GET_ALL_COMMENTS_SUCCESS,
    GET_ALL_COMMENTS_FAILURE,
    GET_SINGLE_COMMENT_SUCCESS,
    GET_SINGLE_COMMENT_FAILURE,
} from './index'

export function fetchCommentByIdAPI(commentId) {
    return (dispatch) => {
        ServerAPI
        .fetchCommentById(commentId)
        .then((comment) => dispatch(onFetchCommentByIdSuccess(comment)))
        .catch((err) => dispatch(onFetchCommentByIdError(err)))
    }
}

function onFetchCommentByIdSuccess(comment) {
    return {
        type: GET_SINGLE_COMMENT_SUCCESS,
        payload: comment
    }
}

function onFetchCommentByIdError(err) {
    return {
        type: GET_SINGLE_COMMENT_FAILURE,
        payload: err
    }
}

export function fetchAllPostCommentsAPI(postId) {
    return (dispatch) => {
        ServerAPI
        .fetchAllPostComments(postId)
        .then((comments) => dispatch(onFetchAllPostCommentsSuccess(comments)))
        .catch((err) => dispatch(onFetchAllPostCommentsError(err)))
    }
}

function onFetchAllPostCommentsSuccess(comments) {
    return {
        type: GET_ALL_COMMENTS_SUCCESS,
        payload: comments
    }
}

function onFetchAllPostCommentsError(err) {
    return {
        type: GET_ALL_COMMENTS_FAILURE,
        payload: err
    }
}