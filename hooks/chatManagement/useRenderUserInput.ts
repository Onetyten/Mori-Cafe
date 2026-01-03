
import { updateMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import * as Location from 'expo-location';
import { useCallback } from "react";
import { MapPressEvent } from "react-native-maps";
import { useDispatch } from "react-redux";

export default function useRenderUserInput (setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,getSomethingElseMessage: (message: string) => void,setOptions: React.Dispatch<React.SetStateAction<{ name: string; onClick: () => void }[]>>) {
    
    const dispatch = useDispatch()
    const delay = (ms:number) => new Promise(resolve=>setTimeout(resolve,ms))



    const renderUserInput = useCallback(async (message:messageListType)=>{
            if (!message || message.type !== "enterInfo") return

            function goBack(message:messageListType){
                if (!message || message.type !== "enterInfo") return
                dispatch(updateMessage({id:message.id,update:{confirmed:true}}))
                getSomethingElseMessage("Let's continue")
                setShowOptions(true)
            }

            async function selectLocation(e:MapPressEvent){
                dispatch(updateMessage({id:message.id,update:{location:e.nativeEvent.coordinate}}))
                const newAddress = await Location.reverseGeocodeAsync(e.nativeEvent.coordinate)
                if (!newAddress || newAddress?.length===0 || !newAddress[0].formattedAddress) return
                dispatch(updateMessage({id:message.id,update:{address:newAddress[0].formattedAddress}}))
            }
            
            async function getLocation(message:messageListType){
                if (!message || message.type !== "enterInfo") return
                dispatch(updateMessage({id:message.id,update:{goBack:()=> goBack(message)}}))

                const {status} = await Location.requestForegroundPermissionsAsync()
                if (status !== "granted") return null
                const loc = await Location.getCurrentPositionAsync({})
                
                const address = await Location.reverseGeocodeAsync({
                longitude:loc.coords.longitude,
                latitude:loc.coords.latitude
                })
                dispatch(updateMessage({id:message.id,update:{location:{longitude:loc.coords.longitude, latitude:loc.coords.latitude}}}))
                return address
            }

            getLocation(message).then((address)=>{
                if (!address || address?.length===0 || !address[0].formattedAddress) return
                dispatch(updateMessage({id:message.id,update:{address:address[0].formattedAddress}}))
            })

    },[dispatch, getSomethingElseMessage, setShowOptions])
        

    

    return {renderUserInput}
}