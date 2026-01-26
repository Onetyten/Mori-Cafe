import { StyleSheet } from "react-native";
import { clamp, colors } from "./global";

export const chatStyles = StyleSheet.create({
  botchatBubble: {
    backgroundColor: colors.primary,
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  chatBubble: {
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    textAlign: "left",
  },
  errorChatBubble: {
    backgroundColor: colors.danger,
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  chatBubbleText: {
    color: "#fff",
  },
  firstBotBubble: {
    borderTopLeftRadius: 0,
  },
  firstChatBubble: {
    borderTopRightRadius: 0,
  },
  botBubbleContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  chatBubbleContainer: {
    alignItems: "flex-end",
    borderRadius: 8,
    backgroundColor: colors.light,
    overflow: "hidden",
  },
  chatBubbleLoaderContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    color: colors.primary,
  },
  botBubbleLoader: {
    backgroundColor: colors.primary,
    height: clamp(44,44,48),
    paddingHorizontal: 24,
    borderRadius: 8,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  chatBubbleLoader: {
    backgroundColor: colors.light,
    height: clamp(44,44,48),
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  oneWord: {
    textTransform: "capitalize",
    paddingHorizontal: 30,
  },
  botImageContainer: {
    width: 45,
    height: 45,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
  },
  botMessageView: {
    gap: 4,
    alignItems: "flex-start",
    maxWidth: "75%",
  },
  chatMessageView: {
    gap: 4,
    alignItems: "flex-end",
    maxWidth: "70%",
  },
});
