import api from '../../api/axios'

export const SET_CATEGORIES = 'product/setCategories'
export const SET_PRODUCT_LIST = 'product/setProductList'
export const SET_TOTAL = 'product/setTotal'
export const SET_FETCH_STATE = 'product/setFetchState'
export const SET_LIMIT = 'product/setLimit'
export const SET_OFFSET = 'product/setOffset'
export const SET_FILTER = 'product/setFilter'
export const SET_SORT = 'product/setSort'

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories })
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList })
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total })
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState })
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit })
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset })
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter })
export const setSort = (sort) => ({ type: SET_SORT, payload: sort })

// Thunk: fetches all categories and stores them.
export const fetchCategories = () => (dispatch) => {
  return api.get('/categories').then(({ data }) => {
    dispatch(setCategories(data))
  })
}

// Thunk: fetches products and stores them, tracking loading state so the UI
// can show a spinner. category/filter/sort/limit/offset are optional query
// parameters - only the ones that have a value are sent.
export const fetchProducts = ({ category, filter, sort, limit, offset } = {}) => (dispatch) => {
  dispatch(setFetchState('FETCHING'))

  const queryParts = []
  if (category) queryParts.push(`category=${category}`)
  if (filter) queryParts.push(`filter=${encodeURIComponent(filter)}`)
  if (sort) queryParts.push(`sort=${sort}`)
  if (limit) queryParts.push(`limit=${limit}`)
  if (offset) queryParts.push(`offset=${offset}`)
  const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : ''

  return api
    .get(`/products${query}`)
    .then(({ data }) => {
      dispatch(setTotal(data.total))
      dispatch(setProductList(data.products))
      dispatch(setFetchState('FETCHED'))
    })
    .catch(() => {
      dispatch(setFetchState('FAILED'))
    })
}
