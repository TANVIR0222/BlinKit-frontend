import { useEffect, useState } from 'react';
import Loading from './Loading';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useAddToCartMutation, useDeleteCartItemMutation, useDeleteCartItemQtyMutation, useUpdateCartItemQtyMutation } from '@/app/feature/cart/cartApi';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import useUser from '@/Hooks/useUser';

const AddToCartButton = ({data}) => {
    const {cart} = useSelector(state => state.cart)
    const [qty, setQty] = useState()
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [cartItemDetails,setCartItemsDetails] = useState()   
    const navigate = useNavigate();  


    //checking this item in cart or not
    useEffect(() => {
        const checkingitem = cart?.some(item => item.productId?._id === data?._id)
        setIsAvailableCart(checkingitem)        

        const product = cart?.find(item => item.productId?._id === data?._id)
        setQty(product?.quantity)
        setCartItemsDetails(product)
    }, [data,cart])    
    

    const [updateCartItemQty] = useUpdateCartItemQtyMutation()
    const [deleteCartItemQty] = useDeleteCartItemQtyMutation()
    const [deleteCartItem] = useDeleteCartItemMutation()
    const {user} = useSelector((state) => state.auth)    

    const increaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
    
        const newQty = qty + 1; 
        setQty(newQty);        
        const {success} = await updateCartItemQty({id: cartItemDetails?._id,qty: newQty}).unwrap();
    
       if(success){
        toast.success("Item added")
       }
    }

    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        if(qty === 1){
            const {message} = await deleteCartItem({productId: data._id ,  id: user?._id}).unwrap();            
            toast.success(`${message}`)
        }else{
            const newQty = qty - 1; 
            setQty(newQty); 
            const {success} = await deleteCartItemQty( { id: cartItemDetails?._id , qty: newQty}).unwrap();
            
            if(success){
                toast.success("Item remove")
            }
        }
    }

    const [addToCart , { error, isLoading }] = useAddToCartMutation();
  
    const handleAddToCart = async(e) => {
      e.preventDefault(); 
      e.stopPropagation(); 
  
      const addNewProduct =  {
        productId : data?._id,
        id :user?._id,
      }
    
      try {
        if(user){
        const {message} = await addToCart(addNewProduct).unwrap();
        toast.success(message);
        }else{
            Swal.fire({
                title: "You ar not logged in",
                text: "Please login to add to  the card? ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log in !"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login');
                }
            });
        }
  
      } catch (error) {
        toast.error(error?.data?.msg);
        
      }
   
    };

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
                    <button onClick={handleAddToCart}  className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                        {isLoading ? <Loading /> : "Add"}
                    </button>
                )
            }

        </div>
    );
};

export default AddToCartButton;
