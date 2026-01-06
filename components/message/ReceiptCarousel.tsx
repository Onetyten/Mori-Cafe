import { AddMessage, NewMessage } from "@/store/messageListSlice";
import { colors } from "@/styles/global";
import { isAxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import { useDispatch } from "react-redux";
import type { FetchedOrderType } from '../../types/type';
import api from "../../utils/api";
import HistoryReceipt from "./chat Bubble/HistoryReceipt";
import ReceiptSkeleton from "./chat Bubble/ReceiptSkeleton";

interface propType{
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
    isLast:boolean
}

export default function ReceiptCarousel(props:propType) {
    const {setShowOptions,isLast} = props
    const [orderList,setOrderList] = useState<FetchedOrderType[]>([])
    const fetched = useRef(false)
    const [loaded,setLoaded] = useState(false)
    const dispatch = useDispatch()
    const delay = (ms:number)=> new Promise(resolve=>setTimeout(resolve,ms))
    
    useEffect(()=>{
        if (fetched.current) return
        async function getOrderList() {
           try {
                setShowOptions(false)
                const response = await api.post('/order/fetch/?limit=10')
                if (response.data.success===false){
                    const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:["No history found"]}
                    dispatch(AddMessage(newMessage))
                    return
                }
                setLoaded(true)
                await delay(400)
                setOrderList(response.data.data)
           }
           catch (error) {
                if (!isAxiosError(error)) return
                setLoaded(true)
                await delay(400)
                const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[error.response?.data.message||"No history found"]}
                dispatch(AddMessage(newMessage))
           }
           finally {
                fetched.current = true
                setShowOptions(true)
           }
        }
        getOrderList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if (!isLast) return null


    if (orderList.length===0){
        if (fetched.current===false){
            return(
                <ReceiptSkeleton loaded={loaded}/>
            )
        }
        else{
            return null
        }        
    }



  return (
    <View className="flex flex-col justify-center items-center gap-2">
            <Swiper horizontal activeDot={<View style={[Styles.dot,Styles.activeDot]} />} dot={<View style={[Styles.dot,Styles.passiveDot]} />} loop showsPagination={true} height={490}>
                {orderList.map((item) => (
                    <View key={item._id}>
                         <HistoryReceipt order={item}/>
                    </View>
                ))}
            </Swiper>
    </View>
  )
}




const Styles = StyleSheet.create({
    passiveDot:{
        backgroundColor:"#a2b18a60",
    },
    activeDot:{
        backgroundColor:colors.primary,
    },
    dot:{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    }
})