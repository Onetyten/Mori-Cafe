import { AddMessage } from "@/store/messageListSlice";
import { useDispatch } from "react-redux";



export default function useAddToCart(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,CartList: () => void,getSomethingElseMessage:(message: string) => void,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,isAdding: React.RefObject<boolean>) {
    const dispatch = useDispatch()
    function addToCart(foodName:string){
        if (isAdding.current) return
        isAdding.current = true
        setShowOptions(false)
        setTimeout(()=>{
            setShowOptions(false)
            const CartfeedBack = {type:"cart-feedback",next:addToCartCleanup, sender:"bot",content:[foodName]}
            dispatch(AddMessage(CartfeedBack))
        },500)
    }

    function addToCartCleanup(){
        setLoading(false)
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
        setTimeout(()=>{
            setShowOptions(true)
        },1000)
    }

    return {addToCart,addToCartCleanup}
}
