import { AddMessage, NewMessage } from "@/store/messageListSlice";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCart } from "../store/currentCartItem";
import type { cartType, FoodType } from "../types/type";
import type { RootState } from "../utils/store";



export default function useConfirmToCart(setLoading:React.Dispatch<React.SetStateAction<boolean>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,addToCart:(foodName: string)=> void,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>) {
    const dispatch = useDispatch();
    const currentFood = useSelector((state:RootState)=>state.food.food);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])

    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);
    
    const customiseOrder = useCallback((food:FoodType)=>{
        setShowOptions(false);
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Yes`]};
        dispatch(AddMessage(newMessage));
        timers.current.push(setTimeout(()=>{
            const newConfirm = {type:"message",next:()=>{}, sender:"bot",content:[`Please select your options`]};
            dispatch(AddMessage(newConfirm));
        },1000))

        timers.current.push(
            setTimeout(()=>{
                setShowOptions(false);
                const editDisplay = {type:"edit-list",next:()=>{}, sender:"user",content:[food.customisationId,food._id]};
                dispatch(AddMessage(editDisplay));
            },2500) 
        );
        
    },[dispatch, setShowOptions]);

    const comfirmToCart = useCallback((value:number)=>{
        if (!currentFood){
            setShowOptions(true);
            return setLoading(false);
        };
        setLoading(true);
        const cartPayload:cartType = {foodId:currentFood._id,quantity:value,customisation:[],totalPrice:currentFood.price};
        dispatch(setCurrentCart(cartPayload));
        if (currentFood.customisationId.length>0){
            timers.current.push(
                setTimeout(()=>{
                const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Should I add any custom options to your order${value>1?"s":""}`]};
                dispatch(AddMessage(newMessage));
            },1000));
             timers.current.push(
                setTimeout(()=>{
                    setOptions([{name:'Yes',onClick:()=>customiseOrder(currentFood)},{name:'No', onClick:()=>{
                        const newAnswer:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`No`]};
                        dispatch(AddMessage(newAnswer));
                        addToCart(currentFood.name)}}]);
                    setShowOptions(true);
                },2000)
             )
            
        }
        else{
            addToCart(currentFood.name);
        }
    },[addToCart, currentFood, customiseOrder, dispatch, setLoading, setOptions, setShowOptions]) 
        
    
    return comfirmToCart
}
