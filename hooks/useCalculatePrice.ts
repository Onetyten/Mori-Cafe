import { AddMessage, NewMessage, removeMessage } from '@/store/messageListSlice';
import { messageListType } from '@/types/messageTypes';
import React, { useCallback, useRef } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { setOrder } from '../store/newOrderSlice';
import type { RootState } from '../utils/store';

export default function useCalculatePrice(
    getSomethingElseMessage:(message: string) => void,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>)
    {
        const dispatch = useDispatch();
        const store = useStore<RootState>();
        const timers = useRef<ReturnType<typeof setTimeout>[]>([])
        const delay = (ms:number)=> new Promise(resolve=>setTimeout(resolve,ms))
        
        const selectInfo= useCallback(()=>{
            const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Enter your delivery information`]};
            dispatch(AddMessage(newMessage));
            setShowOptions(false)
            timers.current.push(
                setTimeout(()=>{
                    setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}]);
                    const newInput:NewMessage = {type:"enterInfo",next:()=>{}};
                    dispatch(AddMessage(newInput));
                },1000)
            );

        },[dispatch, getSomethingElseMessage, setOptions, setShowOptions]);


        const calculateSelectedPrice= useCallback(async (message:messageListType)=>
            {
                if (message.type !== "checkoutList" ) return
            
                const cart = store.getState().orderList.orderList
                const OrderPayload = {
                    name:"",
                    address:"",
                    email:"",
                    phone_number:"",
                    items:cart
                }
                
                dispatch(removeMessage(message.id))

                const orderMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`Ordering ${cart.filter((item) => item && item.foodId).map(item => `${item.quantity} ${item.foodId.name}`).join(", ")}.`]}
                dispatch(AddMessage(orderMessage))

                dispatch(setOrder(OrderPayload))
                setShowOptions(false)
                const orderPrice = cart.reduce((sum,delta)=>sum+(delta.totalPrice*delta.quantity),0)
                const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Your total is ₦${orderPrice}`]}
                
                await delay(500)
                dispatch(AddMessage(newMessage))
                
                await delay(500)
                setOptions([{name:'Select address', onClick:selectInfo},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
                
                setShowOptions(true)

        },[dispatch, getSomethingElseMessage, selectInfo, setOptions, setShowOptions, store])

        return calculateSelectedPrice
}
