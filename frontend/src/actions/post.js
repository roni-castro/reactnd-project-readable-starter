import * as ServerAPI from '../ServerAPI';
import { NEW_POST_SUCCESS, NEW_POST_FAILURE } from './index'

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
    // ServerAPI
    // .createPost(post)
    // .then(post => dispatch(onNewPostSuccess(post)))
    // .catch(err => dispatch(onNewPostError(err)))