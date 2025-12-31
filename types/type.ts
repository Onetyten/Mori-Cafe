export interface subCategoryType {
  _id: string
  name: string
  categoryId: string
  imageUrl: string
  v: number
}


export interface FoodType {
  _id: string;
  __v: number;
  available: boolean;
  calories: number;
  categoryId: string;
  customisationId: string[];
  imageUrl: string;
  name: string;
  price: number;
  subCategoryId: string;
}

export interface optionType{
  label: string,
  extraPrice: number
}

export interface customisationType{
    name:string,
    type:string,
    options: optionType[],
    quantity:{
        min:number,
        max:number,
        size:number
    }
}
export interface tweakType{
  name:string,
  type:string,
  value:string,
  price:number
}

export interface cartType{
  foodId:string
  quantity:number
  customisation:tweakType[],
  totalPrice:number
}

export interface cartListType
{
    _id:string,
    quantity: number,
    totalPrice: number,
    foodId: {
      name: string,
      imageUrl:string,
    }
}

export interface orderType{
  name:string,
  address:string,
  email:string
  phone_number:string,
  items:cartListType[]
}

export interface countryCodeType {
    flag: string,
    val: string,
}


export interface CustomisationType {
  name: string;
  type: string;
  value: string;
  _id: string;
}

export interface OrderItem {
  _id: string;
  quantity: number;
  priceAtPurchase: number;
  foodId: {
    _id:string,
    name:string,
    price: number,
    imageUrl: string
  }
}

export interface FetchedOrderType {
  _id: string;
  userId: string;
  status: "pending" | "completed" | "canceled";
  items: OrderItem[];
  name: string;
  reference: string;
  payment_url: string;
  access_code: string;
  email: string;
  address: string;
  phone_number: string;
  total: number;
  placedAt: string;
  paidAt?: string;
  __v: number;
}
