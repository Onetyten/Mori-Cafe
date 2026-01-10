import api from '@/utils/api'
import type { RootState } from '@/utils/store'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/userSlice'

const UserCheck = () => {
    const user = useSelector((state:RootState)=>state.user.user)
    const dispatch = useDispatch()
    const hasFetched = useRef(false)
    useEffect(()=>{
        async function createUser() {
            if (hasFetched.current) return
            hasFetched.current = true
            if (user){
              try {
                const response = await api.post('/user/validate',{user})
                if (!response.data.success) return
                dispatch(setUser(response.data.data))
              }
              catch (error) {
                console.error(error)
              }
            }
            else{
              try {
                const response = await api.get('/user/create')
                if (!response.data.success) return
                dispatch(setUser(response.data.data))
              }
              catch (error) {
                console.error(error)
              }
            }
            
        }
        createUser()
    },[dispatch, user])
  return null
}

export default UserCheck