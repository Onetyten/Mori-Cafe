// import ChatBox from "@/components/chatBox";
import ChatBox from "@/components/chatBox";
import Comfirmation from "@/components/confirmation";
import UserCheck from "@/components/script/userCheck";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Image } from 'expo-image';
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className='w-screen h-screen relative overflow-hidden flex justify-start items-center'>
          <UserCheck/>
          <View className="w-full flex-row justify-start items-center px-6 pt-4 gap-2">
            <Fontisto name="coffeescript" size={25} color={"#588159"} />
            <Text className="text-primary capitalize text-4xl font-Squada">Mori cafe</Text>
          </View>

          <ChatBox/>      
          <Comfirmation/>          
    
          <Image source={require('../assets/images/floral/flora.webp')} contentFit="contain" transition={1000} style={{position: 'absolute',right: '-10%',bottom: 0,opacity: 0.4,width: '60%',height: '30%',zIndex: -10}} />


      <StatusBar hidden={true}/>
    </SafeAreaView>
  );
}
