import useFetchFoodList from "@/hooks/useFetchFoodList";
import useFetchReceiptList from "@/hooks/useFetchReceiptList";
import useGetElse from "@/hooks/useGetElse";
import useListCart from "@/hooks/useListCart";
import useSubcategory from "@/hooks/useSubcategory";
import type { messageListType } from "@/types/type";
import { Dice6, History, ShoppingCart } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface propType{
    showButtons:boolean;
    messagelist:messageListType[];
    setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void;}[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean;
}

export default function QuickActions(props:propType) {
    const {showButtons,setMessageList,setShowOptions,setOptions,setLoading,loading} = props
    const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
    const CartList = useListCart(setMessageList,setShowOptions,setLoading,setOptions,getSomethingElseMessage)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setMessageList,setShowOptions,setOptions,getSomethingElseMessage)
    const fetchReceiptList =  useFetchReceiptList(setMessageList)

  return (
    showButtons&&
    <View className={`w-80 h-80 z-40 duration-250 -bottom-2 left-1/2 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 absolute bg-primary rounded-full flex`}>

        <View className={`w-full h-full left-1/2 top-1/2 ${showButtons?"flex flex-col gap-8 sm:gap-0":"hidden"} pt-6 sm:pt-0 sm:justify-center rounded-full -translate-x-1/2 -translate-y-1/2 absolute `}>

            <TouchableOpacity onPress={()=>{fetchFoodList(`/food/list?random=true`,"Close your eyes...")}} className="flex items-center p-0 sm:p-3 sm:bg-secondary-200/40 sm:hover:bg-secondary-200/60 select-none cursor-pointer sm:h-20 gap-2 sm:w-20 justify-center rounded-full flex-col sm:absolute sm:left-1/2 sm:-translate-x-1/2 top-6">
                <Dice6 className="size-6" />
                <Text className="text-xs hidden sm:flex">Random</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={CartList} className="flex items-center p-0 sm:p-3  sm:bg-secondary-200/40 sm:hover:bg-secondary-200/60 select-none cursor-pointer sm:h-20 gap-2 sm:w-20 justify-center rounded-full flex-col sm:absolute sm:top-1/2 sm:-translate-y-15 sm:left-6 ">
                <ShoppingCart className="size-5" />
                <Text className="text-xs hidden sm:flex">View tab</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={fetchReceiptList} className="flex items-center p-0 sm:p-3  sm:bg-secondary-200/40 sm:hover:bg-secondary-200/60 select-none cursor-pointer sm:h-20 gap-2 sm:w-20 justify-center rounded-full flex-col sm:absolute sm:top-1/2 sm:-translate-y-15 sm:right-6 ">
                <History className="size-4" />
                <Text className="text-xs hidden sm:flex">History</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
