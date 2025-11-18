import { AddMessage } from "@/store/messageListSlice";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export default function useListCart(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage: (message: string) => void) {
    const dispatch = useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);

    const addToCartCleanup = useCallback(()=>{
        setLoading(false)
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
        timers.current.push(setTimeout(()=>{
            setShowOptions(true)
        },1000))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getSomethingElseMessage, setLoading, setOptions, setShowOptions])

    const CartList=useCallback(()=>{
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Let's Checkout`]}
        dispatch(AddMessage(newMessage))
        setShowOptions(false)
        const newFeedBack = {type:"cart-list-feedback",next:addToCartCleanup, sender:"bot",content:['']}
        dispatch(AddMessage(newFeedBack))
    },[addToCartCleanup, dispatch, setShowOptions])

    return CartList
}
