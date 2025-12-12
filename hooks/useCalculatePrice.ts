import { AddMessage } from '@/store/messageListSlice';
import React, { useCallback, useEffect, useRef } from 'react';
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
        
        const selectInfo= useCallback(()=>{
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Enter your delivery information`]};
            dispatch(AddMessage(newMessage));
            setShowOptions(false)
            timers.current.push(
                setTimeout(()=>{
                    setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}]);
                    const newInput = {type:"enter-info",next:()=>{}, sender:"bot",content:[]};
                    dispatch(AddMessage(newInput));
                },1000)
            );
        },[dispatch, getSomethingElseMessage, setOptions, setShowOptions]);

        const calculateSelectedPrice= useCallback(()=>
            {
                const cart = store.getState().orderList.orderList
                const OrderPayload = {
                    name:"",
                    address:"",
                    email:"",
                    phone_number:"",
                    items:cart
                }
                dispatch(setOrder(OrderPayload))
                setShowOptions(false)
                const orderPrice = cart.reduce((sum,delta)=>sum+(delta.totalPrice*delta.quantity),0)
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Your total is ₦${orderPrice}`]}
                timers.current.push(setTimeout(()=>{
                    dispatch(AddMessage(newMessage))  
                },1500))
                
                timers.current.push(setTimeout(()=>{
                    setOptions([{name:'Select address', onClick:selectInfo},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
                    setShowOptions(true)
                },1500))
        },[dispatch, getSomethingElseMessage, selectInfo, setOptions, setShowOptions, store])

        useEffect(()=>{
            return()=>{
                timers.current.forEach(clearTimeout)
                timers.current = []
            }
        },[])

        return calculateSelectedPrice
}
