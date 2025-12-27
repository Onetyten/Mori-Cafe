import CircularView from "@/components/CircularView";
import useFetchFoodList from "@/hooks/useFetchFoodList";
import useFetchReceiptList from "@/hooks/useFetchReceiptList";
import useGetElse from "@/hooks/useGetElse";
import useListCart from "@/hooks/useListCart";
import useSubcategory from "@/hooks/useSubcategory";
import { colors, GlobalStyle } from "@/styles/global";
import { Dice6, History, ShoppingCart } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface propType{
    showButtons:boolean;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void;}[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean;
}

export default function QuickActions(props:propType) {
    const {showButtons,setShowOptions,setOptions,setLoading,loading} = props
    const {getCategory} = useSubcategory(setOptions,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setOptions,getCategory)
    const CartList = useListCart(setShowOptions,setLoading,setOptions,getSomethingElseMessage)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setShowOptions,setOptions,getSomethingElseMessage)
    const fetchReceiptList =  useFetchReceiptList()


  return (
    showButtons&&
    <CircularView size={350}>
        <TouchableOpacity style={[styles.button]} onPress={()=>{fetchFoodList(`/food/list?random=true`,"Close your eyes...")}}>
            <Dice6 size={20} color={"#e9d5ca"}  />
            <Text style={[GlobalStyle.Outfit_Light_small,styles.iconText]}>Random</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]} onPress={fetchReceiptList}>
            <History size={20} color={"#e9d5ca"} />
            <Text style={[GlobalStyle.Outfit_Light_small,styles.iconText]}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]} onPress={CartList}>
            <ShoppingCart size={20} color={"#e9d5ca"} />
            <Text style={[GlobalStyle.Outfit_Light_small,styles.iconText]}>View tab</Text>
        </TouchableOpacity>
    </CircularView>
  )
}

const styles = StyleSheet.create({
    button:{
        borderRadius:"100%",
        backgroundColor:"rgb(162 177 138 / 0.8)",
        justifyContent:"center",
        alignItems:"center",
        padding:6,
        height:72,
        width:72,
        gap:1,
    },
    iconText:{
        color:colors.background
    },
})