import { colors } from "@/styles/global";
import store, { persistor } from "@/utils/store";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { SplashScreen, Stack } from "expo-router";
import { View } from "moti";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { PaystackProvider } from "react-native-paystack-webview";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../global.css";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded,error] = useFonts({
    "Squada_One": require("../assets/font/Squada_One/SquadaOne-Regular.ttf"),
    "Outfit": require("../assets/font/Outfit/Outfit-VariableFont_wght.ttf"),
    "Outfit_Black": require("../assets/font/Outfit/static/Outfit-Black.ttf"),
    "Outfit_Bold": require("../assets/font/Outfit/static/Outfit-Bold.ttf"),
    "Outfit_ExtraBold": require("../assets/font/Outfit/static/Outfit-ExtraBold.ttf"),
    "Outfit_ExtraLight": require("../assets/font/Outfit/static/Outfit-ExtraLight.ttf"),
    "Outfit_Light": require("../assets/font/Outfit/static/Outfit-Light.ttf"),
    "Outfit_Medium": require("../assets/font/Outfit/static/Outfit-Medium.ttf"),
    "Outfit_Regular": require("../assets/font/Outfit/static/Outfit-Regular.ttf"),
    "Outfit_Semibold": require("../assets/font/Outfit/static/Outfit-SemiBold.ttf"),
    "Outfit_Thin": require("../assets/font/Outfit/static/Outfit-Thin.ttf"),
    "Mono" : require("../assets/font/IBM_Plex_Mono/IBMPlexMono-Regular.ttf"),
    "Mono_Bold" : require("../assets/font/IBM_Plex_Mono/IBMPlexMono-Bold.ttf")
  });

  const [gifLoaded, setGifLoaded] = useState(false);
  
  const [showIntro,setShowIntro] = useState(true)
    
    useEffect(()=>{
      if (gifLoaded){
        const timer = setTimeout(()=>{setShowIntro(false)},2600)
        return () => clearTimeout(timer);
      }
    },[gifLoaded])
  

  useEffect(()=>{
    if (error) throw error;
    if (fontsLoaded && gifLoaded){
      SplashScreen.hideAsync();
    }
  },[error, fontsLoaded,gifLoaded]);

  if (!fontsLoaded && !error) return null;
  
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size="large" color="#588159"/>} persistor={persistor}>
        <PaystackProvider debug publicKey="sk_test_6f0d2b7509f6c563144110055836c4833760114b">
          <SafeAreaProvider>
            <View style={{flex:1,backgroundColor:colors.secondary}}>
              {showIntro && <Image source={require("../assets/videos/Animation.gif")} contentFit="cover" style={{ position: "absolute", width: "100%", height: "100%", zIndex: 100 }} onLoadEnd={()=>setGifLoaded(true)} />}

              {gifLoaded &&
              <Stack screenOptions={{
                headerShown:false,
                contentStyle:{backgroundColor:'transparent'}
                }} />}
            </View>
          </SafeAreaProvider>  
        </PaystackProvider>
      </PersistGate>
    </Provider>  
  );
}
