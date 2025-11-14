import { AddMessage } from "@/store/messageListSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function useListCart(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage: (message: string) => void) {
    const dispatch = useDispatch()
    function addToCartCleanup(){
        setLoading(false)
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
        setTimeout(()=>{
            setShowOptions(true)
        },1000)
    }

    function CartList(){
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Let's Checkout`]}
        dispatch(AddMessage(newMessage))
        setShowOptions(false)
        const newFeedBack = {type:"cart-list-feedback",next:addToCartCleanup, sender:"bot",content:['']}
        dispatch(AddMessage(newFeedBack))
    }
    return CartList
}
