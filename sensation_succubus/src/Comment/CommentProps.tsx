import React, { useEffect, useState } from "react";
import { Comment } from "../items/entity/Comment.ts";
import {
  getCommentOwnerData,
  getComments,
  postReplyComment,
} from "../items/axios.ts";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CommentOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

interface CommentWithOwnerData extends Comment {
  ownerData?: { userAva: string; username: string };
}

const CommentProps: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [commentWithOwnerData, setCommentWithOwnerData] =
    useState<CommentWithOwnerData | null>(null);

  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyComment, setReplyComment] = useState<string>("");
  const [isDisplayingReply, setIsDisplayingReply] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const data = await getCommentOwnerData(comment.authorId);
        setCommentWithOwnerData({ ...comment, ownerData: data });
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    fetchOwnerData();
  }, [comment]);

  useEffect(() => {
    if (isDisplayingReply) {
      const getReply = async () => {
        try {
          const comments = await getComments(comment.postId, comment.commentId);
          setReplies([...comments]);
        } catch (error) {}
      };
      getReply();
    }
  }, [isDisplayingReply]);

  const updateUpvote = (commentId: any) => {
    // Implement upvote logic here
  };

  const updateDownvote = (commentId: any) => {
    // Implement downvote logic here
  };

  const getCommentMenu = (commentId: string) => [
    {
      key: "Upvote",
      icon: <ArrowUpOutlined style={{ color: "white" }} />,
      onClick: () => {
        updateUpvote(commentId);
      },
    },
    {
      key: "Downvote",
      icon: <ArrowDownOutlined style={{ color: "white" }} />,
      onClick: () => {
        updateDownvote(commentId);
      },
    },
    {
      key: "reply",
      icon: <CommentOutlined style={{ color: "white" }} />,
      onClick: () => {
        setIsReplying(true);
      },
    },
    {
      key: "Reply",
      icon: <RetweetOutlined style={{ color: "white" }} />,
      onClick: () => {
        setIsDisplayingReply(true);
      },
    },
  ];

  const handleSubmit = async (event: React.FormEvent, childOf: string) => {
    event.preventDefault();
    if (await postReplyComment(childOf, replyComment)) {
      setIsReplying(false);
      setReplyComment("");
    }
  };

  return (
    <div className="ml-2" key={comment.commentId}>
      {commentWithOwnerData && (
        <>
          <div className="flex items-center">
            <img
              src={commentWithOwnerData.ownerData?.userAva}
              alt={`${commentWithOwnerData.ownerData?.username}'s avatar`}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="text-sm text-white ml-2">
              {commentWithOwnerData.ownerData?.username}
            </div>
          </div>
          <div className="text-xl text-white ml-10">
            {commentWithOwnerData.body}
          </div>
          <Menu
            mode="horizontal"
            items={getCommentMenu(commentWithOwnerData.commentId)}
            style={{
              backgroundColor: "black",
              marginTop: "4px",
              marginLeft: "24px",
              justifyItems: "center",
            }}
          />
          {isReplying && (
            <form
              onSubmit={(e) => handleSubmit(e, commentWithOwnerData.commentId)}
            >
              <div className="flex">
                <img
                  src="https://easydrawingguides.com/wp-content/uploads/2019/08/how-to-draw-freddy-fazbear-from-five-nights-at-freddys-featured-image-1200.png"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Type your reply here"
                  value={replyComment}
                  onChange={(e) => setReplyComment(e.target.value)}
                  style={{ backgroundColor: "black", outline: "bottom" }}
                  className="ml-2 w-3/4 bg-black outline-none border-b-2 border-transparent focus:border-white text-white"
                />
              </div>
              <div className="flex flex-row-reverse ml-10 w-3/4">
                <button
                  className="text-white mt-1 bg-gray-700 p-1 px-2 rounded-md"
                  type="submit"
                >
                  Reply
                </button>
              </div>
            </form>
          )}
          <div className="ml-8">
            {isDisplayingReply ? (
              replies.map((reply) => {
                return <CommentProps comment={reply} />;
              })
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentProps;
