import { 
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    GET_SINGLE_POST_SUCCESS,
    GET_SINGLE_POST_FAILURE,
    NEW_POST_SUCCESS,
    NEW_POST_FAILURE,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE,
    UP_VOTE_SUCCESS,
    UP_VOTE_FAILURE,
    DELETE_POST_FAILURE,
    DELETE_POST_SUCCESS,
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
        case UP_VOTE_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.payload.id ? action.payload : post), 
            }
        case UP_VOTE_FAILURE:
            return {
                ...state,
                error: action.payload
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
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload.id),
                err: null
            }
        case DELETE_POST_FAILURE:
            return {
                ...state,
                err: action.payload
            }
        default:
            return state;
    }
}

const singlePostStartState = {
    post: {},
    error: null
};

export function singlePostReducer(state = singlePostStartState, action) {
    switch(action.type) {
        case GET_SINGLE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                error: null
            }
        case GET_SINGLE_POST_FAILURE:
            return {
                ...state,
                post: {},
                error: action.payload
            }
        case EDIT_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
        }
        case EDIT_POST_FAILURE:
            return {
              ...state,
              error: action.payload
        }
        default: 
            return state;
    }
}