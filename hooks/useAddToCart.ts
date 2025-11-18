import { AddMessage } from "@/store/messageListSlice";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";



export default function useAddToCart(
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
    CartList: () => void,
    getSomethingElseMessage:(message: string) => void,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,
    isAdding: React.RefObject<boolean>
    ) {
    const cleanUpTimeoutRef = useRef<number|null>(null);
    const addCartTimeoutRef = useRef<number|null>(null);
    const dispatch = useDispatch();

    const addToCartCleanup=useCallback(()=>{  
        setLoading(false);
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}]);
        cleanUpTimeoutRef.current = setTimeout(()=>{
            setShowOptions(true);
        },1000)},[CartList, getSomethingElseMessage, setLoading, setOptions, setShowOptions]
    );

    const addToCart = useCallback((foodName:string)=>{
        if (isAdding.current) return;
        isAdding.current = true;
        setShowOptions(false);
        addCartTimeoutRef.current = setTimeout(()=>{
            setShowOptions(false);
            const CartfeedBack = {type:"cart-feedback",next:addToCartCleanup, sender:"bot",content:[foodName]};
            dispatch(AddMessage(CartfeedBack));
        },500)},[addToCartCleanup, dispatch, isAdding, setShowOptions]
    );

    useEffect(() => {
        return () => {
            if (cleanUpTimeoutRef.current !== null) clearTimeout(cleanUpTimeoutRef.current);
            if (addCartTimeoutRef.current !== null) clearTimeout(addCartTimeoutRef.current);
        };
  }, []);

    return {addToCart,addToCartCleanup}
}
