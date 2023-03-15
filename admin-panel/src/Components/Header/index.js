import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
const { Header } = Layout;

export default function MyHeader({ collapsed, setCollapsedHandler }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{
        padding: 0,
        display: 'flex',
        background: colorBgContainer,
      }}
      data-testid="MyHeader"
    >
      <Button
        className="trigger"
        onClick={() => setCollapsedHandler(!collapsed)}
        style={{ margin: '1em' }}
      >
        {true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Header>
  );
}
