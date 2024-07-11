import React, { useEffect, useState } from "react";
import logo from "../resources/logo.png";
import demo_ava from "../resources/ava_blue.png";
import test_drive from "../resources/test_drive.png";
import { Layout, Menu, Input, Avatar } from "antd";
import {
  PlusOutlined,
  CommentOutlined,
  BellOutlined,
  SearchOutlined,
  HomeOutlined,
  RiseOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is included
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import ThreadProp from "../items/ThreadProps.tsx";
import { Thread } from "../items/ThreadProps.tsx";
import SubForm from "../items/SubForm.tsx";
import { Sub } from "../items/entity/Sub.ts";
import { getRecentUpdatedSub } from "../items/axios.ts";
import Subreddit from "../Subreddit/Subreddit.tsx";

const { Header } = Layout;
const { Search } = Input;

const onSearch = (value: string) => {
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
    icon: <img src={demo_ava} className="w-20 rounded-2xl" alt="Avatar" />,
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

interface SiderSub {
  key: number;
  name: string;
  description: string;
  rules: string;
  imageURL: string;
}

const HomePage: React.FC = () => {
  const [avaMenu, setAvaMenu] = useState<boolean>(false);
  const [siderSub, setSiderSub] = useState<SiderSub[]>([]);
  const [isAddingSub, setIsAddingSub] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [currentSub, setCurrentSub] = useState<Sub>({
    key: -1,
    name: "",
    description: "",
    rules: "",
    imageURL: "",
  });
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: "0",
      user: "r/demo",
      userAva: demo_ava,
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
      image: test_drive,
      upvotes: "6.9k",
      downvotes: "1.2k",
    },
  ]);

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
          icon: demo_ava,
        },
      ],
    },
    {
      label: "Community",
      children: [
        {
          label: "Create",
          icon: "PlusOutlined",
          onClick: () => {
            setIsAddingSub(true);
            console.log(isAddingSub);
          },
        },
      ],
    },
  ];

  const items2 = siderParentConfig.map((section, index) => {
    const keys = ["Custom feed", "Recent", "Community"];
    return {
      key: keys[index],
      label: section.label,
      children: section.children.map((subsection, j) => {
        const subKey = `${keys[index]}-${j + 1}`;

        if (subsection.icon === "PlusOutlined") {
          return {
            key: subKey,
            label: subsection.label,
            icon: <PlusOutlined />,
            onClick: subsection.onClick,
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

  useEffect(() => {
    const fetchRecentUpdatedSub = async () => {
      const recentUpdatedSub = await getRecentUpdatedSub();
      setSiderSub(recentUpdatedSub);
    };

    fetchRecentUpdatedSub();
  }, []);

  useEffect(() => {
    const updatedItems = items2.map((item, idx) => {
      if (idx === 2) {
        return {
          ...item,
          children: [
            ...item.children,
            ...siderSub.map((sub, index) => ({
              key: `Community-${index}`,
              label: sub.name,
              icon: (
                <img
                  src={sub.imageURL}
                  alt={sub.name}
                  style={{ width: 16, height: 16 }}
                />
              ),
              onClick: () => setSub(sub),
            })),
          ],
        };
      }
      return item;
    });

    setSider(updatedItems);
  }, [siderSub]);

  const [sider, setSider] = useState(items2);
  const setSub = (children: Sub) => {
    console.log(children);
    setIsSub(true);
    setCurrentSub({
      key: children.key,
      name: children.name,
      description: children.description,
      rules: children.rules,
      imageURL: children.imageURL,
    });
  };
  return (
    <>
      {isAddingSub && <SubForm setIsAddingSub={setIsAddingSub} />}
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
            onClick={() => setAvaMenu(true)}
            src={demo_ava}
          />
        </Header>
        <Layout>
          <Sider className="" style={{ background: "black" }}>
            {
              <Menu
                mode="inline"
                defaultOpenKeys={["Custom feed", "Recent", "Community"]}
                className="custom-menu"
                items={[...siderSingleItem, ...sider]} // Use the updated `sider` state here
              />
            }
          </Sider>
          {avaMenu && (
            <Menu mode="inline" items={avatarItem} className="ava_menu" />
          )}
          <Content style={{ background: "black" }}>
            {isSub ? (
              <Subreddit sub={currentSub} />
            ) : (
              threads.map((thread) => {
                return <ThreadProp thread={thread} />;
              })
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomePage;
