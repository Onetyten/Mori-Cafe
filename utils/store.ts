import messageListReducer from '@/store/messageListSlice'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import cartDelReducer from "../store/cartDeleteSlice"
import currentCartReducer from "../store/currentCartItem"
import currentFoodReducer from '../store/currentFoodSlice'
import newOrderReducer from "../store/newOrderSlice"
import orderCartListReducer from "../store/OrderCartList"
import pendingOrderReducer from "../store/pendingOrderSlice"
import userReducer from '../store/userSlice'

const persistConfig = {
    key:'root',
    version:1,
    storage:AsyncStorage,
    whitelist:['user','pendingOrders']
}

const reducer = combineReducers({
    messageList:messageListReducer,
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
