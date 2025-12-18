import useOptionCount from "@/hooks/useOptionCount";
import { AddMessage } from "@/store/messageListSlice";
import { colors } from "@/styles/global";
import { isAxiosError } from "axios";
import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import { useDispatch } from "react-redux";
import type { FoodType, messageListType } from '../../types/type';
import api from "../../utils/api";
import FoodCard from "../FoodCard";

interface propType{
    message:messageListType
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean
}

const FoodCarousel = memo(function FoodCarousel(props:propType) {
    const dispatch = useDispatch()
    const {message,setLoading,setShowOptions,loading} = props
    const optionCount = useOptionCount(setShowOptions,setLoading,loading)
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
                dispatch(AddMessage(newMessage))
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
                <View style={Styles.loaderRow}>
                    <View style={Styles.loaderContainer}>
                        <View style={Styles.loaderBox}>
                            <ActivityIndicator size="large" color="#fff"/> 
                        </View>
                    </View>
                </View>
            )
        }

        else {
            return null
        }        
      }

    return (
        <Swiper autoplay horizontal autoplayTimeout={5} activeDot={<View style={[Styles.dot,Styles.activeDot]} />} dot={<View style={[Styles.dot,Styles.passiveDot]} />} loop showsPagination={true} height={290}>
            {foodList.map((item) => (
                <View key={item._id}>
                    <FoodCard food={item} onClick={optionCount}/>
                </View>
            ))}
        </Swiper>
        
  )
})

const Styles = StyleSheet.create({
    loaderRow:{
        justifyContent:"center",
        alignItems:"center",
        gap:8
    },
    loaderContainer:{
        width:"100%",
        gap:8,
        flexDirection:"row",
        flexWrap:"wrap"
    },
    loaderBox:{
        height:240,
        backgroundColor:colors.light,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        borderRadius:6
    },
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

export default FoodCarousel