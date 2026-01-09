import { AddMessage, NewMessage } from "@/store/messageListSlice";
import { RootState } from "@/utils/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


export default function useListCart(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage: (message: string) => void) {
    const messageList = useSelector((state:RootState)=>state.messageList.messageList)

    const delay = (ms:number)=>new Promise(resolve=>setTimeout(resolve,ms))
    const dispatch = useDispatch()
    

    const CartList=async()=>{
        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:["Let's Checkout"]}
        dispatch(AddMessage(newMessage))
        await delay (20)
        const newFeedBack:NewMessage = {type:"checkoutList"}
        dispatch(AddMessage(newFeedBack))
        await delay (200)

    }

    return CartList
}
