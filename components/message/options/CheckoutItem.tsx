import { deleteOrder } from '@/store/OrderCartList';
import { colors, GlobalStyle } from '@/styles/global';
import { messageListType } from '@/types/messageTypes';
import api from '@/utils/api';
import { RootState } from '@/utils/store';
import { Minus, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { cartListType } from '../../../types/type';


interface propType{
    food:cartListType,
    message:messageListType
}

export default function CheckoutItem(props:propType) {
    const {food,message} = props
    const [quantity,setQuantity] = useState(food.quantity)
    const {width,height} = useWindowDimensions()
    const landscape = width>height
    const dynamicWidth = landscape ? "40%" : "70%";
    const [parentHeight,setParentHeight] = useState(80)
    const dispatch = useDispatch()
    const cartList = useSelector((state:RootState)=>state.orderList.orderList)

    async function handleDelete() {
        const itemId = food._id
        if (!itemId || message.type !== "checkoutList") return
        const isLast = cartList.filter((item) => item && item.foodId).length <= 1
        dispatch(deleteOrder(itemId))
        await api.delete(`/order/cart/delete/${itemId}`)
        if (isLast){
          message.final()
        }
    }

    function handleChange(delta:number){
        const value = quantity+delta
        if (value>=10) setQuantity(10)
        else if (value<1){
            setQuantity(1)
            Alert.alert("Confirmation",`Are you sure you want to remove ${food.foodId.name} from your tab`,
              [{text:"Yes",onPress:handleDelete},
              {text:"No",style:'cancel'}])
        }
        else setQuantity(q=>q+delta)
    }


  return (
    <View style={[styles.parent,{width: dynamicWidth}]} onLayout={(e)=>setParentHeight(e.nativeEvent.layout.height)}>
        <Image source={{uri:food.foodId.imageUrl}} style={styles.foodImage} />
        <View style={styles.viewContainer}>
            <Text style={[GlobalStyle.Outfit_Semibold_body,{textTransform:"capitalize",textAlign:"left",color:"#fff"}]}>
                {food.foodId.name}
            </Text>
            <View style={{flexDirection:"row",justifyContent:"center", gap:8,marginBottom:6}}>
                <Text style={[GlobalStyle.Outfit_Regular_small,{color:"#fff"}]}>
                    &#8358; {food.totalPrice}
                </Text>
                <Text style={[GlobalStyle.Outfit_Regular_small,{color:"#fff"}]}>
                   x {quantity}
                </Text>
            </View>
        </View>

        <View style={{justifyContent:"space-between",height:(parentHeight/2)-10}}>
              <TouchableOpacity style={styles.button} onPress={()=>handleChange(1)}>
                <View style={styles.iconBackground}>
                    <Plus color={"#fff"} size={20} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>handleChange(-1)}>
                  <View style={styles.iconBackground} >
                        <Minus color={"#fff"} size={20} />
                  </View>
              </TouchableOpacity>
            
        </View>

        

    </View>
  )
}

const styles = StyleSheet.create({
  parent: {
    minHeight:80,
    borderRadius: 8,
    borderTopRightRadius:0,
    gap:8,
    borderWidth: 0,
    backgroundColor: colors.light,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  foodImage:{
    objectFit:"contain",
    borderRadius:9999,
    width:60,
    height:60
  },
  button: {
    flex: 0,
    width: 40
  },
  iconBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    flexShrink: 1,
    width:"100%",
    justifyContent:"space-between",
    alignItems:"flex-start",
    gap:10,
  },
});