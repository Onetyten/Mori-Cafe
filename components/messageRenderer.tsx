import { messageListType, subCategories } from '@/types/messageTypes';
import React, { memo } from 'react';
import BotMessage from './message/BotMessage';
import ChatMessage from './message/ChatMessage';
import FoodCarousel from './message/FoodCarousel/FoodCarousel';
import NumberInput from './message/NumberInput/NumberInput';
import SubCarousel from './message/SubCarousel/SubCarousel';

interface propType{
    chatItem:messageListType;
    isLast:boolean;
    context: {
        getCategory: (food: subCategories) => void;
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
        const {chatItem,context} = props
        const {getSomethingElseMessage,addToCart,isAdding,comfirmToCart,fetchFoodList,setOptions,setShowOptions,loading,setLoading} = context

        switch (chatItem.type){
            case "message":
                return chatItem.sender==="user"?
                    <ChatMessage message={chatItem}/>:
                    <BotMessage message={chatItem}/>;
            case "subcarousel":
                return <SubCarousel message={chatItem} fetchFoodList={fetchFoodList}/>;
            case "numberInput":
                return <NumberInput message={chatItem} confirm={comfirmToCart} />;
            // case "cart-feedback":
            //     return <CartFeedBack message={chatItem} isAdding={isAdding}/>
            // case "order-feedback":
            //     return <OrderFeedback setShowOptions={setShowOptions} setOptions={setOptions}  getSomethingElseMessage = {getSomethingElseMessage}/>
            // case "cart-list-feedback":
            //     return <CheckoutList isLast={isLast} message={chatItem} setShowOptions={setShowOptions} setOptions={setOptions} getSomethingElseMessage = {getSomethingElseMessage}/>;
            // case "edit-list":
            //     return <CustomisationList message={chatItem} addToCart = {addToCart} />;
            // case "enter-info":
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