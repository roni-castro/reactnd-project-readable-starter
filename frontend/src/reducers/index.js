import { combineReducers } from 'redux';
import { postReducer, singlePostReducer} from './postReducer';
import { categoryReducer } from './categoryReducer';
import { singleCommentReducer, commentsReducer } from './commentReducer';

export default combineReducers({
    postReducer,
    singlePostReducer,
    singleCommentReducer,
    commentsReducer,
    categoryReducer,
})
