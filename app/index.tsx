import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded,error] = useFonts({
    
  });
  
  useEffect(()=>{
    if (error) throw error;
    if (fontsLoaded){
      SplashScreen.hideAsync()
    }
  },[error, fontsLoaded]);
  if (!fontsLoaded && !error) return null

  return (
    <SafeAreaView style={{padding:20}}>
      <Text className="text-3xl text-lime-500">Edit app/index.tsx to edit this screen.</Text>
      <StatusBar hidden={true}/>
    </SafeAreaView>
  );
}
