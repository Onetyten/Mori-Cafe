import { AddMessage, NewMessage } from "@/store/messageListSlice";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";


export default function useListCart(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage: (message: string) => void) {

    const delay = (ms:number)=>new Promise(resolve=>setTimeout(resolve,ms))

    const dispatch = useDispatch()
    const addToCartCleanup = useCallback(async ()=>{
        setLoading(false)
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
        await delay (1000)
        setShowOptions(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getSomethingElseMessage, setLoading, setOptions, setShowOptions])

    const CartList=useCallback(()=>{
        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`Let's Checkout`]}
        dispatch(AddMessage(newMessage))
        const newFeedBack:NewMessage = {type:"checkoutList",next:addToCartCleanup}
        dispatch(AddMessage(newFeedBack))

    },[addToCartCleanup, dispatch])
    return CartList
}
