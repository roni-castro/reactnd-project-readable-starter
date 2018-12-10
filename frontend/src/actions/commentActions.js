import * as ServerAPI from '../ServerAPI';
import { 
    GET_ALL_COMMENTS_SUCCESS,
    GET_ALL_COMMENTS_FAILURE,
    GET_SINGLE_COMMENT_SUCCESS,
    GET_SINGLE_COMMENT_FAILURE,
    COMMENT_UP_VOTE_FAILURE,
    COMMENT_UP_VOTE_SUCCESS,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
} from './index'
import * as uuidv4 from 'uuid';

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

export function updateCommentVoteAPI(commentId, voteType) {
    return (dispatch) => {
        ServerAPI
        .updateCommentVote(commentId, voteType)
        .then((comment) => dispatch(onUpdateVoteSuccess(comment)))
        .catch((err) => dispatch(onUpdateVoteError(err)))
    }
}

const onUpdateVoteSuccess = (comment) => ({
    type: COMMENT_UP_VOTE_SUCCESS,
    payload: comment
})

const onUpdateVoteError = (error) => ({
    type: COMMENT_UP_VOTE_FAILURE,
    payload: error
})

export function createCommentAPI(comment) {
    comment = {
        ...comment,
        id: uuidv4(),
        timestamp: Date.now()
    }

    return (dispatch) => {
        ServerAPI
        .createComment(comment)
        .then((comment) => dispatch(onCreateCommentSuccess(comment)))
        .catch((err) => dispatch(onCreateCommentError(err)))
    }
}

const onCreateCommentSuccess = (comment) => ({
    type: CREATE_COMMENT_SUCCESS,
    payload: comment
})

const onCreateCommentError = (error) => ({
    type: CREATE_COMMENT_FAILURE,
    payload: error
})

export function editCommentAPI(commentId) {
    return (dispatch) => {
        ServerAPI
        .editComment(commentId)
        .then((comment) => dispatch(onEditCommentSuccess(comment)))
        .catch((err) => dispatch(onEditCommentError(err)))
    }
}

const onEditCommentSuccess = (comment) => ({
    type: EDIT_COMMENT_SUCCESS,
    payload: comment
})

const onEditCommentError = (error) => ({
    type: EDIT_COMMENT_FAILURE,
    payload: error
})