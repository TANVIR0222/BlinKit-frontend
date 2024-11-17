import { useUserForgotPasswordMutation } from "@/app/feature/auth/authApi";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const [forgotError, setError] = useState("");

  const [userForgotPassword,{isLoading}] = useUserForgotPasswordMutation();

  const onSubmit =async (data) => {
    const email = data.email;
    console.log({email});
    

    try {
      const res = await userForgotPassword({ email }).unwrap();
      console.log(res);
      if(res.success){
        toast.success('Cheak your email send OPT');
      }
    } catch (error) {
      setError(error.data.msg);
      
    }

  }


    return (
      <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
          <p className='font-semibold text-lg'>Forgot Password </p>
          <form className='grid gap-4 py-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-1'>
                  <label htmlFor='email'>Email</label>
                  <Input
                      type='email'
                      id='email'
                      className='bg-blue-50 p-2 border rounded outline-none w-full'
                      name='email'
                      placeholder='Enter your email'
                      {...register("email", { required: true })}
                  />
                        {errors.email && <span className="text-red-700 italic" >This field is required</span>}
              </div>
              <p className="text-red-700 italic" >{forgotError}</p>
       
              <button  className={` bg-slate-900 text-white py-2 rounded font-semibold my-3 tracking-wide`}>Send Otp</button>

          </form>

          <p>
              Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
          </p>
      </div>
  </section>
    );
};

export default ForgotPassword;