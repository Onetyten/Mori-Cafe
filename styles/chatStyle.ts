import { StyleSheet } from "react-native";
import { colors } from "./global";

export const chatStyles = StyleSheet.create({
    botchatBubble:{
        backgroundColor:colors.primary,
        color:colors.background,
        padding:8,
        borderRadius:8,
    },
    chatBubble:{
        backgroundColor:colors.light,
        color:"#fff",
        padding:8,
        borderRadius:8,
    },
    chatBubbleText:{
        color:"#fff",
    },
    firstBotBubble: {
        borderTopLeftRadius: 0,
    },
    firstChatBubble: {
        borderTopRightRadius: 0,
    },
    botBubbleContainer:{
        justifyContent:"flex-start",
        alignItems:"center",
        color:colors.primary,
    },
    chatBubbleContainer:{
        alignItems:"flex-end",
        color:colors.primary,
    },
    chatBubbleLoaderContainer:{
        justifyContent:"flex-start",
        alignItems:"flex-end",
        color:colors.primary,
    },
    botBubbleLoader:{
        backgroundColor:colors.primary,
        height:36,
        padding:10,
        paddingHorizontal:24,
        borderRadius:8,
    },
    chatBubbleLoader:{
        backgroundColor:colors.light,
        height:36,
        padding:10,
        paddingHorizontal:24,
        borderRadius:8,
    },
    oneWord:{
        textTransform:"capitalize",
        paddingHorizontal:30
    },
    botImageContainer:{
        width:45,
        height:45,
        backgroundColor:colors.primary,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:9999,
    },
    botMessageView:{
        gap:4,
        alignItems:"flex-start",
        maxWidth:"75%",
    },
    chatMessageView:{
        gap:4,
        alignItems:"flex-end",
        maxWidth:"80%"
    }

})

