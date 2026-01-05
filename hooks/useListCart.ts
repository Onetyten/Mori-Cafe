import { AddMessage, NewMessage } from "@/store/messageListSlice";
import { RootState } from "@/utils/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


export default function useListCart(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage: (message: string) => void) {
    const messageList = useSelector((state:RootState)=>state.messageList.messageList)

    const delay = (ms:number)=>new Promise(resolve=>setTimeout(resolve,ms))
    const dispatch = useDispatch()
    

    const addToCartCleanup = async()=>{
        setLoading(false)
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
        await delay (500)
        setShowOptions(true)
    }

    const CartList=async()=>{
        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:["Let's Checkout"]}
        dispatch(AddMessage(newMessage))
        await delay (20)
        const newFeedBack:NewMessage = {type:"checkoutList",next:addToCartCleanup}
        dispatch(AddMessage(newFeedBack))
        await delay (200)
        console.log("add message",messageList)
    }

    return CartList
}
