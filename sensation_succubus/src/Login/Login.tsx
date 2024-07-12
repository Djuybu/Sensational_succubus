import React, { useState } from "react";
import logo from "../resources/logo.png";
import { FacebookFilled, DiscordFilled } from "@ant-design/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { postLogin } from "../items/axios.ts";
import { setId } from "../items/redux/session.reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../items/redux/store.ts";
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

interface Login {
  username: string;
  password: string;
}

interface DecodedToken {
  exp: number;
  [key: string]: any; // Additional properties can be present
}

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Login>();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      if (await postLogin(data.username, data.password)) {
        redirect("/");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      <div className="bg-black w-screen h-screen flex items-center justify-center">
        <div className="bg-neutral-600 w-2/5 h-1/2 flex rounded-2xl">
          <form className="w-1/2 px-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              <div className="text-2xl font-bold text-white py-5 items-center">
                Log in
              </div>
              <div className="py-5 items-center flex">
                <div className="flex items-center rounded-full">
                  <FacebookFilled
                    style={{
                      color: "white",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </div>
                <div className="flex items-center rounded-full">
                  <DiscordFilled
                    style={{
                      color: "white",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="text-xl text-white font-medium py-2">Username</div>
            <input
              className="w-4/5 bg-gray-500 rounded-md text-xl outline-none pl-1"
              type="text"
              placeholder="Username"
              {...register("username", { required: "true" })}
            />
            <div className="text-xl text-white font-medium py-2">Password</div>
            <input
              className="w-4/5 bg-gray-500 rounded-md text-xl outline-none pl-1"
              type="text"
              placeholder="Password"
              {...register("password", { required: "true" })}
            />
            <br></br>
            <button
              className="bg-gray-700 mt-3 w-4/5 text-xl text-white rounded-md"
              type="submit"
            >
              Log in
            </button>
            {errors.password?.type === "required" && (
              <p role="alert">"Password is required"</p>
            )}

            {errors.username?.type === "required" && (
              <p role="alert">"Username is required"</p>
            )}

            <div className="text-xs mt-1 cursor-pointer">
              Forgot your password? Click here
            </div>
            <div
              onClick={() => {
                navigate("/signup");
              }}
              className="text-xs mt-1 cursor-pointer"
            >
              Or create new account
            </div>
          </form>
          <div className="w-1/2 border-l flex items-center justify-center">
            <div className="flex items-center justify-center">
              <img className="w-20" src={logo} alt="" />
              <div className="text-white text-3xl">Đít đỏ</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
