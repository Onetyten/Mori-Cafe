import { messageListType } from "@/types/messageTypes";
import React, { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import Swiper from "react-native-swiper";
import FoodCard from "../../FoodCard";
import { Styles } from "./style";

interface propType{
    message:messageListType
}

const FoodCarousel = memo(function FoodCarousel(props:propType) {
    const {message} = props
    console.log(message)

    if (message.type !== "foodCarousel") return

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
            {message.content.map((item) => (
                <View key={item._id}>
                    <FoodCard food={item}/>
                </View>
            ))}
        </Swiper>
        
  )
})


export default FoodCarousel