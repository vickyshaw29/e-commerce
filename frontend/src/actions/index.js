import axios from 'axios'
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REVIEW_FAIL, PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from '../constants/products'
// export const listProducts = (search,pageNumber='') => async dispatch => {
//     try {
       
//         dispatch({ type: 'PRODUCT_LIST_REQUEST' })
//         const config={
//             params:{
//                 search,
//                 pageNumber
//             }
//         }
//         const {data} = await axios.get('http://localhost:8000/api/products/',config)
//         dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data })
        
//     } catch (error) {
//         dispatch({ type: "PRODUCT_LIST_FAIL", payload: error })
//     }
// }
export const listProducts = () => async dispatch => {
    try {
       
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const {data} = await axios.get('http://localhost:8000/api/products/')
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
        
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response })
    }
}
export const detailsProduct = (id) => async dispatch => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const data = await axios.get(`http://localhost:8000/api/product/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error })
    }
}
// deleting products by the admin
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`http://localhost:8000/api/admin/product/${id}`, config)
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error })
    }
}
// creating product by the admin
export const createProduct = ({name,image,description,brand,category,price,countInStock,user}) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const userdata={name,image,description,brand,category,price,countInStock,user}
        const { data } = await axios.post(`http://localhost:8000/api/create/product`, userdata, config)
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: error })
    }
}
// updating product by the admin
export const updateProduct = (productId,product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = axios.put(`http://localhost:8000/api/admin/product/${productId}`,product, config)
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({type:PRODUCT_UPDATE_FAIL , payload:error})
    }

}
// review product by the logged in user 
export const postReview = (productId,review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = axios.post(`http://localhost:8000/api/product/${productId}/reviews`,review, config)
        dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data })
    } catch (error) {
        dispatch({type:PRODUCT_REVIEW_FAIL , payload:error})
    }

}
// action for getting the top products
export const listTopProducts = () => async dispatch => {
    try {
       
        dispatch({ type: PRODUCT_TOP_REQUEST })
        const {data} = await axios.get('http://localhost:8000/api/products/top')
        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data })
        
    } catch (error) {
        dispatch({ type: PRODUCT_TOP_FAIL, payload: error.response && error.response.data.error ? error.response.data.error : error.error })
    }
}
