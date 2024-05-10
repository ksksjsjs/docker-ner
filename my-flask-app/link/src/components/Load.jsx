import { Button, Flex, Form, Select } from "antd"
import { useState,useEffect } from "react"
import axios from "axios"
import "./App.css"
const Load = ()=>{

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
    axios.post('/load', event)
        .then(response => {
        alert('Training');
        })
        .catch(error => {
        console.error('There was a problem with your Axios operation:', error);
        });
    };

    return(
        <div className="load">
            <h3>模型载入</h3>
            <Form onFinish={handleSubmit}>
                <Flex vertical = {false} gap='middle'>
                    <Form.Item label='模型' name='model'>
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
        </div>
    )
}

export default Load;