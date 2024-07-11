import React, { useEffect, useState } from "react";
import Test from "./fatboy.jfif";
import { Sub } from "../items/entity/Sub";
import { BellOutlined, FileAddOutlined, PlusOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import { getPostFromSub } from "../items/axios.ts";
import ThreadProp, { Thread } from "../items/ThreadProps.tsx";
import PostForm from "./items/PostForm.tsx";

const Subreddit: React.FC<Sub> = (props: any) => {
  const sub: Sub = props.sub;

  const headerMenuItem = [
    {
      key: "Create",
      icon: <PlusOutlined style={{ color: "white" }} />,
      onClick: () => {
        setIsCreatingPost(true);
      },
    },
    {
      key: "Noti",
      icon: <BellOutlined style={{ color: "white" }} />,
    },
  ];

  const [threads, setThreads] = useState<Thread[]>([]);
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const newThreads = await getPostFromSub(sub.key.toString());
        setThreads((prevThreads) => [...prevThreads, ...newThreads]);
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      }
    };

    fetchThreads();
  }, [sub.key]);
  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <div className="flex items-center">
          <img
            src={Test}
            alt=""
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="text-white text-xl pl-4">{sub.name}</div>
        </div>
        <Menu
          mode="horizontal"
          items={headerMenuItem}
          style={{ backgroundColor: "black", color: "white" }}
        />
      </Header>
      {isCreatingPost ? (
        <PostForm setIsCreatingPost={setIsCreatingPost} />
      ) : (
        <></>
      )}
      <div className="flex">
        <div className="w-3/4 text-white">
          {threads.map((thread) => {
            return <ThreadProp thread={thread} />;
          })}
        </div>
        <div className="w-1/4 text-white">
          {sub.name}
          <div className="my-2 mr-4 bg-zinc-800 p-2">
            <div className="text-xs">About the community</div>
            <div className="">{sub.description}</div>
          </div>
          <div className="my-2 mr-4 bg-zinc-800 p-2">
            <div className="">Rules</div>
            <div className="">{sub.rules}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subreddit;
