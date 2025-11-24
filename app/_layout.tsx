import { colors } from "@/styles/global";
import store, { persistor } from "@/utils/store";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
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
  });
  
  useEffect(()=>{
    if (error) throw error;
    if (fontsLoaded){
      SplashScreen.hideAsync();
    }
  },[error, fontsLoaded]);
  if (!fontsLoaded && !error) return null;
  
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size="large" color="#588159"/>} persistor={persistor}>
        <SafeAreaProvider>
          <Stack screenOptions={{
            headerShown:false,
            contentStyle:{backgroundColor:colors.background}
            }} />
        </SafeAreaProvider>  
      </PersistGate>
    </Provider>  
  );
}
