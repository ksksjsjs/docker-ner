import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Button, Divider, Flex, Radio} from 'antd';
import Load from '../../components/Load';
import Training from '../../components/Training';
import Predict from '../../components/Predict';
import Evaluation from '../../components/Evaluation';
import './index.css';
import { TinyColor } from '@ctrl/tinycolor';


const { Header, Content, Sider } = Layout;

const Work = () =>{
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
      <Flex gap='large' vertical='vertical'>{
        workList.map(item=>
        <div className='workList' key={item.id}>
          <span className='Listcomment'>
            < Button type="dashed"   size = 'large' className='docker'>
              docker{item.id}
            </Button>
            <Button type="dashed" onClick={()=>handledelete(item.id) } className='delete' >删除</Button>
          </span> 
        </div>)}
      </Flex>
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
            <Breadcrumb.Item>Train</Breadcrumb.Item>
        </Breadcrumb>
        <Content className='train'
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            }}
        >
          <Training/>
        </Content>
        <Breadcrumb
            style={{
            margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Load</Breadcrumb.Item>
            <Breadcrumb.Item>Evaluation</Breadcrumb.Item>
            <Breadcrumb.Item>Predict</Breadcrumb.Item>
        </Breadcrumb>
        <Content className='other'
            style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            }}
        >
          <Flex vertical gap='large'>
            <Load/>
            <Evaluation/>
            <Predict/>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Work