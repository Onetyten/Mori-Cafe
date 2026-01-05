 
import { AddMessage, NewMessage } from "@/store/messageListSlice"
import api from "@/utils/api"
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { usePaystack } from "react-native-paystack-webview"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../utils/store"
import BotImage from "./chat Bubble/BotImage"
import BotLoader from "./chat Bubble/BotLoader"

interface propTypes{
    setOptions: React.Dispatch<React.SetStateAction<{
        name: string;
        onClick: () => void;
    }[]>>,
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
    getSomethingElseMessage: (message: string) => void
}

export default function OrderFeedback(props:propTypes) {

    
  return (
    <View style={{flexDirection:"row",gap:8,alignItems:"flex-start"}}>
        <BotImage sender="bot"/>
        <BotLoader />
    </View>
  )
}