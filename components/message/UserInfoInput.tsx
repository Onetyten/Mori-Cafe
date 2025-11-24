import { setDeliveryAddress, setDeliveryName, setEmail, setPhoneNumber } from '@/store/userInfoSlice'
import { colors, GlobalStyle } from '@/styles/global'
import { RootState } from '@/utils/store'
import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import type { countryCodeType } from '../../types/type'
import { countryCodes } from '../../utils/data'

interface propType{
    setOptions: React.Dispatch<React.SetStateAction<{ name: string; onClick: () => void}[]>>,
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
    getSomethingElseMessage: (message: string) => void,
}


export default function UserInfoInput(props:propType) {
  const [selectedCode,setSelectedCode] = useState<countryCodeType>(countryCodes[0])
  const userInfo = useSelector((state:RootState)=>state.userInfo.userInfo)
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={{maxWidth:"80%",width:"100%",gap:4}}>
        <TextInput keyboardType="default" placeholder='Full name' placeholderTextColor={colors.light} value={userInfo.name} onChangeText={text=> dispatch(setDeliveryName(text))} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />

        <TextInput keyboardType="email-address" placeholder='Email' value={userInfo.email} onChangeText={text=>dispatch(setEmail(text))} placeholderTextColor={colors.light} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />
        
        <View style={{flexDirection:"row",width:"100%",gap:2,borderWidth:1,borderColor: colors.primary,backgroundColor:colors.background,borderRadius:6,flex:1}}>
            <Dropdown data={countryCodes.map((item) => ({label: item.val, value: item.val }))} labelField="label" valueField="value" placeholder={`${selectedCode.val}`}
                value={selectedCode.val ?? null}
                onChange={(item) => {
                  const option = countryCodes.find((opt) => opt.val === item.value);
                  if (option) setSelectedCode(option);
                }}
                style={styles.dropdown}
                placeholderStyle={styles.placeholder}
                selectedTextStyle={styles.input}
            />
          <TextInput keyboardType="number-pad" value={userInfo.phone_number} onChangeText={num=>dispatch(setPhoneNumber(num))} placeholder='Phone number' placeholderTextColor={colors.light} style={[GlobalStyle.Outfit_Regular_body,{flex:1,padding:10,color:colors.primary}]} />

        </View>
        <TextInput keyboardType="default" placeholder='Address' value={userInfo.address} onChangeText={address=>dispatch(setDeliveryAddress(address))} placeholderTextColor={colors.light} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:"100%",
    alignItems:"flex-end"
  },
  textInput:{
    padding:10,
    borderWidth:1,
    borderColor: colors.primary,
    color:colors.primary,
    backgroundColor:colors.background,
    borderRadius:6,
    flex:1
  },
  dropdown: {
    width:70,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor:colors.background,
    borderRadius: 6,
  },
  input: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: 'Outfit_Regular',
    paddingHorizontal:8,
    textTransform: 'capitalize',
  },
  placeholder: {
    fontSize: 18,
    color: colors.light,
    fontFamily: 'Outfit_Regular',
    paddingHorizontal:8,
    textTransform: 'capitalize',
  },
  iconContainer: {
    marginHorizontal:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
