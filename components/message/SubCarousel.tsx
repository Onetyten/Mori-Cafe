import { colors } from "@/styles/global"
import { Image, ImageBackground } from "expo-image"
import { memo, useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
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
    useEffect(()=>{
        let cancelled = false
        async function getSubCategory() {
             const category = message.content[0]
             if (!category) return;
             if (cancelled) return
             const response = await api.get(`/food/subcategory/${message.content[0]}`)
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
            <View className="w-full gap-2 flex-wrap flex-row justify-center">
                {Array.from({length:2}).map((_,i)=>(
                    <View key={i} className="bg-muted/40 flex justify-center items-center w-[48%] h-52 rounded-md">
                        <ActivityIndicator size="large" color={colors.muted}/> 
                    </View>
                ))}
            </View>
        )
      }

  return (
    <View className="w-full flex-row justify-between gap-2 flex-wrap">
        {subcategoryList.map((item)=>{
            return(
                <TouchableOpacity onPress={()=>{fetchFoodList(`/food/list?sub_id=${item._id}`,`Select your ${item.name}`)}} key={item._id} className="w-[49%]">
                    <ImageBackground imageStyle={{overflow:"hidden",borderRadius:10}} source={require("../../assets/images/patterns/pattern.webp")}  className="hover:bg-secondary-200/20 hover:shadow-xl shadow-secondary-100/10 cursor-pointer h-52 flex justify-center items-center flex-col overflow-hidden rounded-3xl bg-auto relative bg-center" style={{height:200}}>
                        <View className="flex-1 z-20 flex justify-center items-center text-center h-full w-full">
                            <Image source={{uri:item.imageUrl}} style={{objectFit:"contain",width:128,height:128,borderRadius:9999}} className="size-32 object-contain rounded-full" />
                        </View>
                        <View className="capitalize text-center ">
                            <Text className="text-center text-secondary-100 text-2xl capitalize font-outfit-bold mb-3">{item.name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )
        })}
    </View>
  )
})

export default SubCarousel