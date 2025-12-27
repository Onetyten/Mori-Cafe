import { colors, GlobalStyle } from "@/styles/global"
import { MotiImage } from "moti"
import { memo, useEffect, useRef, useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { subCategoryType } from '../../types/type'
import api from "../../utils/api"

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    },
    fetchFoodList:(endpoint:string,expression: string)=>void,
    
}

    const SubCarousel = memo(function SubCarousel(props:propType) {
    const {message,fetchFoodList} = props
    const [subcategoryList,setSubcategoryList] = useState<subCategoryType[]>([])
    const hasRun  = useRef(false)

    useEffect(()=>{
        if (hasRun.current) return
        let cancelled = false
        async function getSubCategory() {
             const category = message.content[0]
             if (!category) return;
             if (cancelled) return
             const response = await api.get(`/food/subcategory/${message.content[0]}`)
             hasRun.current = true
             if (response.data.success === false) return
             setSubcategoryList(response.data.data)
             if (message.next) message.next()
           
        }
        getSubCategory()
        return()=>{
            cancelled = true
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message.content])
    

      if (subcategoryList.length===0){
        
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

  return (
    <View style={styles.parent}>
        {subcategoryList.map((item,index)=>{
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