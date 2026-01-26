import { clamp, colors, GlobalStyle, isPhone, isSmall, isTablet } from "@/styles/global";
import { DimensionValue, StyleSheet } from "react-native";

const columns = isSmall ? 1 : isPhone ? 2 : isTablet ? 3 : 3;


const buttonWidth:DimensionValue = `${(100 / columns)-1.05}%`;

export const styles = StyleSheet.create({
    loaderRow:{
        width:"100%",
        gap:8,
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    loaderContainer:{
        backgroundColor:colors.light+"70",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:6,
        height:clamp(180,180,250),
        width:buttonWidth
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
        width:"90%",
        height:"90%",
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
        justifyContent:"flex-start",
        gap:8,
        flexWrap:"wrap",
    },
    Button:{
        overflow:"hidden",
        borderRadius:10,
        height:clamp(180,180,250),
        backgroundColor:colors.background,
        justifyContent:"center",
        alignItems:"center",
        flexWrap:"wrap",
        width:buttonWidth

    }
})