import api, { setAuthToken, clearAuthToken } from '../../api/axios'

export const SET_USER = 'client/setUser'
export const SET_ROLES = 'client/setRoles'
export const SET_THEME = 'client/setTheme'
export const SET_LANGUAGE = 'client/setLanguage'
export const SET_ADDRESS_LIST = 'client/setAddressList'
export const SET_CREDIT_CARDS = 'client/setCreditCards'
export const SET_ORDERS = 'client/setOrders'

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language })
export const setAddressList = (addressList) => ({ type: SET_ADDRESS_LIST, payload: addressList })
export const setCreditCards = (creditCards) => ({ type: SET_CREDIT_CARDS, payload: creditCards })
export const setOrders = (orders) => ({ type: SET_ORDERS, payload: orders })

// Thunk: logs in, stores the user on the client reducer, and remembers the
// token in localStorage when the user opted in.
export const login = (email, password, rememberMe) => (dispatch) => {
  return api.post('/login', { email, password }).then(({ data }) => {
    dispatch(setUser(data))
    setAuthToken(data.token)
    if (rememberMe) localStorage.setItem('token', data.token)
    return data
  })
}

// Thunk: on app start, if a token was remembered in localStorage, verify it
// with the backend and restore the session; otherwise clean up a stale token.
export const verifyToken = () => (dispatch) => {
  const token = localStorage.getItem('token')
  if (!token) return Promise.resolve()

  setAuthToken(token)

  return api
    .get('/verify')
    .then(({ data }) => {
      dispatch(setUser(data))
      localStorage.setItem('token', data.token)
      setAuthToken(data.token)
    })
    .catch(() => {
      localStorage.removeItem('token')
      clearAuthToken()
    })
}

// Thunk: fetches the logged-in user's saved addresses.
export const fetchAddressList = () => (dispatch) => {
  return api.get('/user/address').then(({ data }) => {
    dispatch(setAddressList(data))
  })
}

// Thunk: saves a new address, then refreshes the address list.
export const addAddress = (address) => (dispatch) => {
  return api.post('/user/address', address).then(() => {
    dispatch(fetchAddressList())
  })
}

// Thunk: updates an existing address (payload must include its id), then
// refreshes the address list.
export const updateAddress = (address) => (dispatch) => {
  return api.put('/user/address', address).then(() => {
    dispatch(fetchAddressList())
  })
}

// Thunk: deletes an address, then refreshes the address list.
export const deleteAddress = (addressId) => (dispatch) => {
  return api.delete(`/user/address/${addressId}`).then(() => {
    dispatch(fetchAddressList())
  })
}

// Thunk: fetches the logged-in user's saved credit cards.
export const fetchCardList = () => (dispatch) => {
  return api.get('/user/card').then(({ data }) => {
    dispatch(setCreditCards(data))
  })
}

// Thunk: saves a new card, then refreshes the card list.
export const addCard = (card) => (dispatch) => {
  return api.post('/user/card', card).then(() => {
    dispatch(fetchCardList())
  })
}

// Thunk: updates an existing card (payload must include its id), then
// refreshes the card list.
export const updateCard = (card) => (dispatch) => {
  return api.put('/user/card', card).then(() => {
    dispatch(fetchCardList())
  })
}

// Thunk: deletes a card, then refreshes the card list.
export const deleteCard = (cardId) => (dispatch) => {
  return api.delete(`/user/card/${cardId}`).then(() => {
    dispatch(fetchCardList())
  })
}

// Thunk: fetches the logged-in user's previous orders.
export const fetchOrders = () => (dispatch) => {
  return api.get('/order').then(({ data }) => {
    dispatch(setOrders(data))
  })
}
