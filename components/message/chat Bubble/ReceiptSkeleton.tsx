import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const ReceiptSkeleton = () => {
  return (
    <View style={style.parent}>        
        <View style={style.container}>
            <Image source={require("@/assets/images/logo.png")} style={[StyleSheet.absoluteFill,style.backgroundImage]}/>
            <View style={style.bodyContainer}/>
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
        maxWidth:"100%",
        backgroundColor:"#fff",
        position:"relative",
        justifyContent:"center",
    },
    backgroundImage:{
        width:"100%",
        height:"100%",
        opacity:0.15
    },
    bodyContainer:{
        padding:20,
        width:"100%",
        position:"relative",
        justifyContent:"center",
        alignItems:"center",
        gap:16
    },
})