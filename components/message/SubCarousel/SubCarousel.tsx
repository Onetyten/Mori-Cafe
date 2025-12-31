import { MotiImage } from "moti"
import { memo } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { messageListType } from '../../../types/messageTypes'
import { styles } from "./style"

interface propType{
    message:messageListType,
    fetchFoodList:(endpoint:string,expression: string)=>void,
}

    const SubCarousel = memo(function SubCarousel(props:propType) {
        const {message,fetchFoodList} = props
        if (message.type !== "subcarousel" ) return

        if (message.content.length===0){
            if (message.fetched === false){
                return(
                    <View style={styles.loaderRow}>
                        {Array.from({length:2}).map((_,i)=>(
                            <View key={i} style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color={"#fff"}/> 
                            </View>
                        ))}
                    </View>
                )
            }
            else {
                return null
            }
        }

  return (
    <View style={styles.parent}>
        {message.content.map((item,index)=>{
            return(
                <TouchableOpacity onPress={()=>{fetchFoodList(`/food/list?sub_id=${item._id}`,`Select your ${item.name}`)}} key={item._id} style={styles.Button}>
                        <Image source={require("../../../assets/images/patterns/hex.webp")} style={[StyleSheet.absoluteFill,styles.backgroundImage]}/>
                        <View style={styles.imageContainer}>
                            <MotiImage from={{translateY:-15}} transition={{delay:(index+1)*100}} animate={{translateY:0}}  source={{uri:item.imageUrl}} style={styles.foodImage}/>
                        </View>
                        
                        <Text style={styles.nameText}>{item.name}</Text>
                    
                </TouchableOpacity>
            )
        })}
    </View>
  )
})

export default SubCarousel
