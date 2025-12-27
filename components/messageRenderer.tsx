import { messageListType } from '@/types/type'
import React, { memo } from 'react'
import BotMessage from './message/BotMessage'
import CartFeedBack from './message/CartFeedBack'
import ChatMessage from './message/ChatMessage'
import CheckoutList from './message/CheckoutList'
import CustomisationList from './message/CustomisationList'
import FoodCarousel from './message/FoodCarousel'
import NumberInput from './message/NumberInput'
import OrderFeedback from './message/orderFeedback'
import ReceiptCarousel from './message/ReceiptCarousel'
import SubCarousel from './message/SubCarousel'
import UserInfoInput from './message/UserInfoInput'

interface propType{
    chatItem:messageListType;
    isLast:boolean;
    context: {
        getCategory: (food: string) => void;
        getSomethingElseMessage: (message: string) => void;
        CartList: () => void;
        addToCart: (foodName: string) => void;
        isAdding: React.RefObject<boolean>;
        comfirmToCart: (value: number) => void;
        fetchFoodList: (endpoint: string, expression: string) => Promise<void>;
        setOptions: React.Dispatch<React.SetStateAction<{
            name: string;
            onClick: () => void;
        }[]>>;
        setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
        setLoading: React.Dispatch<React.SetStateAction<boolean>>;
        loading: boolean;
    }
}

 const MessageRenderer = memo(
    function MessageRenderer(props:propType) {
        const {chatItem,context,isLast} = props
        const {getSomethingElseMessage,addToCart,isAdding,comfirmToCart,fetchFoodList,setOptions,setShowOptions,loading,setLoading} = context

        switch (chatItem.type){
            case "message":
                return chatItem.sender==="user"?
                    <ChatMessage message={chatItem}/>:
                    <BotMessage message={chatItem}/>;
            case "subcarousel":
                return <SubCarousel message={chatItem} fetchFoodList={fetchFoodList}/>;
            case "number-input":
                return <NumberInput message={chatItem} confirm={comfirmToCart} />;
            case "cart-feedback":
                return <CartFeedBack message={chatItem} isAdding={isAdding}/>
            case "order-feedback":
                return <OrderFeedback setShowOptions={setShowOptions} setOptions={setOptions}  getSomethingElseMessage = {getSomethingElseMessage}/>
            case "cart-list-feedback":
                return <CheckoutList isLast={isLast} message={chatItem} setShowOptions={setShowOptions} setOptions={setOptions} getSomethingElseMessage = {getSomethingElseMessage}/>;
            case "edit-list":
                return <CustomisationList message={chatItem} addToCart = {addToCart} />;
            case "enter-info":
                return <UserInfoInput isLast={isLast} setOptions={setOptions} setShowOptions={setShowOptions} getSomethingElseMessage={getSomethingElseMessage} />;
            case "food-list":
                return <FoodCarousel setShowOptions={setShowOptions} setLoading={setLoading} message={chatItem} loading={loading} />;
            case "receipt-list":
                return <ReceiptCarousel isLast={isLast} setLoading={setLoading} setShowOptions={setShowOptions} />
            default:
                return null   
        } 
}) 


export default MessageRenderer