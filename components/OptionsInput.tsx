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
    <View className="w-full justify-end flex">
      <View className="flex gap-2 max-w-8/12 justify-end">
        {options.map((item,index)=>{
          return(
            <TouchableOpacity onPress={item.onClick} key={index} className="p-2 border border-primary select-none text-primary text-nowrap rounded-sm backdrop-blur-md cursor-pointer hover:bg-secondary-200/10 ">
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}