import { AddMessage, NewMessage } from "@/store/messageListSlice"
import { colors, GlobalStyle } from "@/styles/global"
import { MotiImage } from "moti"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import type { FoodType } from "../types/type"

interface propType{
    food:FoodType
}

export default function FoodCard(props:propType) {
    const dispatch = useDispatch()
    const {food} = props
    const optimisedUrl =(w:number,h:number)=>{
        return food.imageUrl.replace('/upload',`/upload/w_${w},h_${h},c_fill,f_auto,q_auto`)
    }

    function optionCount(){
        const newInput:NewMessage = {type:"numberCountTrigger",food}
        dispatch(AddMessage(newInput))
    }
    
    
  return (
    <View style={{width:"100%",alignItems:"center"}}>
        <TouchableOpacity style={Styles.parent} onPress = {optionCount} >
            <Image source={require("../assets/images/patterns/hex.webp")} style={[StyleSheet.absoluteFill,{width:"100%",height:"100%"}]}/>

            <View style={Styles.priceView}>
                <Text style={[Styles.priceText,GlobalStyle.Outfit_Bold_body]}>&#8358;{food.price}</Text>
            </View>
            <View style={{width:"100%", height:"100%",padding:16,justifyContent:"space-between",alignItems:"center"}}>
                <View style={Styles.foodImageView}>
                    <MotiImage from={{translateY:-15}} animate={{translateY:0}} transition={{delay:200}}  source={{uri:optimisedUrl(300,300)}} style={{objectFit:"contain",borderRadius:9999,width:160,height:160}} />
                </View>
                <View style={{gap:2,width:"100%"}}>
                    <View>
                        <Text style={[GlobalStyle.Outfit_Bold_button,Styles.nameText]}>{food.name}</Text>
                    </View>
                    <View className=" text-primary flex justify-center items-center">
                        <Text style={[GlobalStyle.Outfit_Bold_body,Styles.calText]}>{food.calories} cal</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </View>

  )
}

const Styles = StyleSheet.create({
    nameText:{
        color:colors.secondary,
        textAlign:"center",
        textTransform:"capitalize"
    },
    calText:{
        color:"#fff",
        textAlign:"center",
        textTransform:"capitalize"
    },
    foodImageView:{
        justifyContent:"center",
        alignItems:"center",
        width:128,
        height:128,
        borderRadius:"100%"
    },
    parent:{
        overflow:"hidden",
        borderRadius:10,
        width:"98%",
        height:240,
        gap:4,
        justifyContent:"center",
        alignItems:"center",
    },
    priceView:{
        width:64,
        height:40,
        zIndex:30,
        right:0,
        justifyContent:"center",
        alignItems:"center",
        top:0,
        borderBottomLeftRadius:16,
        position:"absolute",
        backgroundColor:"#395a3f"
    },
    priceText:{
        ...GlobalStyle.Outfit_Bold_body,
        color:"#fff"

    },

})