import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import UpdateProfile from "./UpdateProfile";
import useUser from "@/Hooks/useUser";
import { useForm } from "react-hook-form";
import { useUserUpdateMutation } from "@/app/feature/auth/authApi";

const Profile = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [user,userData] = useUser();
  
  const [userUpdate , {isLoading}] = useUserUpdateMutation();

  const onSubmit = async (data) => {
    // console.log(data);

    const updateData = {
      id : user?._id,
      name: data.name,
      email: data.email,
      number: data.mobile,
    }

    try {
      const res = await userUpdate(updateData).unwrap();
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }

    
  }



  return (
    <div className="p-4">
      {/**profile upload and display image */}
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {userData?.avatar ? (
          <img alt={userData?.name} src={userData?.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setProfileAvatarEdit(true)}
        className="text-sm min-w-20 border bg-slate-900 text-white hover:border-black hover:bg-slate-900 px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UpdateProfile close={() => setProfileAvatarEdit(false)} user={userData} />
      )}

      {/**name, mobile , email, change password */}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 w-96 outline-none border focus-within:border-black rounded"
            defaultValue={userData?.name}
            name="name"
              {...register("name", { required: true })}
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            defaultValue={userData?.email}
            placeholder="Enter your email"
            className="p-2 bg-blue-50 w-96 outline-none border focus-within:border-black rounded"
            name="email"
            {...register("email", { required: true })}
            />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            defaultValue={userData?.number}
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 w-96 outline-none border focus-within:border-black rounded"
            name="mobile"
            {...register("mobile", { required: true })}
            />
        </div>

        <button className="border w-96 px-4 py-2 font-semibold bg-slate-900 hover:bg-slate-950 text-white rounded">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
