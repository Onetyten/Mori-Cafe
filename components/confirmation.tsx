import api from '@/utils/api'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearDeleteCartItem } from '../store/cartDeleteSlice'
import { deleteOrder } from '../store/OrderCartList'
import type { RootState } from '../utils/store'

export default function Comfirmation() {
    const deletedItem = useSelector((state:RootState)=>state.cartDel.cartDel)
    const dispatch = useDispatch()

    async function handleDelete() {
        if (!deletedItem) return
        const itemId = deletedItem._id
        dispatch(deleteOrder(deletedItem._id))
        dispatch(clearDeleteCartItem())
        await api.delete(`/order/cart/delete/${itemId}`)
        return
    }

  return (
    deletedItem&&
    <View className='absolute w-full h-screen justify-center items-center z-70 bg-secondary-300/20'>
        <View className='bg-white gap-4 justify-center items-center rounded-md' style={{width:"80%",padding:28}}>
            <Text className='text-center text-secondary-100 font-outfit-regular mb-12 w-full text-3xl'>
                Are you sure you want to remove {deletedItem.foodId.name} from your tab
            </Text>
            
            <TouchableOpacity onPress={()=>{dispatch(clearDeleteCartItem())}}
                className="rounded-sm w-full border-2 border-secondary-100 flex justify-center p-4 items-center">
                <Text className='text-2xl text-secondary-100'>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}
                className="rounded-sm w-full bg-red-500 border-2 border-red-500 flex justify-center p-4 items-center">
                <Text className='text-2xl text-white'>Yes</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}