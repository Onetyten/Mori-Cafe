import { colors, GlobalStyle } from '@/styles/global';
import { ImageBackground } from 'expo-image';
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
             <ImageBackground style={styles.imageBackground} source={require("../../../assets/images/patterns/pattern.webp")} >
                  <Minus color={colors.primary} size={20} />
             </ImageBackground>
        </TouchableOpacity>

        <View style={styles.textContainer}>
            <Text style={[GlobalStyle.Outfit_Regular_body,{textTransform:"capitalize",textAlign:"center",color:colors.primary}]}>
                {food.foodId.name}
            </Text>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
                <Text style={[GlobalStyle.Outfit_Regular_body,{color:colors.primary}]}>
                    &#8358; {food.totalPrice}
                </Text>
                <Text style={[GlobalStyle.Outfit_Regular_body,{color:colors.primary}]}>
                   x {quantity}
                </Text>
            </View>
         </View>

        <TouchableOpacity style={styles.button} onPress={()=>handleChange(1)}>
            <ImageBackground source={require("../../../assets/images/patterns/pattern.webp")} style={styles.imageBackground}>
                <Plus color={colors.primary} size={20} />
            </ImageBackground>
        </TouchableOpacity>

    </View>
  )
}



//   return (
//     <View style={styles.parent}>

//         <TouchableOpacity style={styles.button} onPress={()=>handleSetSize(-1)}>
//             <ImageBackground style={styles.imageBackground} source={require("../../../assets/images/patterns/pattern.webp")} >
//                  <Minus color={colors.primary} size={20} />
//             </ImageBackground>
//         </TouchableOpacity>



//         <TouchableOpacity style={styles.button} onPress={()=>handleSetSize(1)}>
//             <ImageBackground source={require("../../../assets/images/patterns/pattern.webp")} style={styles.imageBackground}>
//                 <Plus color={colors.primary} size={20} />
//             </ImageBackground>
//         </TouchableOpacity>
 
//     </View>
//   )
// }

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
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexShrink: 1,
    paddingHorizontal: 4,
    padding:2,
    gap:20,
    alignItems:"center"
  },
});