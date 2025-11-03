import { useRef, useState } from "react"
import type { messageListType, } from "../types/type"
import BotMessage from "./message/BotMessage"
import ChatMessage from "./message/ChatMessage"
import OptionsInput from "./OptionsInput"
// import CustomisationList from "./customisationList"
// import CartFeedBack from "./CartFeedBack"
// import CheckoutList from "./CheckoutList"
// import UserInfoInput from "./UserInfoInput"
// import OrderFeedback from "./OrderFeedback"
// import OrderReceipt from "./OrderReceipt"
// import OrderHandler from "./OrderHandler"
import { ScrollView, StyleSheet, View } from "react-native"
import useAddToCart from "../hooks/useAddToCart"
import { useChatInit } from "../hooks/useChatInit"
import useConfirmToCart from "../hooks/useConfirmToCart"
import useFetchFoodList from "../hooks/useFetchFoodList"
import useGetElse from "../hooks/useGetElse"
import useListCart from "../hooks/useListCart"
import useOptionCount from "../hooks/useOptionCount"
import useProceedPayment from "../hooks/useProceedPayment"
import useSubcategory from "../hooks/useSubcategory"
import BotErrorMessage from "./message/BotErrorMessage"
import FoodCarousel from "./message/FoodCarousel"
import SubCarousel from "./message/SubCarousel"
import SearchBar from "./searchbar/SearchBar"
import NumberInput from "./message/NumberInput"
// import ReceiptCarousel from "./ReceiptCarousel.tsx"




export default function ChatBox() {
    const scrollRef = useRef<ScrollView|null>(null)
    const [messagelist,setMessageList] = useState<messageListType[]>([])
    const [showoptions,setShowOptions] = useState(false)
    const [loading,setLoading] = useState(false)
    const initiatedRef = useRef<boolean>(false)
    const [options,setOptions] = useState([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
    const [showButtons,setShowButtons] = useState(false)
    const isAdding = useRef(false)

    useChatInit({scrollRef,messagelist,initiatedRef,setMessageList,setShowOptions,setShowButtons})
    const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setMessageList,setShowOptions,setOptions,getSomethingElseMessage)
    const CartList = useListCart(setMessageList,setShowOptions,setLoading,setOptions,getSomethingElseMessage)
    const {addToCart} = useAddToCart(setShowOptions,setMessageList,CartList,getSomethingElseMessage,setLoading,setOptions,isAdding)
    const comfirmToCart = useConfirmToCart(setLoading,setMessageList,setShowOptions,addToCart,setOptions)
    const optionCount = useOptionCount(setShowOptions,setLoading,loading,setMessageList)
    const ProceedToPayment = useProceedPayment(setShowOptions,setMessageList)
    
  return (
    <View style={chatStyle.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={chatStyle.scrollView} contentContainerStyle={chatStyle.scrollViewStyle} >
            <View style={chatStyle.messageView}>
                {messagelist.map((item,index:number)=>{
                    return(
                            item.type === "message"?item.sender==="bot"?<BotMessage key={index} message={item}/>:item.sender === "bot-error"?<BotErrorMessage key={index} message={item}/>:<ChatMessage message={item} key={index}/>
                            :item.type === "subcarousel"?<SubCarousel message={item} key={index} fetchFoodList={fetchFoodList}  />
                            :item.type === "number-input"?<NumberInput message={item} key={index} confirm={comfirmToCart} />
                            // :item.type === "cart-feedback"?<CartFeedBack message={item} key={index} isAdding={isAdding}/>
                            // :item.type === "order-handle"?<OrderHandler message={item} key={index}/>
                            // :item.type === "order-feedback"?<OrderFeedback key={index}/>
                            // :item.type === "order-receipt"?<OrderReceipt key={index} setMessageList={setMessageList} message={item}/>
                            // :item.type === "cart-list-feedback"?<CheckoutList key={index} message={item} setShowOptions={setShowOptions} setOptions={setOptions} getSomethingElseMessage = {getSomethingElseMessage} setMessageList={setMessageList}/>
                            // :item.type === "edit-list"?<CustomisationList key={index} message={item} addToCart = {addToCart} />
                            // :item.type === "enter-info"?<UserInfoInput key={index} setMessageList={setMessageList} setOptions={setOptions} setShowOptions={setShowOptions} getSomethingElseMessage={getSomethingElseMessage} ProceedToPayment={ProceedToPayment} />
                            :item.type === "food-list"?<FoodCarousel key={index} setShowOptions={setShowOptions} setMessageList={setMessageList} setLoading={setLoading} message={item} onClick={optionCount}/>
                            // :item.type === "receipt-list"?<ReceiptCarousel key={index} setShowOptions={setShowOptions} setMessageList={setMessageList} setLoading={setLoading} message={item}/>
                            :null
                    )
                })}
            </View>
            {showoptions&& <OptionsInput options = {options}/>}

            <View style={{height:64}}/>
          
        </ScrollView>
        <SearchBar messagelist={messagelist} setMessageList={setMessageList} setOptions={setOptions} setShowOptions={setShowOptions} setLoading={setLoading} loading = {loading} showButtons={showButtons} setShowButtons={setShowButtons}/>
    </View>
    
  )
}

const chatStyle = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        gap:16,
        paddingHorizontal:24
    },
    messageView:{
        width:"100%",
        gap: 16,
        justifyContent:"flex-start"
    },
    scrollView: {
        flex: 1,          
        width: "100%",
    },
    scrollViewStyle:{
        width:"100%",
        display:"flex",
        marginTop:8,
        gap:2,
        justifyContent:"flex-start",
        alignItems:"center",
    }
})