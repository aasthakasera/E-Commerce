import * as ActionTypes from '../ActionTypes/orderConstants'
import axios from 'axios'
import { logout } from './userActions'
import { CART_RESET } from '../ActionTypes/cartConstants'

export const createOrder = (order) => async(dispatch, getState) => {
    try { 
        dispatch({ type: ActionTypes.ORDER_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/orders`, order, config)

        dispatch({ 
            type: ActionTypes.ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: CART_RESET,
            payload: data
        })        
    } 
    catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ActionTypes.ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}


export const getOrderDetails = (id) => async(dispatch, getState) => {
    try { 
        dispatch({ type: ActionTypes.ORDER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/${id}`, config)

        dispatch({ 
            type: ActionTypes.ORDER_DETAILS_SUCCESS,
            payload: data
        })        
    } 
    catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ActionTypes.ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}
 
export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
    try { 
        dispatch({ type: ActionTypes.ORDER_PAY_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({ 
            type: ActionTypes.ORDER_PAY_SUCCESS,
            payload: data
        })         
    } 
    catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ActionTypes.ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

export const listMyOrders = () => async(dispatch, getState) => {
    try { 
        dispatch({ type: ActionTypes.LIST_MY_ORDER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get("/api/orders/myorders",  config)

        dispatch({ 
            type: ActionTypes.LIST_MY_ORDER_SUCCESS,
            payload: data
        })         
    } 
    catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ActionTypes.LIST_MY_ORDER_FAIL,
            payload: message,
        })
    }
}

export const listOrders = () => async(dispatch, getState) => {
    try { 
        dispatch({ type: ActionTypes.LIST_ORDERS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get("/api/orders",  config)

        dispatch({ 
            type: ActionTypes.LIST_ORDERS_SUCCESS,
            payload: data
        })         
    } 
    catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ActionTypes.LIST_ORDERS_FAIL,
            payload: message,
        })
    }
}

export const deliverOrder = (order) => async(dispatch, getState) => {
    try { 
        dispatch({ type: ActionTypes.ORDER_DELIVER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {} ,config)

        dispatch({ 
            type: ActionTypes.ORDER_DELIVER_SUCCESS,
            payload: data
        })         
    } 
    catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ActionTypes.ORDER_DELIVER_FAIL,
            payload: message,
        })
    }
}