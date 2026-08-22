export const SET_CATEGORIES = 'product/setCategories'
export const SET_PRODUCT_LIST = 'product/setProductList'
export const SET_TOTAL = 'product/setTotal'
export const SET_FETCH_STATE = 'product/setFetchState'
export const SET_LIMIT = 'product/setLimit'
export const SET_OFFSET = 'product/setOffset'
export const SET_FILTER = 'product/setFilter'

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories })
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList })
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total })
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState })
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit })
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset })
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter })
