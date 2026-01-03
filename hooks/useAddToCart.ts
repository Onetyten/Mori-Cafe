import { AddMessage, NewMessage } from "@/store/messageListSlice";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";



export default function useAddToCart(
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
    CartList: () => void,
    getSomethingElseMessage:(message: string) => void,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,
    ) {

    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);
    const dispatch = useDispatch();
    const isAdding = useRef(false)

    const addToCartCleanup=useCallback(()=>{  
        setLoading(false);
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}]);
        timers.current.push(
            setTimeout(()=>{
                setShowOptions(true);
            },1000))
        },[CartList, getSomethingElseMessage, setLoading, setOptions, setShowOptions]
    );

    const addToCart = useCallback(()=>{
        if (isAdding.current) return;
        isAdding.current = true;
        setShowOptions(false);
        timers.current.push(setTimeout(()=>{
            setShowOptions(false);
            const CartfeedBack:NewMessage = {type:"cartFeedback",next:()=>{addToCartCleanup()}};
            dispatch(AddMessage(CartfeedBack));
        },500))
    },[addToCartCleanup, dispatch, setShowOptions]
    
    );
    return {addToCart,addToCartCleanup,isAdding}
}
