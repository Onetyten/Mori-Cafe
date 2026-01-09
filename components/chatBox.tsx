import { useRenderCheckoutList } from "@/hooks/chatManagement/useRenderCheckoutList"
import { useRenderCustomisatonList } from "@/hooks/chatManagement/useRenderCustomisatonList"
import useRenderFoodCarousel from "@/hooks/chatManagement/useRenderFoodCarousel"
import useRenderNumberInput from "@/hooks/chatManagement/useRenderNumberInput"
import { useRenderReceiptCarousel } from "@/hooks/chatManagement/useRenderReceiptCarousel"
import useRenderSubcarousel from "@/hooks/chatManagement/useRenderSubCarousel"
import { useRenderTextMessage } from "@/hooks/chatManagement/useRenderTextMessage"
import useRenderUserInput from "@/hooks/chatManagement/useRenderUserInput"
import useAddToCart from "@/hooks/useAddToCart"
import useConfirmToCart from "@/hooks/useConfirmToCart"
import useFetchFoodList from "@/hooks/useFetchFoodList"
import useGetElse from "@/hooks/useGetElse"
import useProcessOrder from "@/hooks/useProcessOrder"
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
    const {addToCart,isAdding} = useAddToCart(setShowOptions,getSomethingElseMessage,setLoading,setOptions)
    const {comfirmToCart,cartFeedback} = useConfirmToCart(setLoading,setShowOptions,addToCart,setOptions,isAdding)
    const {processOrder} = useProcessOrder(setLoading,setShowOptions,addToCart,setOptions,isAdding)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setShowOptions,setOptions,getSomethingElseMessage)

    const chatContext  = useMemo(()=>({
        addToCart,fetchFoodList,setShowOptions
    }),[addToCart, fetchFoodList, setShowOptions])

    const {renderTextMessage} = useRenderTextMessage();
    const {renderSubcarousel} =useRenderSubcarousel();
    const {renderFoodCarousel} =useRenderFoodCarousel(setLoading,setShowOptions,loading);
    const {renderNumberInput,triggerNumberInput} =useRenderNumberInput(setShowOptions,setLoading,loading);
    const {renderCustomisationList} = useRenderCustomisatonList()
    const {renderUserInput} = useRenderUserInput(setShowOptions,getSomethingElseMessage,setOptions)
    const {renderCheckoutList} = useRenderCheckoutList(setShowOptions,getSomethingElseMessage,setOptions,loading,setLoading)
    const {renderReceiptCarousel} = useRenderReceiptCarousel(setShowOptions)

    const renderItem = useCallback(({item,index}:{item:messageListType,index:number})=>(
        <MessageRenderer chatItem={item}  isLast = {index === messageList.length-1} context={chatContext}/>
    ),[chatContext, messageList.length])

    useEffect(()=>{
        scrollRef.current?.scrollToEnd({animated:true})
    },[messageList.length])

    
    const ItemSeparator = useCallback(() => <View style={{ height: 16 }} />, []);
    const listFooter = useCallback(()=>showoptions?<OptionsInput options = {options}/>:null ,[options, showoptions])

    const processedIds = useRef<Set<string>>(new Set())

    useEffect(()=>{
        const ids = new Set(messageList.map(m=>m.id))
        processedIds.current.forEach(id=>{
            if (!ids.has(id)) processedIds.current.delete(id)
        })
    },[messageList])


    useEffect(()=>{
        for (const message of messageList){
            if (processedIds.current.has(message.id)) continue
            processedIds.current.add(message.id)
            switch (message.type){
                case "message":
                    renderTextMessage(message)
                    break
                case "subcarousel":
                    renderSubcarousel(message)
                    break 
                case "numberCountTrigger":
                    triggerNumberInput(message)
                    break   
                case "numberInput":
                    renderNumberInput(message)
                    break
                case "confirmToCart":
                    comfirmToCart(message)
                    break
                case "cartFeedback":
                    cartFeedback(message)
                    break
                case "orderFeedback":
                    processOrder(message)
                    break
                case "checkoutList":
                    renderCheckoutList(message)
                    break
                case "editList":
                    renderCustomisationList(message)
                    break
                case "enterInfo":
                    renderUserInput(message)
                    break
                case "foodCarousel":
                    renderFoodCarousel(message)
                    break
                case "receiptList":
                    renderReceiptCarousel(message)
                    break
                default:
                    return
            }
        }

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