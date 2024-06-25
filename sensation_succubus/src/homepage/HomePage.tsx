import React from "react";
import logo from "./resources/logo.png";
import demo_ava from "./resources/ava_blue.png";
import test_drive from "./resources/test_drive.png";
import { Layout, Menu, Input, MenuProps } from "antd";
import {
  PlusOutlined,
  CommentOutlined,
  BellOutlined,
  SearchOutlined,
  HomeOutlined,
  RiseOutlined,
  HistoryOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CloudDownloadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is included
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

const { Header } = Layout;
const { Search } = Input;

const onSearch = (value) => {
  console.log(value);
};

const headerItem = [
  {
    key: "sub1",
    icon: <PlusOutlined style={{ color: "white" }} />,
  },
  {
    key: "sub2",
    icon: <CommentOutlined style={{ color: "white" }} />,
  },
  {
    key: "sub3",
    icon: <BellOutlined style={{ color: "white" }} />,
  },
];

const siderSingleItem = [
  {
    key: "Home",
    label: "Home",
    icon: <HomeOutlined style={{ color: "white" }} />,
  },
  {
    key: "Trending",
    label: "Trending",
    icon: <RiseOutlined style={{ color: "white" }} />,
  },
  {
    key: "History",
    label: "History",
    icon: <HistoryOutlined style={{ color: "white" }} />,
  },
];

const siderParentConfig = [
  {
    label: "Custom feed",
    children: [
      {
        label: "Create",
        icon: "PlusOutlined",
      },
    ],
  },
  {
    label: "Recent",
    children: [
      {
        label: "R/xamlol",
        icon: "./resources/ava_blue.png",
      },
    ],
  },
  {
    label: "Community",
    children: [
      {
        label: "Create",
        icon: "PlusOutlined",
      },
    ],
  },
];

const items2 = siderParentConfig.map((section, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    label: section.label,
    children: section.children.map((subsection, j) => {
      const subKey = `${key}-${j + 1}`;

      // Check if icon is a string and matches "PlusOutlined"
      if (subsection.icon === "PlusOutlined") {
        return {
          key: subKey,
          label: subsection.label,
          icon: <PlusOutlined />,
        };
      } else {
        return {
          key: subKey,
          label: subsection.label,
          icon: (
            <img
              src={subsection.icon}
              alt={subsection.label}
              style={{ width: 16, height: 16 }}
            />
          ),
        };
      }
    }),
  };
});

const threadBar = [
  {
    key: "upvote",
    label: "6.9k",
    icon: <ArrowUpOutlined />,
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

const HomePage = () => {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "flex-start",
          backgroundColor: "black",
        }}
      >
        <div className="w-1/5 flex items-center">
          <img className="block w-2/5 h-3/5" src={logo} alt="Logo" />
          <div className="block text-white text-xl ">Redđít</div>
        </div>
        <Search
          placeholder="What to discover today?"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
          className="ml-auto"
        />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", backgroundColor: "black", color: "white" }}
          items={headerItem}
        />
      </Header>
      <Layout>
        <Sider className="" style={{ background: "black" }}>
          <Menu
            mode="inline"
            defaultOpenKeys={["sub1"]}
            className="custom-menu"
            items={[...siderSingleItem, ...items2]}
          />
        </Sider>
        <Content style={{ background: "black" }}>
          <div className="py-5 px-5">
            <div className="flex items-center">
              <img className="w-10 rounded-xl" src={demo_ava} />
              <div className="text-white text-sm px-2">Hello</div>
            </div>
            <div className="text-white text-3xl py-3 font-semibold">
              This is the title of the post
            </div>
            <div className="text-white text-base mr-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
              libero nec justo mollis convallis. Nam at neque ac ipsum ultrices
              tincidunt. Quisque ut libero eget lorem malesuada tincidunt. Fusce
              convallis purus quis nisi vehicula, in aliquet justo tempus.
              Vestibulum ac justo vel nisi vehicula consectetur in eu ligula.
              Sed id velit eu sapien eleifend interdum. Quisque fringilla
              ultricies sapien, at vestibulum est condimentum sit amet. Maecenas
              vitae dapibus justo. Vivamus accumsan dui et nisi sagittis, quis
              faucibus purus ullamcorper. Nam non diam nec sapien consequat
              facilisis. Phasellus lobortis, ex eget luctus molestie, odio felis
              suscipit sem, et scelerisque orci arcu a dolor. Integer gravida
              turpis in leo varius, nec aliquam risus dapibus. Etiam fringilla
              sapien non ex tincidunt, a gravida purus suscipit. Pellentesque
              egestas gravida nulla, vel hendrerit mi tincidunt eu.
            </div>
            <img src={test_drive}></img>
            <Menu
              className="thread-bar"
              mode="horizontal"
              items={threadBar}
            ></Menu>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
