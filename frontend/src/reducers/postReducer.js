import { GET_ALL_POST, NEW_POST_SUCCESS, NEW_POST_FAILURE  } from '../actions' 

const initialState = {
    posts: [],
    error: null
  };

export function postReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_POST:
            return state;
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