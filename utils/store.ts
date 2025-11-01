import storage from 'redux-persist/lib/storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import userReducer from '../store/userSlice'
import currentFoodReducer from '../store/currentFoodSlice'
import currentCartReducer from "../store/currentCartItem"
import cartDelReducer from "../store/cartDeleteSlice";
import orderCartListReducer from "../store/OrderCartList"
import newOrderReducer from "../store/newOrderSlice"
import pendingOrderReducer from "../store/pendingOrderSlice"


const persistConfig = {
    key:'root',
    version:1,
    storage,
    whitelist:['user','pendingOrders']
}

const reducer = combineReducers({
    user:userReducer,
    food:currentFoodReducer,
    cart: currentCartReducer,
    cartDel:cartDelReducer,
    orderList:orderCartListReducer,
    newOrder:newOrderReducer,
    pendingOrders:pendingOrderReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
