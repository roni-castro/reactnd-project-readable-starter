import { GET_ALL_POST } from '../actions' 

export function postReducer(state = {}, action) {
    switch(action.type) {
        case GET_ALL_POST:
            return state;
        default:
            return state;
    }
}