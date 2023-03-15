import React from 'react';
import {
  UsergroupAddOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;
export default function Navbar({ collapsed }) {
  let navigate = useNavigate();
  const onClickHandler = (e) => {
    navigate(e.key);
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ minHeight: '100vh' }}
    >
      <Menu
        theme="dark"
        mode="inline"
        onClick={onClickHandler}
        defaultSelectedKeys={[window.location.pathname.substring(1)]}
        items={[
          {
            key: 'user',
            icon: <UserOutlined />,
            label: 'User',
          },
          {
            key: 'add',
            icon: <UsergroupAddOutlined />,
            label: 'Add User',
          },
          {
            key: 'location',
            icon: <EnvironmentOutlined />,
            label: 'Get location',
          },
        ]}
      />
    </Sider>
  );
}
