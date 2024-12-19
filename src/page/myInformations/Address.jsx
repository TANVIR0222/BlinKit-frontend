import { useDeleteAddressMutation, useGetUserAddressQuery } from "@/app/feature/address/adderssApi";
import AddAddress from "@/components/common/AddAddress";
import EditeAddressDetails from "@/components/common/EditeAddressDetails";
import Loading from "@/components/common/Loading";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useUser from "@/Hooks/useUser";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const Address = () => {
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})

  const [user] = useUser();
  const {data: addresses, isLoading, error} = useGetUserAddressQuery(user?._id); 
  
  const [deleteAddress , {isLoading: addressLoading}] = useDeleteAddressMutation();

  const handleDisableAddress = async(id)=>{
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then( async(result) => {
        if (result.isConfirmed) {
          await deleteAddress(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your address has been deleted.",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  return isLoading ? <LoadingSpinner /> : (
    <div className=''>
        <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center '>
            <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
            <button onClick={()=>setOpenAddress(true)} className='border border-primary-200 text-primary-200 px-3 hover:bg-primary-200 hover:text-black py-1 rounded-full'>
                Add Address
            </button>
        </div>
        <div className='bg-blue-50 p-2 grid gap-4'>
              {
                addresses?.data?.map((address,index)=>
                      <div key={address._id} className={`border rounded p-3 flex gap-3 bg-white ${!address.status && 'hidden'}`}>
                          <div className='w-full'>
                            <p><span className=" font-semibold">Loaction :</span> {address.address_line}</p>
                            <p><span className=" font-semibold">City :</span> {address.city}</p>
                            <p><span className=" font-semibold">State : </span>{address.state}</p>
                            <p><span className=" font-semibold">Country : </span>{address.country} - <span className=" font-semibold">Pincode :</span>{address.pincode}</p>
                            <p><span className=" font-semibold">Number: </span>{address.mobile}</p>
                          </div>
                          <div className=' grid gap-10'>
                            <button onClick={()=>{
                              setOpenEdit(true)
                              setEditData(address)
                            }} className='bg-green-200 p-1 rounded  hover:text-white hover:bg-green-600'>
                              <MdEdit/>
                            </button>
                            <button onClick={()=>
                              handleDisableAddress(address._id)
                            } className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'>
                              {addressLoading ?<Loading /> : <MdDelete size={20}/>  }  
                            </button>
                          </div>
                      </div>
                )
              }
        </div>

        {
          openAddress && (
            <AddAddress close={()=>setOpenAddress(false)}/>
          )
        }

        {
          OpenEdit && (
            <EditeAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
          )
        }
    </div>
  );
};

export default Address;
