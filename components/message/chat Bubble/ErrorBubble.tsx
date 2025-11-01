import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';

interface propTypes{
    message:string
}

export default function ErrorBubble(props:propTypes) {
    const {message} = props
  return (
        <View className='bg-primary text-background flex gap-1 rounded-2xl text-xs p-2.5 px-4 rounded-tl-none' >
            <MaterialIcons name='error' size={24} className='text-red-500 text-xl'/>
            <Text>{message}</Text>
        </View>
  )
}
