import { receiptHtml } from "@/data/receiptHtml";
import { colors, GlobalStyle } from "@/styles/global";
import type { FetchedOrderType } from "@/types/type";
import api from "@/utils/api";
import * as FileSystem from "expo-file-system/legacy";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { SquareArrowOutUpRight } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



interface ReceiptProps {
    order: FetchedOrderType
}


export default function HistoryReceipt ({order}:ReceiptProps){
    const [loading,setLoading] = useState(false)
    const [cancelled,setCancelled] = useState(false)
    const [cancelMessage,setCancelMessage] = useState("Cancel order")
    const html = receiptHtml(order)

    async function savePdf(){
        if (loading) return
        try {
            setLoading(true)
            const filename = `Mori Cafe Receipt-${order.reference} ${new Date(order.placedAt).toLocaleString(undefined,{year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"})}.pdf`;

            const pdf = await printToFileAsync({html, base64:false });
            if (Platform.OS === "android"){
                const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
                if (!permission.granted) return
                const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
                    permission.directoryUri,filename,"application/pdf"
                )
                const base64 = await FileSystem.readAsStringAsync(pdf.uri,{
                    encoding: FileSystem.EncodingType.Base64,
                })
                await FileSystem.writeAsStringAsync(fileUri,base64,{encoding:FileSystem.EncodingType.Base64})
                Alert.alert("Saved as PDF");
                console.log(permission.directoryUri)
            }

            else {
                const destination = FileSystem.documentDirectory + filename;
                await FileSystem.moveAsync({from:pdf.uri,to:destination})
                Alert.alert("Saved as PDF");
            }
            
            
        }
        catch (error:any) {
            console.log("Failed to save PDF",error)

            if (Platform.OS === "android" && error?.message?.includes(`'ExponentFileSystem.createSAFFileAsync' has been rejected`) && error?.message?.includes("isn't writable.")){
                Alert.alert("Error", "The folder you selected is not allowed. Please select or create a subfolder in Downloads or Documents and try again.");
                return
            }
            
            Alert.alert("Error", "Failed to save PDF");
        }
        finally{
            setLoading(false)
        }
    }

    async function sharePdf(){
        const pdf = await printToFileAsync({html, base64:false });
        await shareAsync(pdf.uri)
    }

    const deleteOrder = async(id:string)=>{
        if (cancelled) return
        async function cancelOrder(){
            if(loading) return
            try {
                setCancelMessage("Canceling")
                setLoading(true)
                await api.delete(`/order/delete/${id}`)
                setCancelled(true)
                setCancelMessage("order cancelled") 
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catch (error) {
                setCancelMessage("please try again")
            }
            finally{
                setLoading(false)
            }

        }
        Alert.alert("Confirm","Are you sure you want to cancel this order",[{text:"No"},{text:"Yes",onPress:()=>{
            cancelOrder()
        }}])
    }

  return (  
    <View style={style.parent}>        
        <View style={style.container}>
            <Image source={require("@/assets/images/logo.png")} style={[StyleSheet.absoluteFill,style.backgroundImage]}/>
            <View style={style.bodyContainer}>     
                <Text style={style.titleText}>Order {order._id}</Text> 

                <View style={style.infoContainer}>
                    <View style={style.infoView}>
                        <Text style={style.infoTitle}>Name:</Text>
                        <Text style={style.infoDetails}>{order.name}</Text>
                    </View>

                    <View style={style.infoView}>
                        <Text style={style.infoTitle}>Date:</Text>
                        <Text style={style.infoDetails}>{new Date(order.placedAt).toLocaleString(undefined,{year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}</Text>
                    </View>

                    <View style={style.infoView}>
                        <Text style={style.infoTitle}>Payment status:</Text> 
                        <Text style={[style.infoDetails,order.status==="completed"?{color:colors.success}:{color:colors.danger} ]}>{order.status}
                        </Text>
                    </View>
                </View>

                <ScrollView scrollEnabled={true} contentContainerStyle={{gap:8}} overScrollMode="auto" showsVerticalScrollIndicator={false} style={style.itemScroll}>
                    {order.items.map((item,index) => (
                        <View key={index} style={style.itemRow} >
                            <Text style={style.infoDetails}>
                                {item.foodId.name}  {item.quantity>1?`x${item.quantity}`:""}
                            </Text>
                            
                            <Text style={style.infoDetails}>₦{item.priceAtPurchase}</Text>
                        </View>
                    ))}

                    <View className="flex-row justify-between py-0.5 w-full">
                        <Text style={style.infoDetails}>
                            Delivery fee
                        </Text>
                        <Text style={style.infoDetails}>₦0</Text>
                    </View>
                </ScrollView>

                <View style={[style.itemRow,{justifyContent:"flex-end"}]}>
                    <Text style={style.infoDetails}>Total: ₦{order.total}</Text>
                </View>

                {order.status==="completed"?(
                    <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"center",width:"100%",gap:8}}> 
                        <TouchableOpacity onPress={savePdf} style={{borderRadius:6,borderWidth:2,borderColor:colors.success,padding:4,flex:1}}>
                            <Text style={[GlobalStyle.Mono_Bold_body,{textAlign:"center",width:"100%"}]} > Download Receipt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sharePdf}>
                            <SquareArrowOutUpRight/>
                        </TouchableOpacity>                        
                    </View>
                ):(
                    <TouchableOpacity onPress={()=>{deleteOrder(order._id)}} style={{width:"100%"}}> 
                        <Text style={[{...GlobalStyle.Mono_Bold_body, textTransform:"capitalize",textAlign:"center",width:"100%",padding:4}, cancelled?{backgroundColor:colors.muted,color:"#fff"}:{backgroundColor:colors.danger}]}>
                           {cancelMessage}
                        </Text>
                    </TouchableOpacity>
                )}
                
            </View>
        </View>
    </View>
  )
}


const style = StyleSheet.create({
    parent:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        position:"relative"
    },
    container:{
        width:300,
        maxWidth:"100%",
        backgroundColor:"#fff",
        position:"relative",
        justifyContent:"center",
    },
    backgroundImage:{
        width:"100%",
        height:"100%",
        opacity:0.15
    },
    bodyContainer:{
        padding:20,
        width:"100%",
        position:"relative",
        justifyContent:"center",
        alignItems:"center",
        gap:16
    },
    titleText:{
        ...GlobalStyle.Mono_small,
        width:"100%",
        textAlign:"left"
    },
    infoContainer:{
        paddingVertical:8,
        borderStyle:"dashed",
        borderTopWidth:2,
        borderBottomWidth:2,
        borderColor:colors.light,
        width:"100%",
        gap:6
    },
    infoTitle:{
        ...GlobalStyle.Mono_Bold_small,
        color:colors.light
    },
    infoView:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        padding:0,
        gap:2
    },
    infoDetails:{
        ...GlobalStyle.Mono_small,
        textTransform:"capitalize"
    },
    itemScroll:{
        width:"100%",
        height:192,

    },
    itemRow:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"100%"
    }

})