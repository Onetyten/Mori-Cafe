import { messageListType } from "@/types/type"
import { RootState } from "@/utils/store"
import { useRef, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
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
    const [options,setOptions] = useState([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
    const [showButtons,setShowButtons] = useState(false)
    useChatInit({initiatedRef,setShowOptions})
    const {getCategory} = useSubcategory(setOptions,setShowOptions)


    
  return (
    <View style={chatStyle.container}>
        <View style={chatStyle.scrollView} >
            <FlatList 
                ref={scrollRef}
                contentContainerStyle={chatStyle.messageView}
                data={messageList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_item,index)=>index.toString()}
                initialNumToRender={4}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                windowSize={7}
                updateCellsBatchingPeriod={30}
                ListFooterComponentStyle={{marginBottom:128}}
                onContentSizeChange={()=>{
                    requestAnimationFrame(()=>{
                    scrollRef.current?.scrollToEnd({animated:true})
                    })
                }}
                ItemSeparatorComponent={()=><View style={{height:16}} />}
                ListFooterComponent={()=>showoptions&& <OptionsInput options = {options}/>}
                renderItem={({item}) => <MessageRenderer chatItem={item} setOptions={setOptions} setShowOptions={setShowOptions} setLoading={setLoading} loading={loading} />
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