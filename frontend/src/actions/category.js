import * as ServerAPI from '../ServerAPI';
import { GET_ALL_CATEGORIES } from '../actions/index'

const getAllCategories = (categories) => ({
    type: GET_ALL_CATEGORIES,
    categories
})

export const fetchCategoriesAPI = () => dispatch => {
    return (
        ServerAPI
        .fetchAllCategories()
        .then(categories => {
            dispatch(getAllCategories(categories))
        })
    )
}