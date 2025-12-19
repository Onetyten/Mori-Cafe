import { colors, GlobalStyle } from '@/styles/global';
import { Minus, Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setDeleteCartItem } from '../../../store/cartDeleteSlice';
import type { cartListType } from '../../../types/type';


interface propType{
    food:cartListType,
}

export default function CheckoutItem(props:propType) {
    const {food} = props
    const [quantity,setQuantity] = useState(food.quantity)
    const {width,height} = useWindowDimensions()
    const landscape = width>height
    const dynamicWidth = landscape ? "40%" : "70%";
    const [parentHeight,setParentHeight] = useState(80)
    const dispatch = useDispatch()

    useEffect(()=>{
        if (quantity>10) return setQuantity(10)
        if (quantity<1){
            setQuantity(1)
            dispatch(setDeleteCartItem(food))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[quantity])

    function handleChange(delta:number){
        setQuantity(quantity+delta)
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