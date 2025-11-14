import useFetchFoodList from "@/hooks/useFetchFoodList";
import useFetchReceiptList from "@/hooks/useFetchReceiptList";
import useGetElse from "@/hooks/useGetElse";
import useListCart from "@/hooks/useListCart";
import useSubcategory from "@/hooks/useSubcategory";
import { colors, GlobalStyle } from "@/styles/global";
import { Dice6, History, ShoppingCart } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    <View style={styles.container}>
        <TouchableOpacity style={[styles.button,styles.icon1]} onPress={()=>{fetchFoodList(`/food/list?random=true`,"Close your eyes...")}}>
            <Dice6 size={20} color={"#e9d5ca"}  />
            <Text style={[GlobalStyle.Outfit_Light_small,styles.iconText]}>Random</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button,styles.icon2]} onPress={fetchReceiptList}>
            <History size={20} color={"#e9d5ca"} />
            <Text style={[GlobalStyle.Outfit_Light_small,styles.iconText]}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button,styles.icon3]} onPress={CartList}>
            <ShoppingCart size={20} color={"#e9d5ca"} />
            <Text style={[GlobalStyle.Outfit_Light_small,styles.iconText]}>View tab</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    icon3:{
        top:"50%",
        right:36,
        transform:[
            {translateY:-114}
        ]
    },
    icon2:{
        top:"50%",
        right:16,
        transform:[
            {translateY:"-50%"}
        ]
    },
    icon1:{
        top:16,
        left:"55%",
        transform:[
            {translateX:-40}
        ]
    },
    button:{
        position:"absolute",
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
    container:{
        width:320,
        height:320,
        zIndex:40,
        top:"50%",
        left:"50%",
        position:"absolute",
        backgroundColor:"rgb(88 129 89 / 0.9)",
        borderRadius:"100%",
        transform:[
            {translateX:-160},
            {translateY:-160}
        ]
    }
})