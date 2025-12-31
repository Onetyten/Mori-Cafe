import { FoodType, subCategoryType } from "./type";

export interface baseMessage{
    id:string,
}
export type subCategories = "coffee" | "drink" | "snack"
export interface chatMessage extends baseMessage{
  type:"message",
  sender:"bot" | "user",
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
  type:"food-list";
  next?:()=>void;
  route:string;
  content: FoodType[];
  fetched: boolean;
}


export type messageListType = chatMessage | subCarouselMessage | foodCarouselMessage