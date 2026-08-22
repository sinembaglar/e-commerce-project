import { combineReducers } from 'redux'
import client from './clientReducer'
import product from './productReducer'
import shoppingCart from './shoppingCartReducer'

const rootReducer = combineReducers({ client, product, shoppingCart })

export default rootReducer
