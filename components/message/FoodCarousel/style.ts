import { clamp, colors } from "@/styles/global";
import { StyleSheet } from "react-native";



export const Styles = StyleSheet.create({
    loaderRow:{
        justifyContent:"center",
        alignItems:"center",
        gap:8
    },
    loaderContainer:{
        width:"100%",
        gap:8,
        flexDirection:"row",
        flexWrap:"wrap",
        height:clamp(240,240,350),
    },

    loaderBox:{
        height:"100%",
        backgroundColor:colors.light+"70",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        borderRadius:6
    },
    passiveDot:{
        backgroundColor:"#a2b18a60",
    },
    activeDot:{
        backgroundColor:colors.primary,
    },
    dot:{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    }
})
