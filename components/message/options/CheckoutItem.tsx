import { colors, GlobalStyle } from '@/styles/global';
import { Minus, Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setDeleteCartItem } from '../../../store/cartDeleteSlice';
import type { cartListType } from '../../../types/type';


interface propType{
    food:cartListType,
}

export default function CheckoutItem(props:propType) {
    const {food} = props
    const [quantity,setQuantity] = useState(food.quantity)
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
    <View style={styles.parent}>
        <TouchableOpacity style={styles.button} onPress={()=>handleChange(-1)}>
             <View style={styles.imageBackground} >
                  <Minus color={colors.primary} size={20} />
             </View>
        </TouchableOpacity>

        <View style={styles.textContainer}>
            <Text style={[GlobalStyle.Outfit_Semibold_body,{textTransform:"capitalize",textAlign:"center",color:colors.primary}]}>
                {food.foodId.name}
            </Text>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"center",paddingHorizontal:10, gap:6}}>
                <Text style={[GlobalStyle.Outfit_Regular_small,{color:colors.primary}]}>
                    &#8358; {food.totalPrice}
                </Text>
                <Text style={[GlobalStyle.Outfit_Regular_small,{color:colors.primary}]}>
                   x {quantity}
                </Text>
            </View>
         </View>

        <TouchableOpacity style={styles.button} onPress={()=>handleChange(1)}>
            <View style={styles.imageBackground}>
                <Plus color={colors.primary} size={20} />
            </View>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  parent: {
    width: 270,
    minHeight: 48,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  button: {
    flex: 0,
    width: 40,
  },
  imageBackground: {
    flex: 1,
    // alignSelf: "stretch",
    backgroundColor:"#a2b18a30",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexShrink: 1,
    paddingHorizontal: 4,
    padding:2,
    gap:8,
    alignItems:"center"
  },
});