import { colors } from "@/styles/global";
import { messageListType } from "@/types/messageTypes";
import React from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import HistoryReceipt from "./chat Bubble/HistoryReceipt";
import ReceiptSkeleton from "./chat Bubble/ReceiptSkeleton";

interface propType{
    message:messageListType
}

export default function ReceiptCarousel(props:propType) {
    const {message} = props

    if (message.type !== "receiptList") return

    if (!message.showReceipt){
            return(
                <ReceiptSkeleton loaded={message.fetched}/>
            )      
    }
    if (message.showReceipt && message.fetched&&message.content.length===0) return null

  return (
    <View className="flex flex-col justify-center items-center gap-2">
            <Swiper horizontal activeDot={<View style={[Styles.dot,Styles.activeDot]} />} dot={<View style={[Styles.dot,Styles.passiveDot]} />} loop showsPagination={true} height={490}>
                {message.content.map((item) => (
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