import { useUserResetPasswordMutation } from "@/app/feature/auth/authApi";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetError, setError] = useState("");

  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const location = useLocation();
//   console.log(location.state.email);
  
  useEffect(() => {
    if (!location?.state?.email) {
      toast.error("Email not found");
      navigate("/forgot-password");
    }
  }, []);

  
  const [userResetPassword , {isLoading}] = useUserResetPasswordMutation()

  const onSubmit =async (data) => {
    if (data.newPassword !== data.confirmPassword) {
        toast.error("Password and confirm password must be same");
        return;
    }
    const newPassword ={
        email:location?.state?.email,
        newPassword:data.newPassword,
        confirmPassword:data.confirmPassword,
    }
    console.log(newPassword);

    try {
        const res = await userResetPassword(newPassword).unwrap();
        if(res.success){
            toast.success("Password reset successfully");
            navigate("/login");
            reset()
        }
    } catch (error) {
        setError(error.data.msg);
    }
    
  }

  return (
    <section className="w-full container mx-auto px-2">
       <Helmet>
        <title>Reset Password Page || Blinkeyit</title>
      </Helmet>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter Your Password </p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-black">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full h-7 outline-none"
                name="newPassword"
                placeholder="Enter your new password"
                {...register("newPassword", { required: true })}
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="password"
                className="w-full h-7 outline-none"
                name="confirmPassword"
                placeholder="Enter your confirm password"
                {...register("confirmPassword", { required: true })}

              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
            <p className="text-red-500 italic">{resetError}</p>
            <button
            className={`bg-slate-900 text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
           {isLoading ? <p>Loading...</p> :'Change Password'}
          </button>
        </form>

        <p>
          Already have account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
