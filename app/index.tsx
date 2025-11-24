// import ChatBox from "@/components/chatBox";
import ChatBox from "@/components/chatBox";
import Comfirmation from "@/components/confirmation";
import UserCheck from "@/components/script/userCheck";
import { colors, GlobalStyle } from "@/styles/global";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={Styles.container}>
          <UserCheck/>
          <View style={Styles.headerView}>
            <Fontisto name="coffeescript" size={25} color={"#588159"} />
            <Text style={[GlobalStyle.squada_h1,Styles.headerText]}>Mori cafe</Text>
          </View>

          <ChatBox/>      
          <Comfirmation/>          

          <Image source={require('../assets/images/floral/flora.webp')} contentFit="contain" transition={1000} style={{position: 'absolute',right: '-10%',bottom: 0,opacity: 0.4,width: '60%',height: '30%',zIndex: -10}} />

      <StatusBar hidden={true}/>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container:{
    width:"100%",
    position:"absolute",
    height:"100%",
    overflow:"hidden",
    justifyContent:"flex-start",
    alignContent:"center"
  },
  headerView:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    paddingVertical:16,
    gap:8,
    paddingHorizontal:24,
    color:colors.primary
  },
  headerText:{
    textTransform:"capitalize",
    color:colors.primary
  },

})
