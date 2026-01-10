import { chatStyles } from '@/styles/chatStyle';
import { GlobalStyle } from '@/styles/global';
import { MotiText } from 'moti';


interface propTypes{
    message:string;
    sender:string;
    index:number;
}

export default function BotChatBubble(props:propTypes) {
    const {message,index,sender} = props
  return (
     <MotiText from={{translateX:-5,translateY:5,opacity:0}} animate={{translateX:0,translateY:0,opacity:100}} transition={{duration:400, type:"timing"}} style={[ GlobalStyle.Outfit_Regular_body, sender === "bot-error"?chatStyles.errorChatBubble:chatStyles.botchatBubble,
      index === 0&&chatStyles.firstBotBubble,message.length<4&&{width:90,textAlign:"center"}]} >
        {message}
    </MotiText>
  )
}