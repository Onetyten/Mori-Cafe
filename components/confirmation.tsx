import { colors, GlobalStyle } from '@/styles/global'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearDeleteCartItem } from '../store/cartDeleteSlice'
import type { RootState } from '../utils/store'

export default function Comfirmation() {
    const deletedItem = useSelector((state:RootState)=>state.cartDel.cartDel)
    const dispatch = useDispatch()
    const cartList = useSelector((state:RootState)=>state.orderList.orderList)

    if (deletedItem.message?.type !== "checkoutList") return



  return (
    deletedItem.item&&
    <View style={styles.overlay}>
        <View style={styles.modal}>
            <Text style={[styles.text,GlobalStyle.Outfit_Regular_body]}>
                Are you sure you want to remove {deletedItem.item.foodId.name} from your tab
            </Text>
            
            <View style={{flexDirection:"row",gap:4,width:"100%"}}>
                <TouchableOpacity style={[styles.button,styles.noButton]} onPress={()=>{dispatch(clearDeleteCartItem())}}>
                    <Text style={[styles.noText,GlobalStyle.Outfit_Regular_body]} >No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,styles.yesButton]}>
                    <Text style={[styles.yesText,GlobalStyle.Outfit_Regular_body]}>Yes</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 70,
    backgroundColor:"#592c0d40"
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    gap: 16,
    width: "80%",
  },
  text: {
    textAlign: "center",
    color: colors.secondary,
    width: "100%",
    ...GlobalStyle.Outfit_Regular_body
  },
  button: {
    borderRadius: 4,
    width: "50%",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  noButton: {
    borderColor: colors.secondary,
  },
  noText: {
    color: colors.secondary,
  },
  yesButton: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  yesText: {
    color: "#ffffff",
  },
});