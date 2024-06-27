import React, { useEffect, useState } from "react";
import logo from "../resources/logo.png";
import demo_ava from "./resources/ava_blue.png";
import test_drive from "./resources/test_drive.png";
import avatar from "./resources/yeezus.jpg";
import { Layout, Menu, Input, MenuProps, Avatar } from "antd";
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
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is included
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import ThreadProp from "./items/ThreadProps.tsx";
import { Thread } from "./items/ThreadProps.tsx";

const { Header } = Layout;
const { Search } = Input;

const onSearch = (value) => {
  console.log(value);
};

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

const avatarItem = [
  {
    key: "bio",
    icon: <img src={demo_ava} className="w-20 rounded-2xl" />,
    label: (
      <div className="flex flex-col justify-center custom-spacing">
        <div>r/Demo</div>
      </div>
    ),
  },
  {
    key: "logout",
    icon: <LogoutOutlined style={{ color: "white" }} />,
    label: "Log out",
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

const HomePage = () => {
  const [avaMenu, setAvaMenu] = useState<boolean>(false);
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: "0",
      user: "r/demo",
      userAva: demo_ava, // Make sure demo_ava is defined
      title: "This is the title of the post",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
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
egestas gravida nulla, vel hendrerit mi tincidunt eu.`,
      image: test_drive, // Make sure test_drive is defined
      upvotes: "6.9k",
      downvotes: "1.2k",
    },
  ]);

  //load thread when start the session here
  useEffect(() => {
    // setThreads();
  }, []);

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
          className="ml-auto w-85"
        />
        <Menu
          mode="horizontal"
          style={{ height: "100%", backgroundColor: "black", color: "white" }}
          className="header"
          items={headerItem}
        />
        <Avatar
          style={{
            maxHeight: "2rem",
            maxWidth: "2rem",
            width: "auto",
            height: "auto",
          }}
          onClick={(e) => setAvaMenu(true)}
          src={demo_ava}
        />
      </Header>
      <Layout>
        <Sider className="" style={{ background: "black" }}>
          <Menu
            mode="inline"
            defaultOpenKeys={["Custom feed", "Recent", "Community"]}
            className="custom-menu"
            items={[...siderSingleItem, ...items2]}
          />
        </Sider>
        {avaMenu ? (
          <Menu mode="inline" items={avatarItem} className="ava_menu" />
        ) : (
          <></>
        )}
        <Content style={{ background: "black" }}>
          <ThreadProp threads={threads} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
