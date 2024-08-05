import React, { useState } from 'react';
import { Switch, Menu, MenuProps, MenuTheme, Avatar } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import NavbarAvatar from './ui/NavbarAvatar.tsx';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <NavbarAvatar/>,
      children: [
        { key: '1', label: 'Option 1' },
        { key: '2', label: 'Option 2' },
        { key: '3', label: 'Option 3' },
        { key: '4', label: 'Option 4' },
      ],
    },
  ];
const AvatarDropdown = () => {
    const [current, setCurrent] = useState('1');
  
    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256,
            backgroundColor:'black'
         }}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default AvatarDropdown;
