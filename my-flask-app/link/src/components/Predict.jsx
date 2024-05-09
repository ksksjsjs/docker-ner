import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './App.css'

const Predict = () =>{
    //发数据并接受前端传来的数据
  
    //设置输入文本状态
    const [inputValue, setInputValue] = useState('');
    //设置后端返回数据状态
    const [responseData, setResponseData] = useState(null);
    //设置错误状态
    const [error, setError] = useState(null);
  
    //保持input文本框的状态
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // 在这里使用 Axios 发送 POST 请求，将输入框中的值发送到后端
      axios.post('http://127.0.0.1:5000/predict', { inputValue })
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
        <h3>Model Predict</h3>
          <form method="POST" onSubmit={handleSubmit}>
            <label>String:</label>
            <input type='text'  onChange={handleChange}></input>
            {/* <Button size="small" variant="contained" type='submit'>Predict</Button> */}
          </form>
        {error && <div>Error: {error}</div>}
        {responseData && (
          <div>
            <h2>Response from server:</h2>
            <p>{responseData}</p> 
          </div>
        )}
        <p></p>  
      </div>
    )
  }

export default Predict