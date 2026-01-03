import { useRenderCustomisatonList } from "@/hooks/chatManagement/useRenderCustomisatonList"
import useRenderFoodCarousel from "@/hooks/chatManagement/useRenderFoodCarousel"
import useRenderNumberInput from "@/hooks/chatManagement/useRenderNumberInput"
import useRenderSubcarousel from "@/hooks/chatManagement/useRenderSubCarousel"
import { useRenderTextMessage } from "@/hooks/chatManagement/useRenderTextMessage"
import useAddToCart from "@/hooks/useAddToCart"
import useConfirmToCart from "@/hooks/useConfirmToCart"
import useFetchFoodList from "@/hooks/useFetchFoodList"
import useGetElse from "@/hooks/useGetElse"
import useListCart from "@/hooks/useListCart"
import { messageListType } from "@/types/messageTypes"
import { RootState } from "@/utils/store"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FlatList, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { useSelector } from "react-redux"
import { useChatInit } from "../hooks/useChatInit"
import useSubcategory from "../hooks/useSubcategory"
import MessageRenderer from "./messageRenderer"
import OptionsInput from "./OptionsInput"
import SearchBar from "./searchbar/SearchBar"




export default function ChatBox() {
    const messageList = useSelector((state:RootState)=>state.messageList.messageList)
    const scrollRef = useRef<FlatList<messageListType>|null>(null)
    const [showoptions,setShowOptions] = useState(false)
    const [loading,setLoading] = useState(false)
    const [showButtons,setShowButtons] = useState(false)
    const [options, setOptions] = useState<{name: string; onClick: () => void}[]>([]);
    
    const {getCategory} = useSubcategory(setOptions,setShowOptions)
    useChatInit({setShowOptions,setOptions,options,getCategory})
    const getSomethingElseMessage = useGetElse(setShowOptions,setOptions,getCategory)
    const CartList = useListCart(setShowOptions,setLoading,setOptions,getSomethingElseMessage)
    const {addToCart,isAdding} = useAddToCart(setShowOptions,CartList,getSomethingElseMessage,setLoading,setOptions)
    const {comfirmToCart,cartFeedback} = useConfirmToCart(setLoading,setShowOptions,addToCart,setOptions,isAdding)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setShowOptions,setOptions,getSomethingElseMessage)

    const chatContext  = useMemo(()=>({
        getCategory,getSomethingElseMessage,CartList,addToCart,isAdding,fetchFoodList,setOptions,setShowOptions, setLoading, loading
    }),[CartList, addToCart, fetchFoodList, getCategory, getSomethingElseMessage, isAdding,setOptions,setShowOptions, setLoading, loading])

    const {renderTextMessage} = useRenderTextMessage();
    const {renderSubcarousel} =useRenderSubcarousel();
    const {renderFoodCarousel} =useRenderFoodCarousel(setLoading,setShowOptions,loading);
    const {renderNumberInput,triggerNumberInput} =useRenderNumberInput(setShowOptions,setLoading,loading);
    const {renderCustomisationList} = useRenderCustomisatonList()

    const renderItem = useCallback(({item,index}:{item:messageListType,index:number})=>(
        <MessageRenderer chatItem={item}  isLast = {index === messageList.length-1} context={chatContext}/>
    ),[chatContext, messageList.length])


    const ItemSeparator = useCallback(() => <View style={{ height: 16 }} />, []);
    const listFooter = useCallback(()=>showoptions?<OptionsInput options = {options}/>:null ,[options, showoptions])
    
    const scrollDown = useCallback(()=>{
        requestAnimationFrame(()=>{ scrollRef.current?.scrollToEnd({animated:true})})
    },[])

    const lastProcessedId = useRef<string|null>(null)
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])

    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout)
            timers.current = []
        }
    }, [])

    useEffect(()=>{
        const chatManager=()=>{
            const message = messageList.at(-1)
            if (!message || message.id === lastProcessedId.current) return
            lastProcessedId.current = message.id
            
            switch (message.type){
                case "message":
                    renderTextMessage(message)
                case "subcarousel":
                    renderSubcarousel(message) 
                case "numberCountTrigger":
                    triggerNumberInput(message)   
                case "numberInput":
                    renderNumberInput(message)
                case "confirmToCart":
                    comfirmToCart(message)
                case "cartFeedback":
                    cartFeedback(message)
                // case "cartFeedback":
                //     console.log("new message");
                // case "order-feedback":
                //     console.log("new order feedback message");
                // case "cart-list-feedback":
                //     console.log("new order feedback message");
                case "editList":
                    renderCustomisationList(message)
                // case "enter-info":
                //     console.log("new order feedback message");
                case "foodCarousel":
                    renderFoodCarousel(message)
                // case "receipt-list":
                //     console.log("new order feedback message");
                default:
                    return
            }

        }

        chatManager()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[messageList])

    
  return (
    <View style={chatStyle.container}>
        <View style={chatStyle.scrollView} >
            <FlatList 
                ref={scrollRef}
                contentContainerStyle={chatStyle.messageView}
                data={messageList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item)=>item.id}
                initialNumToRender={4}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                windowSize={15}
                updateCellsBatchingPeriod={30}
                ListFooterComponentStyle={{marginBottom:128}}
                onContentSizeChange= {scrollDown}
                ItemSeparatorComponent= {ItemSeparator}
                ListFooterComponent={listFooter}
                renderItem={renderItem}
                 />
        </View>
        
        { showButtons
        && (<TouchableWithoutFeedback onPress={()=>{setShowButtons(false)}}>
                <View style={chatStyle.ButtonOverlay} />
            </TouchableWithoutFeedback>)}

        <SearchBar setOptions={setOptions} setShowOptions={setShowOptions} setLoading={setLoading} loading = {loading} showButtons={showButtons} setShowButtons={setShowButtons}/>
        
    </View>
    
  )
}

const chatStyle = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        gap:16,
        paddingHorizontal:wp("3%"),
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
    },
    ButtonOverlay: {
        position: "absolute",
        width: "200%",
        height: "200%",
        right:0,
        top:0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        // backgroundColor:"#592c0d40"
    },
})