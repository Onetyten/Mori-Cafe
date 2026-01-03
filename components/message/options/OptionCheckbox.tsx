import { deleteTweak, UpdateTweakList } from '@/store/messageListSlice';
import { colors, GlobalStyle } from '@/styles/global';
import { Checkbox } from "expo-checkbox";
import React, { memo, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';
import type { customisationType } from '../../../types/type';

interface propType {
  customisation : customisationType;
  messageId:string
}

const OptionCheckbox = memo (function OptionCheckbox(props:propType) {
    const {width,height} = useWindowDimensions()
    const landscape = width>height
    const dynamicWidth = landscape ? "40%" : "70%";
    const {customisation,messageId} = props
    const dispatch  = useDispatch()
    const [isChecked,setIsChecked] = useState(false)
    

  return (
    <View style={[styles.parent,{width: dynamicWidth}]}>
            <Text style={[GlobalStyle.Outfit_Regular_body,{textTransform:"capitalize",textAlign:"center",paddingHorizontal:8,color:colors.primary}]}>{customisation.name}</Text>

            <View style={styles.imageBackground} >
                <Checkbox color={colors.primary} value={isChecked} onValueChange={(e)=>{
                  setIsChecked(e)
                  if (e === true){
                      const payload = {name:customisation.name,type:customisation.type,value:e===true?"true":"false",price:customisation.options[0].extraPrice}
                      dispatch(UpdateTweakList({id:messageId,value:payload}))
                  }
                  else{
                    dispatch(deleteTweak({id:messageId,name:customisation.name}))
                  }
                }}/>
            </View>
    </View>
  )
})

export default OptionCheckbox
 
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
    flex: 0,
    width: 40,
    alignSelf: "stretch",
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