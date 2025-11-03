import { chatStyles } from '@/styles/chatStyle';
import { colors, GlobalStyle } from '@/styles/global';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';

interface propTypes{
    message:string
}

export default function ErrorBubble(props:propTypes) {
    const {message} = props
  return (
        <View style={[chatStyles.botchatBubble,chatStyles.firstBotBubble]} >
            <MaterialIcons name='error' size={24} style={{color:colors.danger}}/>
            <Text style={GlobalStyle.Outfit_Regular_body}>{message}</Text>
        </View>
  )
}

