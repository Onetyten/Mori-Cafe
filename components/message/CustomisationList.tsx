import { AddMessage, NewMessage, removeMessage } from "@/store/messageListSlice"
import { colors, GlobalStyle } from "@/styles/global"
import { messageListType } from "@/types/messageTypes"
import { toWords } from "number-to-words"
import { memo } from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentCart } from "../../store/currentCartItem"
import type { RootState } from "../../utils/store"
import OptionCheckbox from "./options/OptionCheckbox"
import OptionQuantity from "./options/OptionQuantity"
import OptionSelect from "./options/OptionSelect"

interface propType{
    message:messageListType,
    addToCart:()=>void
}

const CustomisationList = memo(function CustomisationList(props:propType) {
    const {message,addToCart} = props
    const dispatch = useDispatch()
    const currentCartFood = useSelector((state:RootState)=>state.cart.cart)
    const foodRedux = useSelector((state:RootState)=>state.food.food)

    if (message.type !== "editList") return
    
    const options = message.customisations
    const selectOptions = options.filter((option)=>option.type === "option")
    const checkOptions = options.filter((option)=>option.type === "check")
    const sizeOptions = options.filter((option)=>option.type === "quantity")

    function handleAddCustomOptions() {
        if (!foodRedux || !currentCartFood || message.type !== "editList") return
        const updatedCart = { ...currentCartFood, customisation: message.tweaks }
        dispatch(setCurrentCart(updatedCart))
        addToCart()
        let orderContent = "Made the usual way"
        if (message.tweaks.length>0){
            orderContent = `I want my ${foodRedux?.name || "food"} to be made with:${message.tweaks.map((item)=>
                    item.type==="option"? `\n${item.name} : ${item.value} ` 
                    : item.type === "quantity" ? `\n${toWords(parseInt(item.value))} ${ parseInt(item.value) === 1 && item.name.endsWith("s") ? item.name.slice(0, -1) : item.name}` :
                    `\n${item.name}`
            )} `
        }
        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[orderContent]}
        dispatch(AddMessage(newMessage))
        dispatch(removeMessage(message.id))
    }

    if (message.customisations.length===0){
       if (message.fetched) return
        return(
            <View style={styles.loaderParent}>
                {foodRedux?.customisationId.map((_,index)=>{
                    return(
                        <View key={index} style={styles.loader}>
                            <ActivityIndicator size="small" color="#fff"/> 
                        </View>
                    )
                })}
            </View>
        ) 
    }

  return (
    <View className="w-full flex justify-end items-end  flex-col gap-2">
        {!message.confirmed && (
            <View className="flex w-full gap-2 justify-start flex-col items-end">
                {selectOptions.map((item,index)=>{
                    return(
                        <OptionSelect messageId = {message.id} customisation ={item} key={index}/>
                    )
                })}
                {checkOptions.map((item,index)=>{
                    return(
                        <OptionCheckbox messageId = {message.id} customisation ={item} key={index}/>
                    )   
                })}
                {sizeOptions.map((item,index)=>{
                    return(
                        <OptionQuantity messageId = {message.id} customisation ={item} key={index}/>
                    )
                })}

                <TouchableOpacity style={styles.button} onPress={handleAddCustomOptions} >
                    <Text style={[GlobalStyle.Outfit_Regular_body,{color:colors.primary}]}> Confirm </Text>
                </TouchableOpacity>
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
    button: {
        padding: 8,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor:colors.background,
        borderRadius: 6,
    },
    loader:{
        width:"70%",
        backgroundColor:colors.light+"70",
        height:40,
        justifyContent:"center",
        alignItems:"center"
    }
})
