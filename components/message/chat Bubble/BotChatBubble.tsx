import { chatStyles } from '@/styles/chatStyle';
import { GlobalStyle } from '@/styles/global';
import { Text } from 'react-native';


interface propTypes{
    message:string;
    sender:string;
    index:number;
}

export default function BotChatBubble(props:propTypes) {
    const {message,index,sender} = props
  return (
     <Text style={[GlobalStyle.Outfit_Regular_body,sender === "bot-error"?chatStyles.errorChatBubble:chatStyles.botchatBubble,index === 0&&chatStyles.firstBotBubble]} >
        {message}
    </Text>
  )
}