import { colors, GlobalStyle } from "@/styles/global";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    loaderRow:{
        width:"100%",
        gap:8,
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"center"
    },
    loaderContainer:{
        backgroundColor:colors.light+"70",
        justifyContent:"center",
        alignItems:"center",
        width:"48%",
        height:208,
        borderRadius:6
    },
    backgroundImage:{
        width:"200%",
        height:"200%"
    },
    imageContainer:{
        flex:1,
        zIndex:20,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100%",

    },
    foodImage:{
        objectFit:"contain",
        width:128,
        height:128,
        borderRadius:9999
    },
    nameText:{
        ...GlobalStyle.Outfit_Bold_button,
        color:"#fff",
        textAlign:"center",
        textTransform:"capitalize",
        marginBottom:12,
    },
    parent:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        gap:8,
        flexWrap:"wrap",
    },
    Button:{
        overflow:"hidden",
        borderRadius:10,
        height:180,
        backgroundColor:colors.background,
        justifyContent:"center",
        alignItems:"center",
        width:"48.5%",
    }
})