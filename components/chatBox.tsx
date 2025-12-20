import useAddToCart from "@/hooks/useAddToCart"
import useConfirmToCart from "@/hooks/useConfirmToCart"
import useFetchFoodList from "@/hooks/useFetchFoodList"
import useGetElse from "@/hooks/useGetElse"
import useListCart from "@/hooks/useListCart"
import { messageListType } from "@/types/type"
import { RootState } from "@/utils/store"
import { useCallback, useMemo, useRef, useState } from "react"
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
    const initiatedRef = useRef<boolean>(false)
    const [showButtons,setShowButtons] = useState(false)
    const [options, setOptions] = useState<{name: string; onClick: () => void}[]>([]);
    
    const {getCategory} = useSubcategory(setOptions,setShowOptions)
    useChatInit({initiatedRef,setShowOptions,setOptions,options,getCategory})
    const getSomethingElseMessage = useGetElse(setShowOptions,setOptions,getCategory)
    const CartList = useListCart(setShowOptions,setLoading,setOptions,getSomethingElseMessage)
    const {addToCart,isAdding} = useAddToCart(setShowOptions,CartList,getSomethingElseMessage,setLoading,setOptions)
    const comfirmToCart = useConfirmToCart(setLoading,setShowOptions,addToCart,setOptions)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setShowOptions,setOptions,getSomethingElseMessage)

    const chatContext  = useMemo(()=>({
        getCategory,getSomethingElseMessage,CartList,addToCart,isAdding,comfirmToCart,fetchFoodList,setOptions,setShowOptions, setLoading, loading
    }),[CartList, addToCart, comfirmToCart, fetchFoodList, getCategory, getSomethingElseMessage, isAdding,setOptions,setShowOptions, setLoading, loading])

    const renderItem = useCallback(({item,index}:{item:messageListType,index:number})=>(
        <MessageRenderer isLast = {index === messageList.length-1} chatItem={item} context={chatContext}/>
    ),[chatContext, messageList.length])


    const ItemSeparator = useCallback(() => <View style={{ height: 16 }} />, []);
    const listFooter = useCallback(()=>showoptions?<OptionsInput options = {options}/>:null ,[options, showoptions])
    
    const scrollDown = useCallback(()=>{
        requestAnimationFrame(()=>{ scrollRef.current?.scrollToEnd({animated:true})})
    },[])

    
  return (
    <View style={chatStyle.container}>
        <View style={chatStyle.scrollView} >
            <FlatList 
                ref={scrollRef}
                contentContainerStyle={chatStyle.messageView}
                data={messageList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,)=>item.id}
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
        zIndex: 30,
        // backgroundColor:"#592c0d40"
    },
})