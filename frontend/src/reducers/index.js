import { combineReducers } from 'redux';
import { postReducer, singlePostReducer} from './postReducer';
import { categoryReducer } from './categoryReducer';

export default combineReducers({
    postReducer,
    singlePostReducer,
    categoryReducer,
})
