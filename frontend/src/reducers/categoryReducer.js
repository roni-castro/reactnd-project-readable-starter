import { GET_ALL_CATEGORIES } from '../actions' 

export function categoryReducer(state = {}, action) {
    switch(action.type) {
        case GET_ALL_CATEGORIES: 
            const {categories} = action 
            return {
                ...state,
                categories
            }
        default:
            return state;
    }
}