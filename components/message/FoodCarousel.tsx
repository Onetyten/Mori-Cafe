import { colors } from "@/styles/global";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import type { FoodType, messageListType } from '../../types/type';
import api from "../../utils/api";
import FoodCard from "../FoodCard";

interface propType{
    message:messageListType
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    onClick:(food:FoodType)=>void,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
    setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>;
}

export default function FoodCarousel(props:propType) {
    const {message,setLoading,onClick,setShowOptions,setMessageList} = props
    const [foodList,setFoodList] = useState<FoodType[]>([])
    const [fetched,setFetched] = useState(false)

    useEffect(()=>{
        if (fetched) return
        async function getFoodList() {
           try {
                setShowOptions(false)
                const response = await api.get(message.content[0])
                if (response.data.success === false) return
                setFoodList(response.data.data)
                message.next()
           }
           catch (error) {
            if (isAxiosError(error)){
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[error.response?.data.message||"No food found"]}
                setMessageList((prev)=>[...prev, newMessage ])
                message.next()
            }
           }
           finally{
            setFetched(true)
            setLoading(false)
            setShowOptions(true)
           }
        }
        getFoodList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message.content[0]])
    

      if (foodList.length===0){
        if (fetched===false){
            return(
            <View className="flex flex-col justify-center items-center gap-2">
                <View className="w-full gap-2 flex-row flex-wrap">
                    <View className="bg-muted/40 flex justify-center items-center w-[48%] h-60 rounded-md">
                        <ActivityIndicator size="large" color={colors.muted}/> 
                    </View>
                    <View className="bg-muted/40 flex justify-center items-center w-[48%] h-60 rounded-md">
                        <ActivityIndicator size="large" color={colors.muted}/> 
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
        <Swiper autoplay horizontal autoplayTimeout={2} activeDot={<View style={[Styles.dot,Styles.activeDot]} />} dot={<View style={[Styles.dot,Styles.passiveDot]} />} loop showsPagination={true} height={290}>
            {foodList.map((item) => (
                <View key={item._id}>
                    <FoodCard food={item} onClick={onClick}/>
                </View>
            ))}
        </Swiper>
        
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

