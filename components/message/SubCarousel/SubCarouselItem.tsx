import { subCategoryType } from '@/types/type'
import { MotiImage } from 'moti'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style'


interface propType{
    fetchFoodList:(endpoint:string,expression: string)=>void,
    index:number,
    item: subCategoryType
}

const SubCarouselItem = ({fetchFoodList,index,item}:propType) => {
    const [loaded,setLoaded] = useState(false)
    const [error, setError] = useState(false)

  return (
    <TouchableOpacity onPress={()=>{fetchFoodList(`/food/list?sub_id=${item._id}`,`Select your ${item.name}`)}} key={item._id} style={styles.Button}>
        <Image source={require("../../../assets/images/patterns/hex.webp")} style={[StyleSheet.absoluteFill,styles.backgroundImage]}/>

        <View style={[styles.imageContainer,{position:"relative"}]}>
            {!error && (
            <MotiImage from={{translateY:-15,opacity:0}} transition={{delay:(index+1)*100}} animate={{ translateY: 0, opacity: loaded ? 1 : 0 }} source={{uri:item.imageUrl}} style={styles.foodImage} onLoadEnd={()=>setLoaded(true)} onError={() => setError(true)}/>
            )}

             {!loaded || error ? (
                <MotiImage from={{opacity:0}} animate={{opacity:1}} transition={{delay:200}}  source={require("@/assets/images/floral/coffee cup.png")} style={{position:"absolute",objectFit:"contain", width:"80%",height:"80%"}}/>
             ):null
            }
        </View>

        <Text style={styles.nameText}>{item.name}</Text>
    
</TouchableOpacity>
  )
}

export default SubCarouselItem