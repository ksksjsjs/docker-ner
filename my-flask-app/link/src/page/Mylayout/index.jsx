import React from 'react';
import './index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import router from '../../router';
import { Image } from 'antd';


const { Header, Content, Sider } = Layout;

const data = [
    {
        key:'/',
        label: 'Home'
    },
    {
        key:'/work',
        label: 'Work'
    }
]



const Mylayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate()
  const switRoute = (path)=>{
    navigate(path.key,{replace:true})
  }

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <div className="demo-logo" /> */}
        <div><Image
          width={200}
          height={70}
          src= 'data:image/png;base64,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'
          preview = {false}
        />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          items={data}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={switRoute}
        />
      </Header>
      <Outlet/>
    </Layout>
  );
};
export default Mylayout;