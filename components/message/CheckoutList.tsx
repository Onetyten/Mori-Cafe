/* eslint-disable react-hooks/exhaustive-deps */
import { chatStyles } from "@/styles/chatStyle"
import { GlobalStyle } from "@/styles/global"
import { isAxiosError } from "axios"
import { Image } from "expo-image"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import useCalculatePrice from "../../hooks/useCalculatePrice"
import useGetElse from "../../hooks/useGetElse"
import useSubcategory from "../../hooks/useSubcategory"
import { setOrderList } from "../../store/OrderCartList"
import type { messageListType } from "../../types/type"
import api from "../../utils/api"
import type { RootState } from "../../utils/store"
import CheckoutItem from "./options/CheckoutItem"




interface propType{
    message:{
        type:string,
        sender:string,
        next:()=>void, 
        content:string[]
    },
    setOptions: React.Dispatch<React.SetStateAction<{
        name: string;
        onClick: () => void;
    }[]>>,
    getSomethingElseMessage: (message: string) => void,
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
    setMessageList: React.Dispatch<React.SetStateAction<messageListType[]>>
}

export default function CheckoutList(props:propType) {
    const {message,setShowOptions,setOptions,setMessageList} = props
    const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
    const calculateSelectedPrice = useCalculatePrice(getSomethingElseMessage,setShowOptions,setOptions,setMessageList)
    const [added,setAdded] = useState(false)
    const [checkedOut,setCheckedOut] = useState(false)
    const [feedBack,setFeedback] = useState(`Select item to order`)
    const cartList = useSelector((state:RootState)=>state.orderList.orderList)
    const newOrder = useSelector((state:RootState)=>state.newOrder.newOrder)
    const dispatch = useDispatch()

    
    const checkOutListSuccess=() => {
        setTimeout(() => {
            setOptions([...[
            { name: 'Checkout', onClick: ()=>calculateSelectedPrice() },
            { name: 'Continue shopping', onClick: () => getSomethingElseMessage("Let's continue") }
            ]]);
            setShowOptions(true);
        }, 100);
    }
    
    function checkOutListCleared(){
        setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
    }



    useEffect(()=>{
        async function fetchCart() {
            try {
                setShowOptions(false)
                if (!message.next) return
                const response = await api.get('/order/cart/fetch')
                if (response.data.success === false){
                     return setFeedback(response.data.message)
                }
                const items = response.data.data
                dispatch(setOrderList(items))
                checkOutListSuccess()
            }
            catch (error) {
                console.error(error)
                if (isAxiosError(error)){
                    return setFeedback(error.response?.data.message)
                }
                setFeedback(`Error getting your tab, please try again`)
            }
            finally{
                message.next()
                setAdded(true)
                setShowOptions(true)
            }
        }
        fetchCart()
    },[])

    useEffect(() => {
        if (added && cartList.length === 0 && !checkedOut) {
            setCheckedOut(true)
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:["Your tab is empty."]}
            setMessageList((prev)=>[...prev, newMessage ])
            setFeedback("Your tab is empty.")
            checkOutListCleared()
        }
        }, [cartList, checkedOut, added])

    useEffect(() => {
        if (added && !checkedOut && newOrder !== null) {
            setCheckedOut(true)
            setFeedback(`Ordering ${newOrder.items.map(item=>`${item.quantity} ${item.foodId.name}`).join(', ')}.`)
            checkOutListCleared()
        }
    }, [newOrder])

    if (checkedOut && newOrder === null){
        return null
    }
    
  return (
    <View style={{width:"100%"}}>
        {!checkedOut?(
                <View style={{width:"100%"}}>
                    {added?(
                    <View style={{width:"100%"}}>
                        {cartList.length>0?(
                            <View style={{width:"100%",gap:24}}>
                                <View style={{flexDirection:"row",gap:8,justifyContent:"flex-start"}}>
                                    <View style={chatStyles.botImageContainer}>
                                        <Image source={require("@/assets/images/logo.gif")} style={{width:30,height:30}} alt="" />
                                    </View>

                                    <View style={[chatStyles.botBubbleContainer,{maxWidth:"80%"}]}>
                                        <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.botchatBubble,chatStyles.firstBotBubble]} >
                                            {feedBack}
                                        </Text>
                                    </View>
                                </View>
                                <View className="w-full flex gap-2 items-start justify-end">     
                                    <View className="flex w-full justify-end items-end text-sm text-secondary-100 flex-col gap-2 ">
                                        {cartList
                                        .filter((item) => item && item.foodId)
                                        .map((item, index) => (
                                            <CheckoutItem food={item} key={index} />
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ):(
                            <View style={{flexDirection:"row",gap:8,justifyContent:"flex-start"}}>
                                <View style={chatStyles.botImageContainer}>
                                    <Image source={require("@/assets/images/logo.gif")} style={{width:30,height:30}} alt="" />
                                </View>

                                <View style={[chatStyles.botBubbleContainer,{maxWidth:"80%"}]}>
                                    <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.botchatBubble,chatStyles.firstBotBubble]} >
                                        {feedBack}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                ):
                (
                    <View className="w-full max-w-8/12 flex gap-2 items-start">
                        <View style={chatStyles.botImageContainer}>
                            <Image source={require("@/assets/images/logo.gif")} style={{width:30,height:30}} alt="" />
                        </View>

                        <View style={chatStyles.botBubbleContainer}>
                            <View style={chatStyles.botBubbleLoader} >
                                <ActivityIndicator size="small" color='#e9d5ca'/>  
                            </View>
                        </View>
                    </View>)}
            </View>
        ):(
        <View style={{width:"100%",alignItems:"flex-end",gap:8}}>
            <View style={chatStyles.chatBubbleContainer}>
                <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.chatBubble,chatStyles.firstChatBubble]} >
                    {feedBack}
                </Text>
            </View>
        </View>
        )}
    </View>
  )
}
