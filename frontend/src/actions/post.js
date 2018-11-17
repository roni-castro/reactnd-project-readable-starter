import * as ServerAPI from '../ServerAPI';
import { 
    NEW_POST_SUCCESS, 
    NEW_POST_FAILURE, 
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE
} from './index'
import { 
    VOTE_FILTER_TYPE, 
    TIMESTAMP_FILTER_TYPE
} from '../utils/Constants'

const onNewPostSuccess = (post) => ({
    type: NEW_POST_SUCCESS,
    payload: post
})

const onNewPostError = (error) => ({
    type: NEW_POST_FAILURE,
    payload: error
})


// export function newPost(formData, callback) {
// return dispatch => {
//     dispatch(newPostBegin())
//     axios.post(`${API_ENDPOINT}/posts`, data)
//       .then(res => {
//         callback(res.data)
//         dispatch(newPostSuccess(res.data))
//       })
//       .catch(error => dispatch(newPostFailure(error)))
    
//   }
// }


export function newPostAPI(post) {
    return (dispatch) => {
        ServerAPI
        .createPost(post)
        .then(post => dispatch(onNewPostSuccess(post)))
        .catch(err => dispatch(onNewPostError(err)))
    }
}

export function getPostsAPI(filterSelectedId) {
    return (dispatch) => {
        ServerAPI
        .getAllPosts()
        .then((posts) => {
            let filteredPosts = orderPosts(filterSelectedId, posts)
            console.log(posts)
            dispatch(onGetPostsSuccess(filteredPosts))
        })
        .catch((err) => dispatch(onGetPostsError(err)))
    }
}

function orderPosts(filterSelectedId, posts) {
    if(filterSelectedId === TIMESTAMP_FILTER_TYPE) {
       return posts.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
    } else if(filterSelectedId === VOTE_FILTER_TYPE) {
       return posts.sort((a,b) => b.voteScore - a.voteScore) 
    } else {
        return posts
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