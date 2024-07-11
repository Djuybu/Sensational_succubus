import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShareAltOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState, useEffect } from "react";
import { getComments, postAddUpvote } from "../items/axios.ts";
import CommentProps from "../Comment/CommentProps.tsx";
import { Comment as CommentEntity } from "./entity/Comment.ts";

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

const ThreadProp = (props: { thread: Thread }) => {
  const [isDisplayingComments, setIsDisplayingComments] = useState(false);
  const [comments, setComments] = useState<CommentEntity[]>([]);
  const { thread } = props;

  const getCommentsFromThread = async () => {
    try {
      const commentList: CommentEntity[] = await getComments(thread.id, 0);
      setComments(commentList);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (isDisplayingComments) {
      getCommentsFromThread();
    }
  }, [isDisplayingComments]);

  const changeCommentState = () => {
    setIsDisplayingComments(!isDisplayingComments);
  };

  const threadBar = [
    {
      key: "upvote",
      label: "6.9k",
      icon: <ArrowUpOutlined />,
      onClick: () => postAddUpvote(thread.id),
    },
    {
      key: "downvote",
      icon: <ArrowDownOutlined />,
    },
    {
      key: "comment",
      label: "comment",
      icon: <CommentOutlined />,
      onClick: changeCommentState,
    },
    {
      key: "share",
      label: "share",
      icon: <ShareAltOutlined />,
    },
  ];

  return (
    <div className="py-5 px-5">
      <div className="flex items-center">
        <img
          className="w-10 rounded-xl"
          src={thread.userAva}
          alt="User Avatar"
        />
        <div className="text-white text-sm px-2">{thread.user}</div>
      </div>
      <div className="text-white text-3xl py-3 font-semibold">
        {thread.title}
      </div>
      <div className="text-white text-base mr-20">{thread.content}</div>
      <img src={thread.image} alt="Thread Content" />
      <Menu className="thread-bar" mode="horizontal" items={threadBar}></Menu>
      {isDisplayingComments &&
        comments.map((comment) => (
          <CommentProps key={comment.commentId} comment={comment} />
        ))}
    </div>
  );
};

export default ThreadProp;
