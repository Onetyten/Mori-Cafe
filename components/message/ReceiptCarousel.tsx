import { AddMessage } from "@/store/messageListSlice";
import { colors } from "@/styles/global";
import { isAxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import { useDispatch } from "react-redux";
import type { FetchedOrderType } from '../../types/type';
import api from "../../utils/api";
import HistoryReceipt from "./chat Bubble/HistoryReceipt";

interface propType{
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ReceiptCarousel(props:propType) {
    const {setShowOptions} = props
    const [orderList,setOrderList] = useState<FetchedOrderType[]>([])
    const fetched = useRef(false)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (fetched.current) return
        async function getOrderList() {
           try {
                setShowOptions(false)
                const response = await api.post('/order/fetch')
                if (response.data.success===false){
                    const newMessage = {type:"message",next:()=>{}, sender:"bot",content:["No history found"]}
                    dispatch(AddMessage(newMessage))
                    return
                }
                setOrderList(response.data.data)
           }
           catch (error) {
                if (!isAxiosError(error)) return
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[error.response?.data.message||"No history found"]}
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


    if (orderList.length===0){
        if (fetched.current===false){
            return(
            <View className="flex flex-col justify-center items-center gap-2">
                <View className="w-full gap-2 grid grid-cols-1">
                    <View className="bg-muted/40 hidden sm:flex justify-center items-center w-[400px] max-w-full h-60 rounded-md">
                        <ActivityIndicator/>
                    </View>
                </View>
            </View>
            )
        }
        else{
            return null
        }        
    }


  return (
    <View className="flex flex-col justify-center items-center gap-2">
            <Swiper horizontal activeDot={<View style={[Styles.dot,Styles.activeDot]} />} dot={<View style={[Styles.dot,Styles.passiveDot]} />} loop showsPagination={true} height={500}>
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