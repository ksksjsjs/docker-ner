import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, Select, Form, Input,Flex,InputNumber} from 'antd';

import './App.css'
import FormItem from 'antd/es/form/FormItem';


const Training = () =>{
    //抓数据
    const [selectList, setSelectList] = useState([])
    useEffect(()=>{
      async function getList(){
        const list = await axios.get("http://localhost:3004/list")
        setSelectList(list.data)
      }
      getList()
    },[])
  
    //发数据
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);  
      formData.append('selectedOption', selectedOption);
      // 在这里使用 Axios 发送 POST 请求
      axios.post('/training', formData)
        .then(response => {
          alert('Training');
        })
        .catch(error => {
          console.error('There was a problem with your Axios operation:', error);
        });
    };
  
    //进度条
    const [progress, setProgress] = useState(0);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/predict', {
          onDownloadProgress: progressEvent => {
            const { loaded, total } = progressEvent;
            const percentCompleted = Math.round((loaded / total) * 100);
            console.log(Math.round((loaded / total) * 100) + '%')
            setProgress(percentCompleted);
          }
        });
        // 处理从后端返回的数据
      } catch (error) {
        // 处理错误
      }
    };
  
  
    return(
    <div className='training'>
      <h3>模型训练</h3>
      <Form onSubmit={handleSubmit}>
        <Flex>
          <Form.Item label='模型：' name='model'>
            <Select onChange={handleChange}style={{width: 120,}}>
              {selectList.map(item=><option id={item.id}>{item.name}</option>)}
            </Select>
          </Form.Item>
          <Form.Item label='数据集：' name='dataset'>
            <Select onChange={handleChange}style={{width: 120,}}>
              {selectList.map(item=><option id={item.id}>{item.dataset}</option>)}
            </Select>
          </Form.Item>
        </Flex>
        <Flex>
          <Form.Item label='参数1' name='Parameter1'>
            <InputNumber/>
          </Form.Item> 
          <Form.Item label='参数2' name='Parameter2'>
            <InputNumber/>
          </Form.Item> 
          <Form.Item label='参数3' name='Parameter3'>
            <InputNumber/>
          </Form.Item> 
        </Flex>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <form method='POST'  onSubmit={handleSubmit}>
        <label>model:</label>
        <select value={selectedOption} onChange={handleChange} name='model'> 
          {selectList.map(item=><option id={item.id}>{item.name}</option>)}
        </select>
        <label>dataset:</label>
        <select value={selectedOption} onChange={handleChange} name='dataset'>
          {selectList.map(item=><option id={item.id}>{item.dataset}</option>)}
        </select>
        
      </form>
      <Button type='submit'>Train</Button> */}
    </div>
  
    )
  }

export default Training