import { Dimensions, PixelRatio, Platform } from "react-native";




const {width} = Dimensions.get("window")

const scale = width / 372;

export function normalize(size:number){
    const newSize = size * scale;
    if (Platform.OS==="ios"){
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    else{
        return Math.round(PixelRatio.roundToNearestPixel(newSize))-2;
    }
}