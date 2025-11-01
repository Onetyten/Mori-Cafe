import { Text, TouchableOpacity, View } from 'react-native'
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
    <View className="w-full justify-end flex mt-6">
      <View className="flex gap-2 max-w-8/12 flex-row justify-end">
        {options.map((item,index)=>{
          return(
            <TouchableOpacity onPress={item.onClick} key={index} className="p-2 border-2 border-primary rounded-md">
              <Text className='font-outfit-regular text-nowrap text-2xl text-primary'>{item.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}