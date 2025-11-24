import { colors, GlobalStyle } from "@/styles/global"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { FoodType } from "../types/type"

interface propType{
    food:FoodType
    onClick:(food:FoodType)=>void
}

export default function FoodCard(props:propType) {
    const {food,onClick} = props
    const optimisedUrl =(w:number,h:number)=>{
        return food.imageUrl.replace('/upload',`/upload/w_${w},h_${h},c_fill,f_auto,q_auto`)
    }
    
  return (
    <View style={{width:"100%",alignItems:"center"}}>
        <TouchableOpacity style={Styles.parent} onPress={()=>{onClick(food)}}>
            <Image source={require("../assets/images/patterns/grid.webp")} resizeMode="repeat" style={[StyleSheet.absoluteFill,{width:"100%",height:"100%",opacity:0.1}]}/>

            <View style={Styles.priceView}>
                <Text style={[Styles.priceText,GlobalStyle.Outfit_Bold_body]}>&#8358;{food.price}</Text>
            </View>
            <View style={{width:"100%", height:"100%",padding:16,justifyContent:"space-between",alignItems:"center"}}>
                <View style={Styles.foodImageView}>
                    <Image source={{uri:optimisedUrl(300,300)}} style={{objectFit:"contain",borderRadius:9999,width:140,height:140}} className="size-32 flex-1 object-contain rounded-full" />
                </View>
                <View style={{gap:2,width:"100%"}}>
                    <View>
                        <Text style={[GlobalStyle.Outfit_Bold_button,Styles.nameText]}>{food.name}</Text>
                    </View>
                    <View className=" text-primary flex justify-center items-center">
                        <Text style={[GlobalStyle.Outfit_Bold_small,Styles.calText]}>{food.calories} cal</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </View>

  )
}

const Styles = StyleSheet.create({
    nameText:{
        color:"#fff",
        textAlign:"center",
        textTransform:"capitalize"
    },
    calText:{
        color:colors.primary,
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
        // padding:12,
        height:240,
        gap:4,
        backgroundColor:"#a2b18a",
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
        fontSize:20,
        lineHeight:28,
        fontFamily:"Outfit_Bold",
        color:"#fff"

    },

})