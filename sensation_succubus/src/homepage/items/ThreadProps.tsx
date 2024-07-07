import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CloudDownloadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { postAddUpvote } from "../../items/axios";

export interface Thread {
  id: string;
  user: string;
  userAva: string;
  title: string;
  content: string;
  image: string;
  upvotes: string;
  downvotes: string;
}

const ThreadProp = (props: any) => {
  const threads = props.threads;
  console.log(threads);

  const threadBar = [
    {
      key: "upvote",
      label: "6.9k",
      icon: <ArrowUpOutlined />,
      onclick: postAddUpvote,
    },
    {
      key: "downvote",
      icon: <ArrowDownOutlined />,
    },
    {
      key: "save",
      label: "save",
      icon: <CloudDownloadOutlined />,
    },
    {
      key: "share",
      label: "share",
      icon: <ShareAltOutlined />,
    },
  ];
  return (
    <>
      {threads.map((prop: any) => {
        return (
          <div className="py-5 px-5">
            <div className="flex items-center">
              <img className="w-10 rounded-xl" src={prop.userAva} />
              <div className="text-white text-sm px-2">{prop.user}</div>
            </div>
            <div className="text-white text-3xl py-3 font-semibold">
              {/* This is the title of the post */}
              {prop.title}
            </div>
            <div className="text-white text-base mr-20">{prop.content}</div>
            <img src={prop.image}></img>
            <Menu
              className="thread-bar"
              mode="horizontal"
              items={threadBar}
            ></Menu>
          </div>
        );
      })}
    </>
  );
};

export default ThreadProp;
