import { messageListType, subCategories } from '@/types/messageTypes';
import React, { memo } from 'react';
import BotMessage from './message/BotMessage';
import CartFeedBack from './message/CartFeedBack';
import ChatMessage from './message/ChatMessage';
import CheckoutList from './message/CheckoutList';
import CustomisationList from './message/CustomisationList';
import FoodCarousel from './message/FoodCarousel/FoodCarousel';
import NumberInput from './message/NumberInput/NumberInput';
import SubCarousel from './message/SubCarousel/SubCarousel';

interface propType{
    chatItem:messageListType;
    isLast:boolean;
    context:{
        getCategory: (food: subCategories) => void;
        getSomethingElseMessage: (message: string) => void;
        CartList: () => void;
        addToCart: () => void;
        isAdding: React.RefObject<boolean>;
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
        const {chatItem,context} = props
        const {addToCart,fetchFoodList} = context

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
            // case "order-feedback":
            //     return <OrderFeedback setShowOptions={setShowOptions} setOptions={setOptions}  getSomethingElseMessage = {getSomethingElseMessage}/>
            case "checkoutList":
                return <CheckoutList message={chatItem}/>;
            case "editList":
                return <CustomisationList message={chatItem} addToCart = {addToCart} />;
            // case "enterInfo":
            //     return <UserInfoInput isLast={isLast} setOptions={setOptions} setShowOptions={setShowOptions} getSomethingElseMessage={getSomethingElseMessage} />;
            case "foodCarousel":
                return <FoodCarousel message={chatItem}/>;
            // case "receipt-list":
            //     return <ReceiptCarousel isLast={isLast} setLoading={setLoading} setShowOptions={setShowOptions} />
            default:
                return null   
        } 
}) 


export default MessageRenderer