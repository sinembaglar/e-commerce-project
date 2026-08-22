export const SET_CART = 'shoppingCart/setCart'
export const SET_PAYMENT = 'shoppingCart/setPayment'
export const SET_ADDRESS = 'shoppingCart/setAddress'

export const setCart = (cart) => ({ type: SET_CART, payload: cart })
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment })
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address })
