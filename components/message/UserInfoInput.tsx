import { AddMessage, NewMessage, updateMessage } from '@/store/messageListSlice'
import { updateOrderInfo } from '@/store/newOrderSlice'
import { setInfo } from '@/store/userInfoSlice'
import { colors, GlobalStyle } from '@/styles/global'
import { messageListType } from '@/types/messageTypes'
import * as Location from 'expo-location'
import { StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import MapView, { MapPressEvent, Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'

import { userDetailsType } from '@/types/type'
import { countryCodes } from '@/utils/data'
import type { RootState } from '../../utils/store'
import { OrderSchema } from '../../utils/validation'

interface propType{
    message:messageListType
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function UserInfoInput(props:propType) {
  const {setShowOptions,message} = props
  const dispatch = useDispatch()

  const newOrder = useSelector((state:RootState)=>state.newOrder.newOrder)
  const {width,height} = useWindowDimensions()
  const isLandscape = width>height
  if (!message || message.type !== "enterInfo") return

  
  function SubmitInfo(){
    if (!message || message.type !== "enterInfo") return
    
    if (!newOrder) return
    const payload = {
      name:message.name,
      address:message.address,
      email:message.email,
      phone_number:message.phone_number.code.val+message.phone_number.number,
    }

    const {error,value} = OrderSchema.validate(payload)
      if (error){
        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot-error",content:[error.message]}
        dispatch(AddMessage(newMessage))
        return
    }

    const infoData:userDetailsType = {
      ...payload,
      phone_number:{
        code:message.phone_number.code.val,
        number:message.phone_number.number
      },
    }

    dispatch(setInfo(infoData))

    setShowOptions(false)
    dispatch(updateOrderInfo(value))
    const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`Name: ${value.name}`,`Delivery Address: ${value.address}`,`Phone number: ${value.phone_number}`]}
    dispatch(AddMessage(newMessage))
    if (message.next) message.next()
  }

  async function selectLocation(e:MapPressEvent){
        dispatch(updateMessage({id:message.id,update:{location:e.nativeEvent.coordinate}}))
        const newAddress = await Location.reverseGeocodeAsync(e.nativeEvent.coordinate)
        if (!newAddress || newAddress?.length===0 || !newAddress[0].formattedAddress) return
        dispatch(updateMessage({id:message.id,update:{address:newAddress[0].formattedAddress}}))
  }


  return (
    <View style={styles.container}>
      <View style={{maxWidth:isLandscape?"45%":"85%",width:"100%",gap:8}}>
        <TextInput keyboardType="default" placeholder='Full name' placeholderTextColor={colors.light} value={message.name} onChangeText={(name)=>{dispatch(updateMessage({id:message.id,update:{name}}))}} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />
        <TextInput autoCapitalize="none" keyboardType="email-address" placeholder='Email' value={message.email} onChangeText={(email)=>dispatch(updateMessage({id:message.id,update:{email:email.trim().toLowerCase()}}))}
          placeholderTextColor={colors.light} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />
        
        <View style={{flexDirection:"row",width:"100%",gap:4}}>
            <Dropdown data={countryCodes.map((item) => ({label: `${item.flag}  ${item.val}`, value: item.val }))} labelField="label" valueField="value" placeholder={`${message.phone_number.code.flag} ${message.phone_number.code.val}`}
                value={message.phone_number.code.val ?? null}
                onChange={(item) => {
                  const option = countryCodes.find((opt) => opt.val === item.value);
                  if (option) {dispatch(updateMessage({id:message.id,update:{phone_number:{code:option,number:message.phone_number.number}}}))}
                }}
                style={styles.dropdown}
                placeholderStyle={styles.placeholder}
                selectedTextStyle={styles.input}
            />
          <TextInput keyboardType="number-pad" value={message.phone_number.number} onChangeText={(number)=>{dispatch(updateMessage({id:message.id,update:{phone_number:{code:message.phone_number.code,number}}}))}} placeholder='Phone number' placeholderTextColor={colors.light} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />

        </View>
        {message.location && 
        <View style={{width:"100%",height:400,overflow:"hidden",borderRadius:6}}>
          <MapView region={{latitude: message.location?.latitude || 37.78825, longitude:message.location?.longitude || -122.4324, latitudeDelta: 0.01, longitudeDelta: 0.01,}} style={{height:"100%",width:"100%",borderRadius:6}} onPress={selectLocation}>
                {message.location&& <Marker coordinate={message.location} />}
          </MapView>
        </View>
        }

        <TextInput keyboardType="default" placeholder='Address' value={message.address} onChangeText={(address)=>{dispatch(updateMessage({id:message.id,update:{address}}))}} placeholderTextColor={colors.light} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />
        
        <View style={styles.optionRow}>
           <TouchableOpacity onPress={SubmitInfo} style={styles.button} >
                <Text numberOfLines={1} ellipsizeMode='tail' style={[GlobalStyle.Outfit_Regular_body,{color: colors.primary,}]}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={message.goBack} style={styles.button} >
                <Text numberOfLines={1} ellipsizeMode='tail' style={[GlobalStyle.Outfit_Regular_body,{color: colors.primary,}]}>Go back</Text>
          </TouchableOpacity>
        </View>

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
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    width:"100%",
    marginTop:16
  },
  dropdown: {
    width:120,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    backgroundColor: colors.background,
    paddingVertical:0
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor:colors.background,
    borderRadius: 6,
  },
  input: {
    ...GlobalStyle.Outfit_Regular_body,
    color: colors.primary,
    fontFamily: 'Outfit_Regular',
    paddingHorizontal:8,
    textTransform: 'capitalize',
  },
  placeholder: {
    ...GlobalStyle.Outfit_Regular_body,
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
