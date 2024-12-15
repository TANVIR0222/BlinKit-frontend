import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "@/app/feature/auth/authApi";
import { setUser } from "@/app/feature/auth/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userLogin, { isLoading , refetch}] = useUserLoginMutation();

  const onSubmit = async (data) => {
    const login = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await userLogin(login).unwrap();
      const {user} = res;
      if (res.success) {
        reset(); // reset form
        toast.success(res.msg);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/");
        dispatch(setUser({user}));
      }
    } catch (error) {
      setError(error.data.msg);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full bg-blue-50 outline-none"
                name="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-secondary"
            >
              Forgot password ?
            </Link>
          </div>

          <p className="text-red-600 italic">{loginError}</p>

          <button
            className={`bg-slate-900 text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            {isLoading ? <p>Loading...</p> : "Login"}
          </button>
        </form>

        <p>
          Don't have account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
