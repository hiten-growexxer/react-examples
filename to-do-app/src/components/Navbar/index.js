import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  let navigate = useNavigate();

  const items = [
    {
      label: 'Home',
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: 'View',
      key: 'list',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'todos',
      key: 'todo',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Add',
          children: [
            {
              label: 'Add item',
              key: 'add',
            },
          ],
        },
      ],
    },
  ];
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (  
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
