import axios from 'axios';
import store from './store';

// @ts-ignore
const baseURL = "http://localhost:4500";
const api = axios.create({
    baseURL
})

api.interceptors.request.use((config)=>{
    const state = store.getState()
    const userId = state.user.user
    if (userId){
        config.headers.Authorization = `Bearer ${userId}`
    }
    return config
})

export default api