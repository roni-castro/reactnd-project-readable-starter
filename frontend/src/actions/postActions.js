import * as ServerAPI from '../ServerAPI';
import { 
    NEW_POST_SUCCESS, 
    NEW_POST_FAILURE, 
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    UP_VOTE_SUCCESS,
    UP_VOTE_FAILURE,
} from './index'

const onNewPostSuccess = (post) => ({
    type: NEW_POST_SUCCESS,
    payload: post
})

const onNewPostError = (error) => ({
    type: NEW_POST_FAILURE,
    payload: error
})

export function newPostAPI(post) {
    return (dispatch) => {
        ServerAPI
        .createPost(post)
        .then(post => dispatch(onNewPostSuccess(post)))
        .catch(err => dispatch(onNewPostError(err)))
    }
}

export function getPostsAPI() {
    return (dispatch) => {
        ServerAPI
        .getAllPosts()
        .then((posts) => dispatch(onGetPostsSuccess(posts)))
        .catch((err) =>  dispatch(onGetPostsError(err)))
    }
}

const onGetPostsSuccess = (posts) => ({
    type: GET_POSTS_SUCCESS,
    payload: posts
})

const onGetPostsError = (error) => ({
    type: GET_POSTS_FAILURE,
    payload: error
})

export function updateVoteAPI(postId, voteType) {
    return (dispatch) => {
        ServerAPI
        .updateVote(postId, voteType)
        .then((post) => dispatch(onUpdateVoteSuccess(post)))
        .catch((err) => dispatch(onUpdateVoteError(err)))
    }
}

const onUpdateVoteSuccess = (post) => ({
    type: UP_VOTE_SUCCESS,
    payload: post
})

const onUpdateVoteError = (error) => ({
    type: UP_VOTE_FAILURE,
    payload: error
})