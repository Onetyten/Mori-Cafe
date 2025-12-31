import { colors } from "@/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputParent:{
    width:"100%",
    gap:4,
    alignItems:"flex-end",
  },
  inputContainer:{
    maxWidth:"80%",
    gap:4,
    flexDirection:"row",
    justifyContent:"flex-end"
  },
  confirmText:{
    padding:8,
    borderWidth:1,
    borderRadius:4,
  },
  errorText:{
    color:colors.danger
  },
  button: {
    padding: 8,
    borderWidth: 1,
    textAlign:"center",
    borderColor: colors.primary,
    backgroundColor:colors.background,
    borderRadius: 6,
  },
  text: {
    color: colors.primary,
  
  },

})