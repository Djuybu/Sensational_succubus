import React from 'react';
import {Menu} from "antd";
import "tailwindcss/tailwind.css"
import {
    PlusOutlined,
    CommentOutlined,
    BellOutlined
  } from "@ant-design/icons";

  
const headerItem = [
    {
      key: "add",
      icon: <PlusOutlined style={{ color: "white" }} />,
    },
    {
      key: "chat",
      icon: <CommentOutlined style={{ color: "white" }} />,
    },
    {
      key: "notification",
      icon: <BellOutlined style={{ color: "white" }} />,
    },
  ];

export default function NavbarMenu(){
    return(
        <Menu
            mode="horizontal"
            style={{ height: "100%", backgroundColor: "black", color: "white" }}
            className="header"
            items={headerItem}
        />
    )
}