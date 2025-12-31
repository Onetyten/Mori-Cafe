import useOptionCount from "@/hooks/useOptionCount";
import { messageListType } from "@/types/messageTypes";
import React, { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import Swiper from "react-native-swiper";
import FoodCard from "../../FoodCard";
import { Styles } from "./style";

interface propType{
    message:messageListType
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean
}

const FoodCarousel = memo(function FoodCarousel(props:propType) {
    const {message,setLoading,setShowOptions,loading} = props
    const optionCount = useOptionCount(setShowOptions,setLoading,loading)
    console.log(message)

    if (message.type !== "food-list") return

      if (message.content.length===0){
        if (message.fetched===false){
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
            {message.content.map((item,index) => (
                <View key={item._id}>
                    <FoodCard food={item} onClick={optionCount}/>
                </View>
            ))}
        </Swiper>
        
  )
})


export default FoodCarousel