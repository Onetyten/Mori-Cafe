import { Text } from 'react-native'


interface propTypes{
    message:string,
    index:number,
}

export default function BotChatBubble(props:propTypes) {
    const {message,index} = props
  return (
        <Text className={`bg-primary text-background text-xl p-2.5 px-6 font-outfit-regular rounded-2xl ${index===0?"rounded-tl-none":""}`} >
            {message}
        </Text>
  )
}
