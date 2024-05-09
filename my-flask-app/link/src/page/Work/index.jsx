import React, { useState } from 'react';
// import './index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Button, Divider, Flex, Radio} from 'antd';
import {CloseOutlined} from '@ant-design/icons'
import Training from '../../components/Training';
import Predict from '../../components/Predict';
import Evaluation from '../../components/Evaluation';
import './index.css';
import { TinyColor } from '@ctrl/tinycolor';


const { Header, Content, Sider } = Layout;

const Work = () =>{

  const colors1 = ['#6253E1', '#04BEFE'];
  const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

  const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
  const [number,setNumber] = useState(1)
  const List = [
    {
      id:0
    }
  ]
  const [workList,setworkList] = useState(List)
  const handleClick = ()=>{
    setNumber(number+1)
    setworkList([
      ...workList,
      {
        id:number
      }
    ])
  }
  const handledelete = (id)=>{
    setworkList(workList.filter(item=> item.id !== id))
  }
  return(
      <Layout>
          <Sider
          width={200}
          style={{
              background: colorBgContainer,
          }}
          >
          <Button type="primary" size="large" block onClick={handleClick}>
          增加容器
          </Button>
          {/* <Siderlist/> */}
          <Flex gap='large' vertical='vertical'>{workList.map(item=>
            <div className='workList' key={item.id}>
              <span className='Listcomment'>
                < Button type="dashed"   size = 'large' className='docker'>
                  docker{item.id}
                </Button>
                {/* <Button type="dashed"  icon={<CloseOutlined />} onClick={()=>handledelete(item.id) } className='delete' /> */}
                <Button type="dashed" onClick={()=>handledelete(item.id) } className='delete' >删除</Button>
              </span>
              
            </div>)}
          </Flex>
          {/* <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
              height: '100%',
              borderRight: 0,
              }}
              items={items2}
          /> */}
          </Sider>
          <Layout
          style={{
              padding: '0 24px 24px',
          }}
          >
          <Breadcrumb
              style={{
              margin: '16px 0',
              }}
          >
              <Breadcrumb.Item>Work</Breadcrumb.Item>
          </Breadcrumb>
          <Content
              style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              }}
          >
              <Flex vertical gap='large'>
                <Training/>
                <Predict/>
                <Evaluation/>
              </Flex>
          </Content>
          </Layout>
    </Layout>
  )
}

export default Work