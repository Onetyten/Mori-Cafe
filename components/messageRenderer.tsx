import useAddToCart from '@/hooks/useAddToCart'
import useConfirmToCart from '@/hooks/useConfirmToCart'
import useFetchFoodList from '@/hooks/useFetchFoodList'
import useGetElse from '@/hooks/useGetElse'
import useListCart from '@/hooks/useListCart'
import useSubcategory from '@/hooks/useSubcategory'
import { messageListType } from '@/types/type'
import React, { memo, useRef } from 'react'
import BotMessage from './message/BotMessage'
import CartFeedBack from './message/CartFeedBack'
import ChatMessage from './message/ChatMessage'
import CheckoutList from './message/CheckoutList'
import CustomisationList from './message/CustomisationList'
import FoodCarousel from './message/FoodCarousel'
import NumberInput from './message/NumberInput'
import SubCarousel from './message/SubCarousel'
import UserInfoInput from './message/UserInfoInput'
import OrderFeedback from './message/orderFeedback'

interface propType{
    chatItem:messageListType;
    setOptions:React.Dispatch<React.SetStateAction<{name: string;onClick:  () => void;}[]>>;
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>;
    setLoading:React.Dispatch<React.SetStateAction<boolean>>;
    loading:boolean

}

 const MessageRenderer = memo(
    function MessageRenderer(props:propType) {
        const {chatItem,setOptions,setShowOptions,setLoading,loading} = props
        const isAdding = useRef(false)
        const {getCategory} = useSubcategory(setOptions,setShowOptions)
        const getSomethingElseMessage = useGetElse(setShowOptions,setOptions,getCategory)
        const CartList = useListCart(setShowOptions,setLoading,setOptions,getSomethingElseMessage)
        const {addToCart} = useAddToCart(setShowOptions,CartList,getSomethingElseMessage,setLoading,setOptions,isAdding)
        const comfirmToCart = useConfirmToCart(setLoading,setShowOptions,addToCart,setOptions)
        const fetchFoodList = useFetchFoodList(loading,setLoading,setShowOptions,setOptions,getSomethingElseMessage)

        return (
            chatItem.type === "message"?chatItem.sender==="user"?<ChatMessage message={chatItem}/>:<BotMessage message={chatItem}/>
            :chatItem.type === "subcarousel"?<SubCarousel message={chatItem} fetchFoodList={fetchFoodList}  />
            :chatItem.type === "number-input"?<NumberInput message={chatItem} confirm={comfirmToCart} />
            :chatItem.type === "cart-feedback"?<CartFeedBack message={chatItem} isAdding={isAdding}/>
            // :chatItem.type === "order-handle"?<OrderHandler message={chatItem}/>
            :chatItem.type === "order-feedback"?<OrderFeedback setShowOptions={setShowOptions} setOptions={setOptions}  getSomethingElseMessage = {getSomethingElseMessage}/>
            // :chatItem.type === "order-receipt"?<OrderReceipt setMessageList={setMessageList} message={chatItem}/>
            :chatItem.type === "cart-list-feedback"?<CheckoutList message={chatItem} setShowOptions={setShowOptions} setOptions={setOptions} getSomethingElseMessage = {getSomethingElseMessage}/>
            :chatItem.type === "edit-list"?<CustomisationList message={chatItem} addToCart = {addToCart} />
            :chatItem.type === "enter-info"?<UserInfoInput setOptions={setOptions} setShowOptions={setShowOptions} getSomethingElseMessage={getSomethingElseMessage} />
            :chatItem.type === "food-list"?<FoodCarousel setShowOptions={setShowOptions} setLoading={setLoading} message={chatItem} loading={loading} />
            :chatItem.type === "receipt-list"?<ReceiptCarousel key={index} setShowOptions={setShowOptions} setMessageList={setMessageList} setLoading={setLoading} />
            :null
        )
}
 ) 


export default MessageRenderer