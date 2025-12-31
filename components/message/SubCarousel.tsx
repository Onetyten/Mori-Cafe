import { colors, GlobalStyle } from "@/styles/global"
import { MotiImage } from "moti"
import { memo } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { messageListType } from '../../types/type'

interface propType{
    message:messageListType,
    fetchFoodList:(endpoint:string,expression: string)=>void,
}

    const SubCarousel = memo(function SubCarousel(props:propType) {
        const {message,fetchFoodList} = props
        if (message.type !== "subcarousel" ) return

        if (message.content.length===0){
            if (message.loaded === false){
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
                        <Image source={require("../../assets/images/patterns/hex.webp")} style={[StyleSheet.absoluteFill,styles.backgroundImage]}/>
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

const styles = StyleSheet.create({
    loaderRow:{
        width:"100%",
        gap:8,
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"center"
    },
    loaderContainer:{
        backgroundColor:colors.light+"70",
        justifyContent:"center",
        alignItems:"center",
        width:"48%",
        height:208,
        borderRadius:6
    },
    backgroundImage:{
        width:"200%",
        height:"200%"
    },
    imageContainer:{
        flex:1,
        zIndex:20,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100%"
    },
    foodImage:{
        objectFit:"contain",
        width:128,
        height:128,
        borderRadius:9999
    },
    nameText:{
        ...GlobalStyle.Outfit_Bold_button,
        color:"#fff",
        textAlign:"center",
        textTransform:"capitalize",
        marginBottom:12,
    },
    parent:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        gap:8,
        flexWrap:"wrap",
    },
    Button:{
        overflow:"hidden",
        borderRadius:10,
        height:180,
        backgroundColor:colors.background,
        justifyContent:"center",
        alignItems:"center",
        width:"48.5%",
    }
})