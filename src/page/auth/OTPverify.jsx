import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { useUserForgotOTPVerifyMutation } from "@/app/feature/auth/authApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const OTPverify = () => {
  const navigate = useNavigate();

  // using email resive from previous page
  const location = useLocation();
  //   jodi kon karone email na pawya jay taholw /forgot-password page a jabe
  useEffect(() => {
    if (!location?.state?.email) {
      toast.error("Email not found");
      navigate("/forgot-password");
    }
  }, []);
//   error message state
  const [otpError, setError] = useState("");
  const { register, handleSubmit } = useForm();
  //   redux
  const [userForgotOTPVerify, { isLoading}] =
    useUserForgotOTPVerifyMutation();

    // send otp to user
  const onSubmit = async (data) => {
    const otp = {
      otp: data.otp,
      email: location?.state?.email,
    };

    try {
      const res = await userForgotOTPVerify(otp).unwrap();
      if (res.success) {
        toast.success("Otp verify success");
        navigate("/resrt-password",{
            state: {
                email: location?.state?.email,
            }
        });
      }
    } catch (error) {
      setError(error.data.msg);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter OTP</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP </label>
            <div className="flex w-full items-center  justify-center  mt-3">
              <InputOTP
                id="otp"
                maxLength={6}
                {...register("otp", { required: true })}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <p className="text-red-500 italic">{otpError}</p>
          <button
            className={`bg-slate-900 text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
           {isLoading ? <p>Loading...</p> :'OTP Verify'}
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

export default OTPverify;
