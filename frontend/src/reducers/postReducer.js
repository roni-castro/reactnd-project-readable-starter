import { 
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    NEW_POST_SUCCESS,
    NEW_POST_FAILURE
} from '../actions' 

const initialState = {
    posts: [],
    error: null
  };

export function postReducer(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            }
        case GET_POSTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                posts: []
            }
        case NEW_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.payload]
        }
        case NEW_POST_FAILURE:
            return {
              ...state,
              error: action.payload,
              posts: []
        }
        default:
            return state;
    }
}