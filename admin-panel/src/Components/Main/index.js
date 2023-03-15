import { Layout, theme } from 'antd';
import React, { useState } from 'react';
import Navbar from '../Navbar';
import MyHeader from '../Header';
import './index.css';
import UserList from '../UserList';
import { Route, Routes } from 'react-router-dom';
import AddUser from '../AddUer';
import { Content } from 'antd/es/layout/layout';
import Location from '../Location';
export default function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const setCollapsedHandler = (value) => {
    setCollapsed(value);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Navbar collapsed={collapsed} />
      <Layout className="site-layout">
        <MyHeader
          collapsed={collapsed}
          setCollapsedHandler={setCollapsedHandler}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="user" default element={<UserList />} />
            <Route path="add" element={<AddUser />} />
            <Route
              path="location"
              element={
                <Location
                  google={null}
                  center={{ lat: 18.5204, lng: 73.8567 }}
                  height="300px"
                  zoom={15}
                />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
