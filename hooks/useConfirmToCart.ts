import type {RootState} from "../utils/store"
import { setCurrentCart } from "../store/currentCartItem"
import { useDispatch, useSelector} from "react-redux"
import type { cartType, FoodType } from "../types/type"
import { AddMessage } from "@/store/messageListSlice";



export default function useConfirmToCart(setLoading:React.Dispatch<React.SetStateAction<boolean>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,addToCart:(foodName: string)=> void,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>) {
    const dispatch = useDispatch()
    const currentFood = useSelector((state:RootState)=>state.food.food)

    async function customiseOrder(food:FoodType){
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Yes`]}
        dispatch(AddMessage(newMessage))
        setTimeout(()=>{
            const newConfirm = {type:"message",next:()=>{}, sender:"bot",content:[`Please select your options`]}
            dispatch(AddMessage(newConfirm))
        },1000)
        setTimeout(()=>{
            setShowOptions(false)
            const editDisplay = {type:"edit-list",next:()=>{}, sender:"user",content:[food.customisationId,food._id]}
            dispatch(AddMessage(editDisplay)) 
        },2500)
    }

    function comfirmToCart (value:number){
        if (!currentFood){
            setShowOptions(true)
            return setLoading(false)
        }
        setLoading(true)
        const cartPayload:cartType = {foodId:currentFood._id,quantity:value,customisation:[],totalPrice:currentFood.price}
        dispatch(setCurrentCart(cartPayload))
        if (currentFood.customisationId.length>0){
            setTimeout(()=>{
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Should I add any custom options to your order${value>1?"s":""}`]}
                dispatch(AddMessage(newMessage))
            },1000)
            setTimeout(()=>{
                setOptions([{name:'Yes',onClick:()=>customiseOrder(currentFood)},{name:'No', onClick:()=>{
                            const newAnswer = {
                            type:"message",next:()=>{}, sender:"user",content:[`No`]}
                            dispatch(AddMessage(newAnswer))
                            addToCart(currentFood.name)}}])

                setShowOptions(true)
            },2000)
        }
        else{
            addToCart(currentFood.name)
        }
    }
    return comfirmToCart
}
