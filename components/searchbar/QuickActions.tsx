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
    <View className={`w-[450px] h-[450px] z-40 duration-250 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-primary rounded-full flex`}>

            <TouchableOpacity onPress={()=>{fetchFoodList(`/food/list?random=true`,"Close your eyes...")}} className="flex items-center justify-center p-3 bg-secondary-200/40 h-28 gap-2 w-28 rounded-full flex-col absolute top-6 left-1/2 -translate-x-10">
                <Dice6 className="size-10" size={35} color={"#e9d5ca"}  />
                <Text className="text-xs text-background">Random</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={fetchReceiptList} className="flex items-center justify-center p-3 bg-secondary-200/40 h-28 gap-2 w-28 rounded-full flex-col absolute top-1/2 right-6 -translate-y-1/2">
                <History className="size-10" size={35} color={"#e9d5ca"} />
                <Text className="text-xs text-background">History</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={CartList} className="flex items-center justify-center p-3 bg-secondary-200/40 h-28 gap-2 w-28 rounded-full flex-col absolute top-1/2 right-[55px] -translate-y-[160px]">
                <ShoppingCart className="size-10" size={35} color={"#e9d5ca"} />
                <Text className="text-xs text-background">View tab</Text>
            </TouchableOpacity>


    
    </View>
  )
}
