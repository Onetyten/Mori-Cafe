import { LatLng } from 'react-native-maps';
import { countryCodeType, customisationType, FoodType, subCategoryType, tweakType } from "./type";

export interface baseMessage{
    id:string,
}
export type subCategories = "coffee" | "drink" | "snack"
export interface chatMessage extends baseMessage{
  type:"message",
  sender:"bot" | "user" | "bot-error",
  isTyping: boolean,
  next:()=>void,
  content:string[]
  displayedText:string[]
}

export interface subCarouselMessage extends baseMessage{
  type:"subcarousel";
  next?:()=>void;
  subcategory:subCategories;
  content: subCategoryType[];
  fetched: boolean;
}

export interface foodCarouselMessage extends baseMessage{
  type:"foodCarousel";
  next?:()=>void;
  route:string;
  content: FoodType[];
  fetched: boolean;
}

export interface numberInputMessage extends baseMessage{
  type:"numberInput";
  next?:()=>void;
  confirmed:boolean;
  isTyping: boolean;
  value: number;
  error: string;
}
export interface numberCountTrigger extends baseMessage{
  type:"numberCountTrigger";
  next?:()=>void;
  food:FoodType;
}
export interface confirmToCartTrigger extends baseMessage{
  type:"confirmToCart";
  next?:()=>void;
  value:number;
}
export interface cartFeedback extends baseMessage{
  type:"cartFeedback";
  next?:()=>void;
}
export interface orderFeedbackType extends baseMessage{
  type:"orderFeedback";
  next?:()=>void;
}
export interface checkoutList extends baseMessage{
  type:"checkoutList";
  next?:()=>void;
  fetched:boolean;
}
export interface userInputType extends baseMessage{
  type:"enterInfo";
  next?:()=>void;
  location:LatLng | null;
  address:string;
  confirmed:boolean;
  goBack(): void;
  name: string;
  email: string;
  phone_number: {
      code: countryCodeType;
      number: string;
  };
}
export interface editListType extends baseMessage{
  type:"editList";
  next?:()=>void;
  fetched:boolean;
  customisations: customisationType[];
  tweaks: tweakType[];
  confirmed:boolean;
}

export type messageListType = chatMessage | subCarouselMessage | foodCarouselMessage | numberInputMessage | numberCountTrigger | confirmToCartTrigger | cartFeedback | editListType | checkoutList | userInputType | orderFeedbackType