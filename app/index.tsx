// import ChatBox from "@/components/chatBox";
import ChatBox from "@/components/chatBox";
import UserCheck from "@/components/script/userCheck";
import { colors, GlobalStyle } from "@/styles/global";
import Fontisto from '@expo/vector-icons/Fontisto';
import Constants from "expo-constants";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaystackProvider } from "react-native-paystack-webview";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const key = Constants.expoConfig?.extra?.PUBLIC_PAYSTACK_KEY
  if (!key) return null
    
  return (
    <PaystackProvider publicKey={key} currency="NGN" defaultChannels={["card","mobile_money"]}>
      <SafeAreaView style={Styles.container}>
        
          <GestureHandlerRootView>
            
            <UserCheck/>

            <View style={Styles.headerView}>
              <Fontisto name="coffeescript" size={25} color={colors.primary} />
              <Text style={[GlobalStyle.squada_h1,Styles.headerText]}>Mori cafe</Text>
            </View>

            <ChatBox/>              

            <Image source={require('../assets/images/floral/flora.webp')} contentFit="contain" style={{position: 'absolute',right: '-10%',bottom: 0,opacity: 0.4,width: '60%',height: '30%',zIndex: -10}} />

            <StatusBar hidden={true}/>
   
        </GestureHandlerRootView>
        
        
      </SafeAreaView>
    </PaystackProvider>
  );
}

const Styles = StyleSheet.create({
  container:{
    width:"100%",
    position:"absolute",
    height:"100%",
    justifyContent:"flex-start",
    alignContent:"center",
    backgroundColor:colors.background
  },
  headerView:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    paddingVertical:wp("3.5%"),
    gap:8,
    paddingHorizontal:wp("3%"),
    color:colors.primary
  },
  headerText:{
    textTransform:"capitalize",
    color:colors.primary
  },

})
