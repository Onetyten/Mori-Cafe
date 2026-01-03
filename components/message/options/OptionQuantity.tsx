import { deleteTweak, UpdateTweakList } from '@/store/messageListSlice';
import { colors, GlobalStyle } from '@/styles/global';
import type { customisationType, tweakType } from '@/types/type';
import { Minus, Plus } from 'lucide-react-native';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';


interface propType {
  customisation : customisationType;
  messageId:string
}

const OptionQuantity = memo(function OptionQuantity(props:propType) {
    const {width,height} = useWindowDimensions()
    const landscape = width>height
    const dynamicWidth = landscape ? "40%" : "70%";
    const {customisation,messageId} = props
    const [quantity,setQuantity] = useState(customisation.quantity.size)
    const dispatch = useDispatch()


    function handleSetSize(delta:number){
        if (quantity >= customisation.quantity.max && delta > 0) return
        if (quantity <= customisation.quantity.min && delta < 0) return
        const value = quantity+delta
        setQuantity(quantity+delta)

        if (value > customisation.quantity.max) setQuantity(customisation.quantity.max)
        if (value < customisation.quantity.min) setQuantity(customisation.quantity.min)
        if (value>0){
            const payload:tweakType = {name:customisation.name, type:customisation.type, value:value.toString(), price:customisation.options[0].extraPrice}
            dispatch(UpdateTweakList({id:messageId,value:payload}))
        }
        else{
          dispatch(deleteTweak({id:messageId,name:customisation.name}))
        }
    }

  return (
    <View style={[styles.parent,{width: dynamicWidth}]}>

        <TouchableOpacity style={styles.button} onPress={()=>handleSetSize(-1)}>
             <View style={styles.imageBackground}>
                 <Minus color={colors.primary} size={20} />
            </View>
        </TouchableOpacity>

        <View style={styles.textContainer}>
            <Text style={[GlobalStyle.Outfit_Regular_body,{textTransform:"capitalize",textAlign:"center",color:colors.primary}]}>{customisation.name}</Text>
            <Text style={[GlobalStyle.Outfit_Regular_body,{color:colors.primary}]}>
                {quantity}
            </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>handleSetSize(1)}>
            <View style={styles.imageBackground}>
                <Plus color={colors.primary} size={20} />
            </View>
        </TouchableOpacity>
 
    </View>
  )
})

export default OptionQuantity

const styles = StyleSheet.create({
  parent: {
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
    backgroundColor:"#a2b18a30",
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