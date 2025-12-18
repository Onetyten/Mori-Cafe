import { AddMessage } from "@/store/messageListSlice"
import { chatStyles } from "@/styles/chatStyle"
import { colors, GlobalStyle } from "@/styles/global"
import { toWords } from "number-to-words"
import { memo, useEffect, useRef, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentCart } from "../../store/currentCartItem"
import type { customisationType, messageListType, tweakType } from "../../types/type"
import api from "../../utils/api"
import type { RootState } from "../../utils/store"
import OptionCheckbox from "./options/OptionCheckbox"
import OptionQuantity from "./options/OptionQuantity"
import OptionSelect from "./options/OptionSelect"


interface propType{
    message:messageListType,
    addToCart:(foodName:string)=>void
}

const CustomisationList = memo(function CustomisationList(props:propType) {
    const {message,addToCart} = props
    const dispatch = useDispatch()
    const currentCartFood = useSelector((state:RootState)=>state.cart.cart)
    const foodRedux = useSelector((state:RootState)=>state.food.food)
    const [options,setOptions] = useState<customisationType[]>([]) 
    const selectOptions = options.filter((option)=>option.type === "option")
    const checkOptions = options.filter((option)=>option.type === "check")
    const sizeOptions = options.filter((option)=>option.type === "quantity")
    const customIds = message.content[0]
    const foodId = message.content[1]
    const [tweakList,setTweakList] = useState<tweakType[]>(currentCartFood?.customisation??[])
    const [addedToCart,setAddedToCart] = useState(false)
    const gettingOptions = useRef(false)

    useEffect(()=>{
        if (gettingOptions.current === true) return
        gettingOptions.current = true
        if (foodId !== foodRedux?._id){
            return message.next()
        }
        async function getOptions(){
            try {
                const response = await api.post('/food/custom/fetch',{customisationId:customIds})
                if (!response.data.success) return
                const customisations = response.data.data
                setOptions(customisations)
            } 
            catch (error) {
                console.error(error)
                message.next()
            }
            finally{
                gettingOptions.current = false
            }
        }
        getOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message, message.content])

    function handleAddCustomOptions() {
        if (!foodRedux || !currentCartFood) return
        const updatedCart = { ...currentCartFood, customisation: tweakList }
        dispatch(setCurrentCart(updatedCart))
        addToCart(foodRedux.name)
        setAddedToCart(true)
        const orderContent = `I want my ${foodRedux?.name || "food"} to be made with:${tweakList.map((item)=>
                item.type==="option"? `\n${item.name} : ${item.value} ` 
                : item.type === "quantity" ? `\n${toWords(parseInt(item.value))} ${ parseInt(item.value) === 1 && item.name.endsWith("s") ? item.name.slice(0, -1) : item.name}` :
                `\n${item.name}`
            )} `
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[orderContent]}
        dispatch(AddMessage(newMessage))

    }

    if (options.length===0){
        return(
            <View style={styles.loaderParent}>
                {message.content.map((index)=>{
                    return(
                        <View key={index} style={styles.loader}>
                            <ActivityIndicator size="small" color="#fff"/> 
                        </View>
                    )
                })}
            </View>
        )
    }

    if (addedToCart) return null

  return (
    <View className="w-full flex justify-end items-end  flex-col gap-2">
        {!addedToCart?(
            <View className="flex gap-2 justify-start flex-col items-end">
                {selectOptions.map((item,index)=>{
                    return(
                        <OptionSelect tweakList={tweakList} setTweakList={setTweakList} edit={item} key={index}/>
                    )
                })}
                {checkOptions.map((item,index)=>{
                    return(
                        <OptionCheckbox tweakList={tweakList} setTweakList={setTweakList} edit={item} key={index}/>
                    )   
                })}
                {sizeOptions.map((item,index)=>{
                    return(
                        <OptionQuantity tweakList={tweakList} setTweakList={setTweakList} edit={item} key={index}/>
                    )
                })}

                <TouchableOpacity style={{borderWidth:1}} onPress={handleAddCustomOptions}
                 className="rounded-md h-10 text-sm flex justify-center px-4 items-center gap-1 border border-primary">
                    <Text style={[GlobalStyle.Outfit_Regular_body,{color:colors.primary}]}>Confirm</Text>
                </TouchableOpacity>
            </View>
        ):(
            <View style={chatStyles.chatMessageView}>
                <View style={[chatStyles.chatBubble,{padding:16}]} >
                    <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.chatBubbleText]}>
                        I want my <Text>{foodRedux?.name || "food"}</Text> to be made with:
                    </Text>
                    {tweakList.map((item,index)=>{
                        return(
                            <Text key={index} style={[GlobalStyle.Outfit_Regular_body,chatStyles.chatBubbleText,{textTransform:'capitalize',lineHeight:36}]}>
                                {item.type==="option"? `${item.name} : ${item.value} `
                                :
                                item.type === "quantity" ? `${toWords(parseInt(item.value))} ${ parseInt(item.value) === 1 && item.name.endsWith("s") ? item.name.slice(0, -1) : item.name}`
                                :
                                `${item.name}`}
                            </Text>
                        )
                    })}
                </View>
            </View>
        )}
    </View>
  )
})


export default CustomisationList

const styles = StyleSheet.create({
    loaderParent:{
        width:"100%",
        alignItems:"flex-end",
        gap:8
    },
    loader:{
        width:240,
        backgroundColor:colors.light,
        height:40,
        justifyContent:"center",
        alignItems:"center"
    }
})
