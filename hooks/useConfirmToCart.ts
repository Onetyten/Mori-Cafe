import { AddMessage, NewMessage, removeMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCart } from "../store/currentCartItem";
import type { cartType, FoodType } from "../types/type";
import type { RootState } from "../utils/store";



export default function useConfirmToCart(setLoading:React.Dispatch<React.SetStateAction<boolean>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,addToCart:()=> void,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,isAdding: React.RefObject<boolean>) {
    const dispatch = useDispatch();
    const currentFood = useSelector((state:RootState)=>state.food.food);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    const cart = useSelector((state:RootState)=>state.cart.cart)

    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);
    
    const customiseOrder = useCallback((food:FoodType)=>{
        setShowOptions(false);
        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`Yes`]};
        dispatch(AddMessage(newMessage));
        timers.current.push(setTimeout(()=>{
            const newConfirm:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Please select your options`]};
            dispatch(AddMessage(newConfirm));
        },1000))

        timers.current.push(
            setTimeout(()=>{
                setShowOptions(false);
                const editDisplay:NewMessage = {type:"editList"};
                dispatch(AddMessage(editDisplay));
            },2500) 
        );
    },[dispatch, setShowOptions]);

    const cartFeedback = useCallback(async(message:messageListType)=>{
        let feedBack = ""
        if (!message || message.type !== "cartFeedback") return
        if (!currentFood || !cart) return
        try {
            await api.post('/order/cart/add',cart)
            feedBack = `${currentFood.name} added to your basket`
        }

        catch (error) {
            console.error(error)
            if (isAxiosError(error)){
                feedBack = error.response?.data.message || `Couldn't add ${currentFood.name} to basket, please try again`
            }
            else{
                feedBack = `Couldn't add ${currentFood.name} to basket, please try again`
            }
        }

        finally{
            if (message.next) message.next()
            isAdding.current = false
            console.log(feedBack)
            const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[feedBack]}
            dispatch(AddMessage(newMessage))
            dispatch(removeMessage(message.id))
        }

    },[cart, currentFood, dispatch, isAdding])

    const comfirmToCart = useCallback((message:messageListType)=>{
        if (!message || message.type !== "confirmToCart") return
        if (!currentFood){
            setShowOptions(true);
            return setLoading(false);
        };

        setLoading(true);

        const cartPayload:cartType = {foodId:currentFood._id,quantity:message.value,customisation:[],totalPrice:currentFood.price};
        dispatch(setCurrentCart(cartPayload));
        if (currentFood.customisationId.length>0){
            timers.current.push(
                setTimeout(()=>{
                const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Should I add any custom options to your order${message.value > 1?"s":""}`]};
                dispatch(AddMessage(newMessage));
            },1000));
             timers.current.push(
                setTimeout(()=>{
                    setOptions([{name:'Yes',onClick:()=>customiseOrder(currentFood)},{name:'No', onClick:()=>{
                        const newAnswer:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`No`]};
                        dispatch(AddMessage(newAnswer));
                        addToCart()}}]);
                    setShowOptions(true);
                },2000)
             )
        }
        else{
            addToCart();
        }
    },[addToCart, currentFood, customiseOrder, dispatch, setLoading, setOptions, setShowOptions]) 
        
    
    return {comfirmToCart,cartFeedback}
}
