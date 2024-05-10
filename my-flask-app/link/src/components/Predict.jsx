import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Form ,Input,Button,Flex} from 'antd';
import './App.css'

const Predict = () =>{
    //发数据并接受前端传来的数据
  
    //设置后端返回数据状态
    const [responseData, setResponseData] = useState(null);
    //设置错误状态
    const [error, setError] = useState(null);
  
    //保持input文本框的状态

    const handleSubmit = (event) => {
      event.preventDefault();
      // 在这里使用 Axios 发送 POST 请求，将输入框中的值发送到后端
      axios.post('http://127.0.0.1:5000/predict', event)
        .then(response => {
          console.log('Data sent successfully!');
          // 在这里处理成功的响应并设置状态
          setResponseData(response.data);
          setError(null); // 清除可能存在的错误
        })
        .catch(error => {
          console.error('There was a problem with your Axios operation:', error);
          setError('There was a problem with your Axios operation'); // 设置错误状态
          setResponseData(null); // 清除可能存在的数据
        });
    };
  
    return(
      <div className='predict'>
        <h3>模型预测</h3>
        <Form onFinish={handleSubmit}>
          <Flex vertical = {false} gap='middle'>
            <Form.Item>
              <Input size = 'large' placeholder="请输入句子"/>
            </Form.Item>
            <Form.Item>
              <Button  type="primary" htmlType="submit" size='large'>
                预测
              </Button>
            </Form.Item>
          </Flex>
        </Form>
        {error && <div>Error: {error}</div>}
        {responseData && (
          <div>
            <h2>Response from server:</h2>
            <p>{responseData}</p> 
          </div>
        )} 
      </div>
    )
  }

export default Predict