import { colors, GlobalStyle } from '@/styles/global';
import { Checkbox } from "expo-checkbox";
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { customisationType, tweakType } from '../../../types/type';



interface propType{
    edit:customisationType,
    tweakList:tweakType[],
    setTweakList:React.Dispatch<React.SetStateAction<tweakType[]>>
}

const OptionCheckbox = memo (function OptionCheckbox(props:propType) {
    const {edit,tweakList,setTweakList} = props
    const [isChecked,setIsChecked] = useState(false)

    useEffect(()=>{
        if (isChecked){
            const property = tweakList.find(property=>property.name === edit.name)
            if (property) return
            const payload:tweakType = {name:edit.name,type:edit.type,value:isChecked?"true":"false",price:edit.options[0].extraPrice}
            setTweakList((prev)=>[...prev, payload])
        }
        else{
            setTweakList((prev)=>prev.filter(change=>change.name !== edit.name ))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isChecked])
    

  return (
    <View style={styles.parent}>
            <Text style={[GlobalStyle.Outfit_Regular_body,{textTransform:"capitalize",textAlign:"center",paddingHorizontal:8,color:colors.primary}]}>{edit.name}</Text>

            <View style={styles.imageBackground} >
                <Checkbox color={colors.primary} value={isChecked} onValueChange={setIsChecked}/>
            </View>
    </View>
  )
})

export default OptionCheckbox
 
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