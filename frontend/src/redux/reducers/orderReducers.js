import * as ActionTypes from '../ActionTypes/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type){
        case ActionTypes.ORDER_CREATE_REQUEST:
            return { loading: true }
        case ActionTypes.ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ActionTypes.ORDER_CREATE_FAIL:
            return { loading:false, error: action.payload}
        case ActionTypes.ORDER_CREATE_RESET:
                return {}
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { orderItems: [], shippingAddress: {}, loading: true}, action) => {
    switch(action.type){
        case ActionTypes.ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ActionTypes.ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ActionTypes.ORDER_DETAILS_FAIL:
            return { loading:false, error: action.payload}
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch(action.type){
        case ActionTypes.ORDER_PAY_REQUEST:
            return { loading: true }
        case ActionTypes.ORDER_PAY_SUCCESS:
            return { loading: false, success: true }
        case ActionTypes.ORDER_PAY_FAIL:
            return { loading:false, error: action.payload}
        case ActionTypes.ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const listMyOrderReducer = (state = { orders:[]}, action) => {
    switch(action.type){
        case ActionTypes.LIST_MY_ORDER_REQUEST:
            return { loading: true }
        case ActionTypes.LIST_MY_ORDER_SUCCESS:
            return { loading: false, orders: action.payload }
        case ActionTypes.LIST_MY_ORDER_FAIL:
            return { loading:false, error: action.payload}
        case ActionTypes.LIST_MY_ORDER_RESET:
            return { orders:[]}
        default:
            return state
    }
}

export const orderListReducer = (state = { orders:[]}, action) => {
    switch(action.type){
        case ActionTypes.LIST_ORDERS_REQUEST:
            return { loading: true }
        case ActionTypes.LIST_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload }
        case ActionTypes.LIST_ORDERS_FAIL:
            return { loading:false, error: action.payload}
        default:
            return state
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch(action.type){
        case ActionTypes.ORDER_DELIVER_REQUEST:
            return { loading: true }
        case ActionTypes.ORDER_DELIVER_SUCCESS:
            return { loading: false, success: true }
        case ActionTypes.ORDER_DELIVER_FAIL:
            return { loading:false, error: action.payload}
        case ActionTypes.ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}