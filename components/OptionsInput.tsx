import { clamp, colors, GlobalStyle } from '@/styles/global'
import { MotiView } from 'moti'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
interface optionType{
  name:string,
  onClick:()=>void
}

interface propType{
  options:optionType[]
}


export default function OptionsInput(props:propType) {
  const {options} = props
  return (
    <View style={styles.container}>
      <View style={styles.optionRow}>
        {options.map((item,index)=>{
          return(
            <MotiView from={{opacity:0, translateX:50}} animate={{opacity:100, translateX:0}} transition={{delay:index*50}} key={index}>
              <TouchableOpacity onPress={item.onClick} style={[styles.button,item.name.length<4?{paddingHorizontal:20}:{}]} >
                <Text numberOfLines={1} ellipsizeMode='tail' style={[GlobalStyle.Outfit_Regular_body,styles.text ]}>{item.name}</Text>
              </TouchableOpacity>
            </MotiView>
            
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems:"flex-end",
    marginTop: 15,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    maxWidth: '80%',
  },
  button: {
    padding: clamp(8,6,12),
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor:colors.background,
    borderRadius: 6,
  },
  text: {
    color: colors.primary,
  
  },
})