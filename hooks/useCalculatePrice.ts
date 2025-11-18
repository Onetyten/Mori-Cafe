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
        const selectInfoTimeoutRef = useRef<number|null>(null);
        const addMessageTimeoutRef = useRef<number|null>(null);
        const setOptionsTimeoutRef = useRef<number|null>(null);

        const selectInfo= useCallback(()=>{
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Enter your delivery information`]};
            dispatch(AddMessage(newMessage));
            
            selectInfoTimeoutRef.current = setTimeout(()=>{
                setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}]);
                const newInput = {type:"enter-info",next:()=>{}, sender:"bot",content:[]};
                dispatch(AddMessage(newInput));
            },1000);
        },[dispatch, getSomethingElseMessage, setOptions]);

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
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Your total is ${orderPrice}`]}
                addMessageTimeoutRef.current = setTimeout(()=>{
                    dispatch(AddMessage(newMessage))  
                },1500)
                
                setOptionsTimeoutRef.current = setTimeout(()=>{
                    setOptions([{name:'Select address', onClick:selectInfo},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
                    setShowOptions(true)
                },1500)
        },[dispatch, getSomethingElseMessage, selectInfo, setOptions, setShowOptions, store])

        useEffect(()=>{
            return()=>{
                if (selectInfoTimeoutRef.current !== null) clearTimeout(selectInfoTimeoutRef.current);
                if (addMessageTimeoutRef.current !== null) clearTimeout(addMessageTimeoutRef.current);
                if (setOptionsTimeoutRef.current !== null) clearTimeout(setOptionsTimeoutRef.current);
            }
        },[])

        return calculateSelectedPrice
}
