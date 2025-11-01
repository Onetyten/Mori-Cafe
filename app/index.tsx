import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {


  return (
    <SafeAreaView className="p-5 flex justify-center items-center h-screen">
      <Text className="text-5xl font-Squada text-primary">Edit app/index.tsx to edit this screen.</Text>
      <StatusBar hidden={true}/>
    </SafeAreaView>
  );
}
