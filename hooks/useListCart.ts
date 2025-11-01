import React from "react"
import type {messageListType} from '../types/type'

export default function useListCart(setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage: (message: string) => void) {

    function addToCartCleanup(){
        setLoading(false)
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
        setTimeout(()=>{
            setShowOptions(true)
        },1000)
    }

    function CartList(){
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Let's Checkout`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setShowOptions(false)
        const newFeedBack = {type:"cart-list-feedback",next:addToCartCleanup, sender:"bot",content:['']}
        setMessageList((prev)=>[...prev, newFeedBack ])
    }
    return CartList
}
