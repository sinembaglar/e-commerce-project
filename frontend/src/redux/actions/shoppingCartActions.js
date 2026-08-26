export const SET_CART = 'shoppingCart/setCart'
export const SET_PAYMENT = 'shoppingCart/setPayment'
export const SET_ADDRESS = 'shoppingCart/setAddress'

export const setCart = (cart) => ({ type: SET_CART, payload: cart })
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment })
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address })

// Thunk: adds a product to the cart, or increases its count if it's already there.
export const addToCart = (product) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const existingItem = shoppingCart.cart.find((item) => item.product.id === product.id)

  const newCart = existingItem
    ? shoppingCart.cart.map((item) =>
        item.product.id === product.id ? { ...item, count: item.count + 1 } : item
      )
    : [...shoppingCart.cart, { count: 1, checked: true, product }]

  dispatch(setCart(newCart))
}
