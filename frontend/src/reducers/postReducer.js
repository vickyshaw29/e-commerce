import {
    PRODUCT_DELETE_REQUEST
    , PRODUCT_DELETE_SUCCESS
    , PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_LIST_RESET,
    PRODUCT_DETAILS_RESET,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/products"

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products:action.payload
                // pages:action.payload.pages,
                // page:action.payload.page
            
            }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_LIST_RESET:
            return { loading:false,products:[] }
        default:
            return state
    }
}
export const productDetalisReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, product: [] }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, success: true, product: action.payload.data }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_DETAILS_RESET:
            return {}
        default:
            return state
    }
}
export const productDeleteReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, message: action.payload }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}
// CREATE REDUCER BY THE ADMIN
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default: return state
    }
}
// UPDATE PRODUCT BY THE ADMIN
export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        // case PRODUCT_UPDATE_RESET:
        //     return {}
        default: return state
    }
}
// PRODUCT REVIEW REDUCER
export const productReviewReducre=(state={},action)=>{
    switch(action.type){
        case PRODUCT_REVIEW_REQUEST:
            return {loading:true}
        case PRODUCT_REVIEW_SUCCESS:
            return {loading:false,success:true}
        case PRODUCT_REVIEW_FAIL:
            return {loading:false,error:action.payload}
        case PRODUCT_REVIEW_RESET:
            return {}
        default:return state
    }
}
// REDUCER FOR GETTING THE TOP RATED PRODUCTS
export const productTopReducer=(state={products:[]},action)=>{
    switch(action.type){
        case PRODUCT_TOP_REQUEST:
            return {loading:true}
        case PRODUCT_TOP_SUCCESS:
            return {loading:false,products:action.payload}
        case PRODUCT_TOP_FAIL:
            return {loading:false,error:action.payload}
        default:return state
    }
}