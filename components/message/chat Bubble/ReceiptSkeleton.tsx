import { MotiView } from "moti"
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface propType{
    loaded:boolean
}

const ReceiptSkeleton = ({loaded}:propType) => {
  return (
    <View style={style.parent}>        
        <View style={style.container}>
            <MotiView from={{width:80,height:80,opacity:0.5,scale:1}} animate={loaded?{width: 500, height: 500, opacity: 0.15, scale: 1,}: {width: 80, height: 80, opacity: 0.8, scale: 1.2}} transition={{type:"timing",duration:800, loop:!loaded,repeatReverse:true}}>
                <Image source={require("@/assets/images/logo.png")} style={[style.backgroundImage]}/>   
            </MotiView>
        </View>
    </View>
  )
}
export default ReceiptSkeleton


const style = StyleSheet.create({
    parent:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        height:490
    },
    container:{
        width:300,
        height:"100%",
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center"
    },

    backgroundImage:{
        width:"100%",
        height:"100%",
        
    },
})