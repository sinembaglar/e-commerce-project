import api from '../../api/axios'

export const SET_USER = 'client/setUser'
export const SET_ROLES = 'client/setRoles'
export const SET_THEME = 'client/setTheme'
export const SET_LANGUAGE = 'client/setLanguage'
export const SET_ADDRESS_LIST = 'client/setAddressList'
export const SET_CREDIT_CARDS = 'client/setCreditCards'

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language })
export const setAddressList = (addressList) => ({ type: SET_ADDRESS_LIST, payload: addressList })
export const setCreditCards = (creditCards) => ({ type: SET_CREDIT_CARDS, payload: creditCards })

// Thunk: only hits the API if roles aren't already in the store.
export const fetchRolesIfNeeded = () => (dispatch, getState) => {
  const { client } = getState()
  if (client.roles.length > 0) return Promise.resolve()

  return api.get('/roles').then(({ data }) => {
    dispatch(setRoles(data))
  })
}

// Thunk: logs in, stores the user on the client reducer, and remembers the
// token in localStorage when the user opted in.
export const login = (email, password, rememberMe) => (dispatch) => {
  return api.post('/login', { email, password }).then(({ data }) => {
    dispatch(setUser(data))
    if (rememberMe) localStorage.setItem('token', data.token)
    return data
  })
}
