import { useEffect, useState } from 'react';
import Loading from './Loading';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDeleteCartItemQtyMutation, useUpdateCartItemQtyMutation } from '@/app/feature/cart/cartApi';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";

const AddToCartButton = ({data}) => {
    const loading = false;
    const {cart} = useSelector(state => state.cart)
    const [qty, setQty] = useState()
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [cartItemDetails,setCartItemsDetails] = useState()    
    

    //checking this item in cart or not
    useEffect(() => {
        const checkingitem = cart?.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingitem)        

        const product = cart?.find(item => item.productId._id === data._id)
        setQty(product?.quantity)
        setCartItemsDetails(product)
    }, [])    
    

    const [updateCartItemQty] = useUpdateCartItemQtyMutation()
    const [deleteCartItemQty] = useDeleteCartItemQtyMutation()


    const increaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
    
        setQty( qty + 1)

        const {success} = await updateCartItemQty( { id: cartItemDetails?._id, qty}).unwrap();
        
       if(success){
        toast.success("Item added")
       }
    }

    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        if(qty === 1){
            deleteCartItemQty(cartItemDetails?._id)
        }else{
            setQty( qty - 1)
            const {success} = await deleteCartItemQty( { id: cartItemDetails?._id , qty}).unwrap();
            
            if(success){
                toast.success("Item remove")
            }
        }
    }

    return (
    <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex w-full h-full'>
                        <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus /></button>

                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

                        <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus /></button>
                    </div>
                ) : (
                    <button  className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                        {loading ? <Loading /> : "Add"}
                    </button>
                )
            }

        </div>
    );
};

export default AddToCartButton;