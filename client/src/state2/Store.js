import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers/index'
export const Store = createStore(Reducers, {}, applyMiddleware(thunk))
//createStore(Reducers,{Intial State},applyMiddleware(thunk))
