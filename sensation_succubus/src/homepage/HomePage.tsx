import React from "react";

import logo from "./resources/logo.jpg";

import { Layout, Menu, theme, Input, Space } from "antd";
import type { MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import type { SearchProps } from "antd/es/input/Search";

import { PlusOutlined, CommentOutlined, BellOutlined } from "@ant-design/icons";

//search bar
const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

//button lists
const headerItem: MenuProps["items"] = [
  PlusOutlined,
  CommentOutlined,
  BellOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),

    children: new Array(3).fill(null).map((_, j) => {
      const subKey = index * 3 + j + 1;
      return {
        key: subKey,
      };
    }),
  };
});

const HomePage: React.FC = () => {
  return (
    <>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="">
            <img src={logo}></img>
          </div>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Header>
      </Layout>
    </>
  );
};

export default HomePage;
