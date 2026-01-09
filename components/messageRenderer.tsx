import { messageListType } from '@/types/messageTypes';
import React, { memo } from 'react';
import BotMessage from './message/BotMessage';
import CartFeedBack from './message/CartFeedBack';
import ChatMessage from './message/ChatMessage';
import CheckoutList from './message/CheckoutList';
import CustomisationList from './message/CustomisationList';
import FoodCarousel from './message/FoodCarousel/FoodCarousel';
import NumberInput from './message/NumberInput/NumberInput';
import ReceiptCarousel from './message/ReceiptCarousel';
import SubCarousel from './message/SubCarousel/SubCarousel';
import UserInfoInput from './message/UserInfoInput';

interface propType{
    chatItem:messageListType;
    isLast:boolean;
    context:{
        addToCart: () => void;
        fetchFoodList: (endpoint: string, expression: string) => Promise<void>;
        setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    }
}

 const MessageRenderer = memo(
    function MessageRenderer(props:propType) {
        const {chatItem,context} = props
        const {addToCart,fetchFoodList,setShowOptions} = context

        switch (chatItem.type){
            case "message":
                return chatItem.sender==="user"?
                    <ChatMessage message={chatItem}/>:
                    <BotMessage message={chatItem}/>;
            case "subcarousel":
                return <SubCarousel message={chatItem} fetchFoodList={fetchFoodList}/>;
            case "numberInput":
                return <NumberInput message={chatItem} />;
            case "cartFeedback":
                return <CartFeedBack/>
            case "checkoutList":
                return <CheckoutList message={chatItem}/>;
            case "editList":
                return <CustomisationList message={chatItem} addToCart = {addToCart} />;
            case "enterInfo":
                return <UserInfoInput setShowOptions={setShowOptions} message={chatItem} />;
            case "foodCarousel":
                return <FoodCarousel message={chatItem}/>;
            case "receiptList":
                return <ReceiptCarousel message={chatItem} />
            default:
                return null   
        } 
}) 


export default MessageRenderer