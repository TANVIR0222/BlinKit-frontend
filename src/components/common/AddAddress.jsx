import { useAddAddressMutation } from "@/app/feature/address/adderssApi";
import { handleAddAddress } from "@/app/feature/address/addressSlice";
import useUser from "@/Hooks/useUser";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispath = useDispatch();

  const [user] = useUser()
  
  
  const [addAddress , {isLoading}] = useAddAddressMutation();

  const onSubmit = async (data) => {
    const { addressline, city, state, pincode, country, mobile } = data;
    console.log(data);
    
    const newAddress = {
      addressline,
      city,
      state,
      pincode,
      country,
      mobile,
    };

    try {
      const {success , data} = await addAddress({...newAddress, id: user?._id }).unwrap();
      
      dispath(handleAddAddress(data))
      
      if(success){
        toast.success("Address Added Successfully")
        close();
        reset();
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div>
      <section className="bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto">
        <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded">
          <div className="flex justify-between items-center gap-4">
            <h2 className="font-semibold">Add Address</h2>
            <button onClick={close} className="hover:text-red-500">
              <IoClose size={25} />
            </button>
          </div>
          <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-1">
              <label htmlFor="addressline">Address Line :</label>
              <input
                type="text"
                id="addressline"
                className="border bg-blue-50 p-2 rounded"
                {...register("addressline", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="city">City :</label>
              <input
                type="text"
                id="city"
                className="border bg-blue-50 p-2 rounded"
                {...register("city", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="state">State :</label>
              <input
                type="text"
                id="state"
                className="border bg-blue-50 p-2 rounded"
                {...register("state", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="pincode">Pincode :</label>
              <input
                type="number"
                id="pincode"
                className="border bg-blue-50 p-2 rounded"
                {...register("pincode", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="country">Country :</label>
              <input
                type="text"
                id="country"
                className="border bg-blue-50 p-2 rounded"
                {...register("country", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="mobile">Mobile No. :</label>
              <input
                type="number"
                id="mobile"
                className="border bg-blue-50 p-2 rounded"
                {...register("mobile", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="bg-green-400 w-full  py-2 font-semibold mt-4 hover:text-white hover:bg-green-800"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddAddress;
