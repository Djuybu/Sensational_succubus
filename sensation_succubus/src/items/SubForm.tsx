import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postAddCommunity } from "../items/axios.ts";
import { CloseOutlined } from "@ant-design/icons";

type SubFormProps = {
  setIsAddingSub: any;
};

type Form = {
  name: string;
  description: string;
  rules: string;
};

const SubForm: React.FC<SubFormProps> = (props: any) => {
  const setIsAddingSub = props.setIsAddingSub;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    console.log(data);
    const response = await postAddCommunity(data);
    if (response) {
      setIsAddingSub(false);
    }
  };

  return (
    <div className="fixed flex w-screen h-screen bg-slate-700/75 backdrop-blur-sm z-50">
      <form
        className="bg-black flex flex-col w-1/3 h-3/5 m-auto p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CloseOutlined
          style={{ color: "white", position: "relative", bottom: 0, right: 0 }}
          onClick={(e: React.MouseEvent) => {
            setIsAddingSub(false);
          }}
          // onClick={console.log("OUT!")}
        />
        <div className="text-white text-center">Add new community</div>

        <div className="text-white pb-3">Get a fancy name</div>
        <input
          {...register("name", { required: true })}
          type="text"
          name="name" // Ensure name attribute is set
          className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        />
        {errors.name && (
          <span className="text-red-500">This field is required</span>
        )}

        <div className="text-white pb-3">Describe your community briefly</div>
        <textarea
          {...register("description", { required: true })}
          name="description" // Ensure name attribute is set
          className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        />
        {errors.description && (
          <span className="text-red-500">This field is required</span>
        )}

        <div className="text-white pb-3">Bring here some rules</div>
        <textarea
          {...register("rules", { required: true })}
          name="rules" // Ensure name attribute is set
          className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        />
        {errors.rules && (
          <span className="text-red-500">This field is required</span>
        )}

        <button type="submit" className="bg-slate-200 my-2 p-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
};

export default SubForm;
