import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Signup {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Signup> = async (data) => {};
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form className="bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            {...register("username", { required: "true" })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: "true" })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            {...register("password", { required: "true" })}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="********"
            {...register("confirmPassword", { required: "true" })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          {errors.password?.type === "required" && (
            <div> Password is required</div>
          )}

          {errors.email?.type === "required" && <div>Email is required</div>}

          {errors.username?.type === "required" && (
            <div>Username is required</div>
          )}

          {errors.password !== errors.confirmPassword && (
            <div>Your password is not correct!</div>
          )}
        </div>
        <div
          onClick={() => {
            navigate("/login");
          }}
          className="text-white cursor-pointer"
        >
          Already have an account? Click to sign in
        </div>
      </form>
    </div>
  );
};

export default Signup;
