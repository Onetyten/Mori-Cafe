import useProceedPayment from '@/hooks/useProceedPayment'
import { AddMessage } from '@/store/messageListSlice'
import { colors } from '@/styles/global'
import { ChevronDown } from 'lucide-react-native'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { setOrder } from '../../store/newOrderSlice'
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
  const dispatch = useDispatch()
  const ProceedToPayment = useProceedPayment(setShowOptions)
  const [confirmed,setConfirmed] = useState(false)
  const [selectedCode,setSelectedCode] = useState<countryCodeType>(countryCodes[0])
  const [name,setName] = useState("")
  const [address,setAddress] = useState("")
  const [phoneNum,setPhoneNum] = useState("")
  const [email,setEmail] = useState("")
  const neworder = useSelector((state:RootState)=>state.newOrder.newOrder)
  
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
    setShowOptions(false)
    dispatch(setOrder(value))
    setConfirmed(true)
    const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Name: ${value.name}`,`Delivery Address: ${value.address}`,`Phone number: ${value.phone_number}`]}
    dispatch(AddMessage(newMessage))
    setOptions([{name:'Proceed to payment', onClick:()=>ProceedToPayment()},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
    setShowOptions(true)
  }

  if (confirmed){
    return null
  }

  return (
    <View className="w-full justify-end flex">
      <View className="flex gap-2 max-w-8/12 justify-end text-xs sm:text-sm flex-col">
        <TextInput keyboardType="default" placeholder='Full name' value={name} onChangeText={setName} className="p-2 border w-full rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />
        <TextInput keyboardType="email-address" placeholder='Email' value={email} onChangeText={setEmail} className="p-2 border w-full rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />
        <TextInput keyboardType="default" placeholder='Address' value={address} onChangeText={setAddress} className="p-2 border w-full rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />
        <View className='w-full flex gap-2'>
            <Dropdown data={countryCodes.map((item) => ({label: item.val, value: item.val }))} labelField="label" valueField="value" placeholder={selectedCode.val}
                value={selectedCode.val ?? null}
                onChange={(item) => {
                  const option = countryCodes.find((opt) => opt.val === item.value);
                  if (option) setSelectedCode(option);
                }}
                renderRightIcon={() => (
                  <View style={styles.iconContainer}>
                    <ChevronDown color={colors.primary} size={20} />
                  </View>
                )}
                style={styles.dropdown}
                placeholderStyle={styles.placeholder}
                selectedTextStyle={styles.input}
                iconStyle={{ display: 'none' }}
            />

          <TextInput keyboardType="number-pad" value={phoneNum} onChangeText={setPhoneNum} placeholder='Phone number' className="p-2 border w-full rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />

        </View>
        <TouchableOpacity onPress={SubmitInfo} className="p-2 border select-none rounded-sm cursor-pointer hover:bg-secondary-300/10">
              <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 2,
    backgroundColor: colors.background,
    paddingVertical:0
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
    width: 40,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
