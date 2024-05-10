import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, Select, Form, Input,Flex,InputNumber, Spin} from 'antd';
import { formToJSON } from 'axios';
import './App.css'


const Training = () =>{
    //抓数据
    const [selectList, setSelectList] = useState([])
    useEffect(()=>{
      async function getList(){
        const list = await axios.get("/training")
        setSelectList(list.data)
      }
      getList()
    },[])
  
    //发数据
    const [train_flag, setTrain_flag] = useState(false)

    const handleSubmit = (event) => {
      // 在这里使用 Axios 发送 POST 请求
      axios.post('http://192.168.49.2:31501/training', event)
        .then(response => {
          setTrain_flag(true)
          console.log(train_flag)  
        })
        .catch(error => {
          console.error('There was a problem with your Axios operation:', error);
        });
    };
    
    // const trainStop = ()=>{
      
    // }
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
      <Form onFinish={handleSubmit}>
        <Flex gap='large'>
          <Form.Item label='模型：' name='model'>
            <Select style={{width: 100,}}  defaultValue= 'model1'
              options={selectList.map((item)=>({
                value:item.value,
                label:item.name
              }))}
            >
            </Select>
          </Form.Item>
          <Form.Item label='数据集:' name='dataset'>
            <Select style={{width: 100,}} defaultValue= 'dataset1'
              options={selectList.map((item)=>({
                value:item.value,
                label:item.name
              }))}
            >
            </Select>
          </Form.Item>
        </Flex>
        <Flex gap='large'>
          <Form.Item label='参数1' name='Parameter1'>
            <InputNumber min={0} defaultValue={0}/>
          </Form.Item> 
          <Form.Item label='参数2' name='Parameter2'>
            <InputNumber min={0} defaultValue={0}/>
          </Form.Item> 
          <Form.Item label='参数3' name='Parameter3'>
            <InputNumber min={0} defaultValue={0}/>
          </Form.Item> 
        </Flex>
        <Flex vertical = {false} gap='large'>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              训练
            </Button>
          </Form.Item>
          <Form.Item>
          {train_flag&& <Spin/>}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >
              停止
            </Button>
          </Form.Item>
        </Flex>
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