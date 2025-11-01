import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import useFetchFoodList from "../../hooks/useFetchFoodList";
import useGetElse from "../../hooks/useGetElse";
import useSubcategory from "../../hooks/useSubcategory";
import type { messageListType } from "../../types/type";
import QuickActions from './QuickActions';

interface propType{
    messagelist:messageListType[];
    setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void;}[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    showButtons: boolean;
    setShowButtons: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar(props:propType) {
  const {messagelist,setMessageList,setLoading,setOptions,setShowOptions,loading,showButtons,setShowButtons} = props
  const [query,setQuery] = useState("")
  const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
  const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
  const fetchFoodList = useFetchFoodList(loading,setLoading,setMessageList,setShowOptions,setOptions,getSomethingElseMessage)
  

  function HandleSubmit(){
    if (query.length===0) return
    fetchFoodList(`/food/list?q=${query}`,"Searching...")
    setQuery("")
  }
  

  return (
    <View className="w-full flex justify-center items-center h-14 mb-20">
        <View className="flex justify-between items-center relative w-full h-full ">
          <View className="absolute w-14 h-14 rounded-full items-center justify-center left-0 bg-primary z-50">
                <TouchableOpacity className='' onPress={()=>setShowButtons(!showButtons)}>
                  <Fontisto name="coffeescript" size={24} color="#e9d5ca"/>
                </TouchableOpacity>
                <QuickActions showButtons={showButtons} messagelist={messagelist} setMessageList={setMessageList} setShowOptions={setShowOptions} setLoading={setLoading} setOptions={setOptions} loading={loading} />
          </View>

          <TextInput value={query} onChangeText={setQuery} placeholder="Search order" className="w-full text-xl pl-16 font-outfit-light placeholder:text-muted h-full focus:outline-0 focus:bg-secondary-300/15 bg-secondary-300/20 rounded-full px-2" />
          
          <TouchableOpacity onPress={HandleSubmit} className="bg-primary absolute items-center justify-center right-0 hover:text-white w-14 h-14 rounded-full text-background">
            <Ionicons name="send" size={24} color="#e9d5ca" />
          </TouchableOpacity>
        </View>
    </View>
  )
}
