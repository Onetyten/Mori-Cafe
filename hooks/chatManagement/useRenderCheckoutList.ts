import { AddMessage, NewMessage, updateMessage } from "@/store/messageListSlice"
import { setOrderList } from "@/store/OrderCartList"
import { messageListType } from "@/types/messageTypes"
import api from "@/utils/api"
import { isAxiosError } from "axios"
import React from "react"
import { useDispatch } from "react-redux"
import useCalculatePrice from "../useCalculatePrice"


export function useRenderCheckoutList(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,getSomethingElseMessage: (message: string, item?: messageListType | undefined) => void,setOptions: React.Dispatch<React.SetStateAction<{ name: string; onClick: () => void }[]>>,loading: boolean,setLoading: React.Dispatch<React.SetStateAction<boolean>>) {

    const dispatch = useDispatch()
    const delay = (ms:number)=> new Promise(resolve=>setTimeout(resolve,ms))
    const calculateSelectedPrice = useCalculatePrice(getSomethingElseMessage,setShowOptions,setOptions)


    const checkOutListSuccess=async(message:messageListType) => {
        await delay(200)
        setOptions([...[
            { name: 'Checkout', onClick: ()=>calculateSelectedPrice(message) },
            { name: 'Continue shopping', onClick: () => getSomethingElseMessage("Let's continue",message) }
        ]]);
        setShowOptions(true)
    }
    
    function checkOutListCleared(message:messageListType){
        setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue",message)}])
    }

    
    async function renderCheckoutList(message:messageListType){
        if (message.type !== "checkoutList" || loading) return
        setLoading(true)
        setShowOptions(false)
        let feedBack = ""
        function final (){
            const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:["Your tab is empty."]}
            dispatch(AddMessage(newMessage))
            setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue",message)}])
        }

        dispatch(updateMessage({id:message.id,update:{final}}))

        try {            
            const response = await api.get('/order/cart/fetch')
            const items = response.data?.data || []
            if (items.length===0){
               feedBack=  "Your tab is empty."
               checkOutListCleared(message)
            }
            dispatch(setOrderList(items))
            checkOutListSuccess(message)
        }
        catch (error) {
            console.error(error)
            setShowOptions(true)
            if (isAxiosError(error)){
                feedBack = error.response?.data.message
            }
            feedBack = `Error getting your tab, please try again`
        }
        finally{
            if (message.type !== "checkoutList") return
            // if (message.next) message.next()
            if (feedBack.length>0){
                const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[feedBack]}
                dispatch(AddMessage(newMessage))
            }
            dispatch(updateMessage({id:message.id,update:{fetched:true}}))
            setLoading(false)
        }
    }

    return {renderCheckoutList}
}
