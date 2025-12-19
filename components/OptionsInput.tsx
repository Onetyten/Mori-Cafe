import { colors, GlobalStyle } from '@/styles/global'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
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
            <TouchableOpacity onPress={item.onClick} key={index} style={styles.button} >
              <Text numberOfLines={1} ellipsizeMode='tail' style={[GlobalStyle.Outfit_Regular_body,styles.text]}>{item.name}</Text>
            </TouchableOpacity>
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
    marginTop: wp("3%"),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: wp("2%"),
    maxWidth: '80%',
  },
  button: {
    padding: wp("1.5%"),
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor:colors.background,
    borderRadius: 6,
  },
  text: {
    color: colors.primary,
  
  },
})