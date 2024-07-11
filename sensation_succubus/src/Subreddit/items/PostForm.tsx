import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postNewPost } from "../../items/axios.ts";

export type Form = {
  id: string;
  userId: string;
  subId: string;
  title: string;
  body: string;
  image: string;
};

const defaultForm: Form = {
  userId: "2",
  subId: "3",
  title: "",
  body: "",
  image: "",
};

type PostFormProps = {
  setIsCreatingPost: any;
};

const PostForm: React.FC<PostFormProps> = (props: any) => {
  const setIsCreatingPost = props.setIsCreatingPost;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (await postNewPost(data)) {
      setIsCreatingPost(false);
    }
  };
  return (
    <>
      <div className="flex w-screen h-screen bg-slate-700/75 backdrop-blur-sm z-50">
        <form
          className="bg-black flex flex-col w-1/3 h-3/5 m-auto p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CloseOutlined
            style={{
              color: "white",
              position: "relative",
              bottom: 0,
              right: 0,
            }}
            onClick={(e: React.MouseEvent) => {
              setIsCreatingPost(false);
            }}
            // onClick={console.log("OUT!")}
          />
          <div className="text-white text-center">Create your post</div>

          <div className="text-white pb-3">Get a fancy name</div>
          <input
            {...register("title", { required: true })}
            type="text"
            name="name" // Ensure name attribute is set
            className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
          />
          {errors.title && (
            <span className="text-red-500">This field is required</span>
          )}

          <div className="text-white pb-3">Tell us what happened?</div>
          <textarea
            {...register("body", { required: true })}
            name="description" // Ensure name attribute is set
            className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
          />
          {errors.title && (
            <span className="text-red-500">This field is required</span>
          )}

          <button type="submit" className="bg-slate-200 my-2 p-2 rounded">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default PostForm;
