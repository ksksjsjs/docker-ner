import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Flex,Select, Form,Button} from 'antd';

import './App.css'

const Evaluation = ()=>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [selectList, setSelectList] = useState([])
    useEffect(()=>{
        async function getList(){
          const list = await axios.get("http://localhost:3004/list")
          setSelectList(list.data)
        }
        getList()
      },[])

    
    const handleSubmit = (event) => {
      // 在这里使用 Axios 发送 POST 请求
      axios.post('/evaluation', event)
        .then(response => {
        alert('evaluation');
        })
        .catch(error => {
        console.error('There was a problem with your Axios operation:', error);
        });
      axios.get('/evaluation')
        .then(response => {
          console.log('Data fetched successfully:', response.data);
          setData(response.data); // 设置数据状态
          setError(null); // 清除可能存在的错误
        })
        .catch(error => {
          console.error('There was a problem with your Axios operation:', error);
          setError('There was a problem with your Axios operation'); // 设置错误状态
          setData(null); // 清除可能存在的数据
        }); 

    };

    return(
      <div className='evaluation'>
        <h3>模型评估</h3>
        <Form onFinish={handleSubmit}>
            <Flex vertical = {false} gap='middle'>
                <Form.Item label='模型' name='model' >
                  <Select style={{width: 120,}}
                  options={selectList.map((item)=>({
                      value:item.value,
                      label:item.name
                  }))}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" >载入模型</Button>
                </Form.Item>
            </Flex>
          </Form>
        {error && <div>Error: {error}</div>}
        {data && (
          <div>
            <h2>Data from server:</h2>
            <p>{data}</p> {/* 这里假设后端返回的是文本数据 */}
          </div>
        )}
      </div>
    )
  }

export default Evaluation