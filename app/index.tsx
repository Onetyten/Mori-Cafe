// import ChatBox from "@/components/chatBox";
import ChatBox from "@/components/chatBox";
import Comfirmation from "@/components/confirmation";
import UserCheck from "@/components/script/userCheck";
import { colors, GlobalStyle } from "@/styles/global";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaystackProvider } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const key = process.env.EXPO_PUBLIC_PAYSTACK_KEY
  if (!key) return console.log(`no "PAYSTACK_PUBLIC_KEY" found in the .env`)
    
  return (
    <PaystackProvider publicKey={key} currency="NGN" defaultChannels={["card","mobile_money"]}>
      <SafeAreaView style={Styles.container}>
            <UserCheck/>
            <View style={Styles.headerView}>
              <Fontisto name="coffeescript" size={25} color={colors.primary} />
              <Text style={[GlobalStyle.squada_h1,Styles.headerText]}>Mori cafe</Text>
            </View>

            <ChatBox/>      
            <Comfirmation/>          

            <Image source={require('../assets/images/floral/flora.webp')} contentFit="contain" transition={1000} style={{position: 'absolute',right: '-10%',bottom: 0,opacity: 0.4,width: '60%',height: '30%',zIndex: -10}} />

        <StatusBar hidden={true}/>
      </SafeAreaView>
    </PaystackProvider>
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
