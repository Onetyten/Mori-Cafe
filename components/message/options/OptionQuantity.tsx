import { colors, GlobalStyle } from '@/styles/global';
import type { customisationType, tweakType } from '@/types/type';
import { ImageBackground } from 'expo-image';
import { Minus, Plus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
;




interface propType{
    edit:customisationType,
    tweakList:tweakType[],
    setTweakList:React.Dispatch<React.SetStateAction<tweakType[]>>
}

export default function OptionQuantity(props:propType) {
    const {edit,setTweakList} = props
    const [quantity,setQuantity] = useState(edit.quantity.size)
    const [touched, setTouched] = useState(false);

    useEffect(()=>{
        if (!touched) return
        if (quantity>edit.quantity.max) setQuantity(edit.quantity.max)
        if (quantity<edit.quantity.min) setQuantity(edit.quantity.min)
        if (quantity>0){
            setTweakList((prev) => {
                const existingIndex = prev.findIndex(item=>item.name === edit.name)
                const payload:tweakType = {name:edit.name, type:edit.type, value:quantity.toString(), price:edit.options[0].extraPrice}
                if (existingIndex !== -1){
                    const updated = [...prev]
                    updated[existingIndex] = payload
                    return updated
                }
                return [...prev,payload]
            })
        }
        else{
            setTweakList((prev)=>prev.filter(change=>change.name !== edit.name ))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[quantity,touched])

    function handleSetSize(delta:number){
        setTouched(true)
        if (quantity >= edit.quantity.max && delta > 0) return
        if (quantity <= edit.quantity.min && delta < 0) return
        setQuantity(quantity+delta)
    }

  return (
    <View style={styles.parent}>

        <TouchableOpacity style={styles.button} onPress={()=>handleSetSize(-1)}>
            <ImageBackground style={styles.imageBackground} source={require("../../../assets/images/patterns/pattern.webp")} >
                 <Minus color={colors.primary} size={20} />
            </ImageBackground>
        </TouchableOpacity>

        <View style={styles.textContainer}>
            <Text style={[GlobalStyle.Outfit_Regular_body,{textTransform:"capitalize",textAlign:"center",color:colors.primary}]}>{edit.name}</Text>
            <Text style={[GlobalStyle.Outfit_Regular_body,{color:colors.primary}]}>
                {quantity}
            </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>handleSetSize(1)}>
            <ImageBackground source={require("../../../assets/images/patterns/pattern.webp")} style={styles.imageBackground}>
                <Plus color={colors.primary} size={20} />
            </ImageBackground>
        </TouchableOpacity>
 
    </View>
  )
}

const styles = StyleSheet.create({
  parent: {
    width: 240,
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
    gap:2,
    alignItems:"center"
  },
});