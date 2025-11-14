import { useRef, useState } from "react"
import BotMessage from './message/BotMessage.1'
import ChatMessage from "./message/ChatMessage"
import OptionsInput from "./OptionsInput"
// import CartFeedBack from "./CartFeedBack"
// import CheckoutList from "./CheckoutList"
// import UserInfoInput from "./UserInfoInput"
// import OrderFeedback from "./OrderFeedback"
// import OrderReceipt from "./OrderReceipt"
// import OrderHandler from "./OrderHandler"
import { RootState } from "@/utils/store"
import { FlatList, ScrollView, StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import useAddToCart from "../hooks/useAddToCart"
import { useChatInit } from "../hooks/useChatInit"
import useConfirmToCart from "../hooks/useConfirmToCart"
import useFetchFoodList from "../hooks/useFetchFoodList"
import useGetElse from "../hooks/useGetElse"
import useListCart from "../hooks/useListCart"
import useOptionCount from "../hooks/useOptionCount"
import useSubcategory from "../hooks/useSubcategory"
import BotErrorMessage from "./message/BotErrorMessage"
import CartFeedBack from "./message/CartFeedBack"
import CheckoutList from "./message/CheckoutList"
import CustomisationList from "./message/CustomisationList"
import FoodCarousel from "./message/FoodCarousel"
import NumberInput from "./message/NumberInput"
import SubCarousel from "./message/SubCarousel"
import SearchBar from "./searchbar/SearchBar"
// import ReceiptCarousel from "./ReceiptCarousel.tsx"




export default function ChatBox() {
    const messageList = useSelector((state:RootState)=>state.messageList.messageList)
    const scrollRef = useRef<ScrollView|null>(null)
    const [showoptions,setShowOptions] = useState(false)
    const [loading,setLoading] = useState(false)
    const initiatedRef = useRef<boolean>(false)
    const [options,setOptions] = useState([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
    const [showButtons,setShowButtons] = useState(false)
    const isAdding = useRef(false)

    useChatInit({scrollRef,initiatedRef,setShowOptions,setShowButtons})
    const {getCategory} = useSubcategory(setOptions,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setOptions,getCategory)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setShowOptions,setOptions,getSomethingElseMessage)
    const CartList = useListCart(setShowOptions,setLoading,setOptions,getSomethingElseMessage)
    const {addToCart} = useAddToCart(setShowOptions,CartList,getSomethingElseMessage,setLoading,setOptions,isAdding)
    const comfirmToCart = useConfirmToCart(setLoading,setShowOptions,addToCart,setOptions)
    const optionCount = useOptionCount(setShowOptions,setLoading,loading)

    
  return (
    <View style={chatStyle.container}>
        <View style={chatStyle.scrollView} >
                <FlatList 
                    contentContainerStyle={chatStyle.messageView}
                    data={messageList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_item,index)=>index.toString()}
                    ListFooterComponentStyle={{marginBottom:128}}
                    ItemSeparatorComponent={()=><View style={{height:16}} />}
                    ListFooterComponent={()=>showoptions&& <OptionsInput options = {options}/>}
                    renderItem={({item}) => 
                        item.type === "message"?item.sender==="bot"?<BotMessage message={item}/>:item.sender === "bot-error"?<BotErrorMessage message={item}/>:<ChatMessage message={item}/>
                        :item.type === "subcarousel"?<SubCarousel message={item} fetchFoodList={fetchFoodList}  />
                        :item.type === "number-input"?<NumberInput message={item} confirm={comfirmToCart} />
                        :item.type === "cart-feedback"?<CartFeedBack message={item} isAdding={isAdding}/>
                        // :item.type === "order-handle"?<OrderHandler message={item} key={index}/>
                        // :item.type === "order-feedback"?<OrderFeedback key={index}/>
                        // :item.type === "order-receipt"?<OrderReceipt key={index} setMessageList={setMessageList} message={item}/>
                        :item.type === "cart-list-feedback"?<CheckoutList message={item} setShowOptions={setShowOptions} setOptions={setOptions} getSomethingElseMessage = {getSomethingElseMessage}/>
                        :item.type === "edit-list"?<CustomisationList message={item} addToCart = {addToCart} />
                        // :item.type === "enter-info"?<UserInfoInput key={index} setMessageList={setMessageList} setOptions={setOptions} setShowOptions={setShowOptions} getSomethingElseMessage={getSomethingElseMessage} ProceedToPayment={ProceedToPayment} />
                        :item.type === "food-list"?<FoodCarousel setShowOptions={setShowOptions} setLoading={setLoading} message={item} onClick={optionCount}/>
                        // :item.type === "receipt-list"?<ReceiptCarousel key={index} setShowOptions={setShowOptions} setMessageList={setMessageList} setLoading={setLoading} message={item}/>
                        :null 
                } />
        </View>
        <SearchBar setOptions={setOptions} setShowOptions={setShowOptions} setLoading={setLoading} loading = {loading} showButtons={showButtons} setShowButtons={setShowButtons}/>
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