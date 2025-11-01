import type {RootState} from "../utils/store"
import { setCurrentCart } from "../store/currentCartItem"
import { useDispatch, useSelector} from "react-redux"
import type { cartType, FoodType, messageListType } from "../types/type"



export default function useConfirmToCart(setLoading:React.Dispatch<React.SetStateAction<boolean>>,setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,addToCart:(foodName: string)=> void,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>) {

    const dispatch = useDispatch()
    const currentFood = useSelector((state:RootState)=>state.food.food)

    async function customiseOrder(food:FoodType){
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Yes`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setTimeout(()=>{
            const newConfirm = {type:"message",next:()=>{}, sender:"bot",content:[`Please select your options`]}
            setMessageList((prev)=>[...prev, newConfirm ])
        },1000)
        setTimeout(()=>{
            setShowOptions(false)
            const editDisplay = {type:"edit-list",next:()=>{}, sender:"user",content:[food.customisationId,food._id]}
            setMessageList((prev)=>[...prev, editDisplay ])   
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
                setMessageList((prev)=>[...prev, newMessage ])
            },1000)
            setTimeout(()=>{
                setOptions([{name:'Yes',onClick:()=>customiseOrder(currentFood)},{name:'No', onClick:()=>{
                            const newAnswer = {
                            type:"message",next:()=>{}, sender:"user",content:[`No`]}
                            setMessageList((prev)=>[...prev, newAnswer ])
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
