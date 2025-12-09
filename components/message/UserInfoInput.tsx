import useProceedPayment from '@/hooks/useProceedPayment'
import { AddMessage } from '@/store/messageListSlice'
import { setOrder } from '@/store/newOrderSlice'
import { setInfo } from '@/store/userInfoSlice'
import { colors, GlobalStyle } from '@/styles/global'
import * as Location from 'expo-location'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import MapView, { LatLng, MapPressEvent, Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import type { countryCodeType } from '../../types/type'
import { countryCodes } from '../../utils/data'
import type { RootState } from '../../utils/store'
import { OrderSchema } from '../../utils/validation'

interface propType{
    setOptions: React.Dispatch<React.SetStateAction<{ name: string; onClick: () => void}[]>>,
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
    getSomethingElseMessage: (message: string) => void,
}


export default function UserInfoInput(props:propType) {
  const {setOptions,setShowOptions,getSomethingElseMessage} = props
  const userInfo = useSelector((state:RootState)=>state.userInfo.userInfo)
  const dispatch = useDispatch()
  const ProceedToPayment = useProceedPayment(setShowOptions)
  const confirmed = useRef<boolean>(false)
  const [selectedCode,setSelectedCode] = useState<countryCodeType>(countryCodes[0])
  const [name,setName] = useState(userInfo.name)
  const [address,setAddress] = useState(userInfo.address)
  const [phoneNum,setPhoneNum] = useState(userInfo.phone_number.number)
  const [email,setEmail] = useState(userInfo.email)
  const neworder = useSelector((state:RootState)=>state.newOrder.newOrder)
  const [selectedLocation, setSelectedLocation] = useState< LatLng | null >(null)


  async function getLocation(){
    const {status} = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") return null
    const loc = await Location.getCurrentPositionAsync({})
    const address = await Location.reverseGeocodeAsync({
      longitude:loc.coords.longitude,
      latitude:loc.coords.latitude
    })
    setSelectedLocation({longitude:loc.coords.longitude, latitude:loc.coords.latitude})
    return address
  }

  useEffect(()=>{
    getLocation().then((address)=>{
      if (!address || address?.length===0 || !address[0].formattedAddress) return
      setAddress(address[0].formattedAddress)
      console.log(address[0].formattedAddress)
    })
  },[])
  
  function SubmitInfo(){
    if (!neworder) return
    const payload = {
      name:name,
      address:address,
      email:email,
      phone_number:selectedCode.val+phoneNum,
      items:neworder.items
    }
    
  

  const {error,value} = OrderSchema.validate(payload)
    if (error){
      const newMessage = {type:"message",next:()=>{}, sender:"bot-error",content:[error.message]}
      dispatch(AddMessage(newMessage))
      return
    }
    const infoData = {
      name:name,
      address:address,
      email:email,
      phone_number:{
        code:selectedCode.val,
        number:phoneNum
      },
    }
    dispatch(setInfo(infoData))
    setShowOptions(false)
    dispatch(setOrder(value))
    const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Name: ${value.name}`,`Delivery Address: ${value.address}`,`Phone number: ${value.phone_number}`]}
    dispatch(AddMessage(newMessage))
    setOptions([{name:'Proceed to payment', onClick:()=>ProceedToPayment()},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
    setShowOptions(true)
    confirmed.current = true
  }
  
  function goBack(){
    confirmed.current = true
    getSomethingElseMessage("Let's continue")
    setShowOptions(true)
  }

  async function selectLocation(e:MapPressEvent){
    setSelectedLocation(e.nativeEvent.coordinate)
    const newAddress = await Location.reverseGeocodeAsync(e.nativeEvent.coordinate)
    if (!newAddress || newAddress?.length===0 || !newAddress[0].formattedAddress) return
    setAddress(newAddress[0].formattedAddress)
  }

  if (confirmed.current === true){
    return null
  }

  return (
    <View style={styles.container}>
      <View style={{maxWidth:"90%",width:"100%",gap:8}}>
        <TextInput keyboardType="default" placeholder='Full name' placeholderTextColor={colors.light} value={name} onChangeText={setName} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />
        <TextInput keyboardType="email-address" placeholder='Email' value={email} onChangeText={setEmail} placeholderTextColor={colors.light} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />
        
        <View style={{flexDirection:"row",width:"100%",gap:4}}>
            <Dropdown data={countryCodes.map((item) => ({label: `${item.flag}  ${item.val}`, value: item.val }))} labelField="label" valueField="value" placeholder={`${selectedCode.flag} ${selectedCode.val}`}
                value={selectedCode.val ?? null}
                onChange={(item) => {
                  const option = countryCodes.find((opt) => opt.val === item.value);
                  if (option) setSelectedCode(option);
                }}
                style={styles.dropdown}
                placeholderStyle={styles.placeholder}
                selectedTextStyle={styles.input}
            />
          <TextInput keyboardType="number-pad" value={phoneNum} onChangeText={setPhoneNum} placeholder='Phone number' placeholderTextColor={colors.light} style={[GlobalStyle.Outfit_Regular_body,styles.textInput]} />

        </View>
        <View style={{width:"100%",height:400,overflow:"hidden",borderRadius:6}}>
          <MapView region={{latitude: selectedLocation?.latitude || 37.78825, longitude:selectedLocation?.longitude || -122.4324, latitudeDelta: 0.01, longitudeDelta: 0.01,}} style={{height:"100%",width:"100%",borderRadius:6}} onPress={selectLocation}>
                {selectedLocation&& <Marker coordinate={selectedLocation} />}
          </MapView>
        </View>

        
        <View style={styles.optionRow}>
           <TouchableOpacity onPress={SubmitInfo} style={styles.button} >
                <Text numberOfLines={1} ellipsizeMode='tail' style={[GlobalStyle.Outfit_Regular_body,{color: colors.primary,}]}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goBack} style={styles.button} >
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
    width:95,
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
