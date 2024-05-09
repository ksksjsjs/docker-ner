import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import './App.css'

const Evaluation = ()=>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    const handleClick = () =>{
      axios.get('http://127.0.0.1:5000/evaluation')
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
    }
    return(
      <div className='div3'>
        <h3>Model Evaluation</h3>
        <Button size="small" variant="contained" onClick={handleClick}>Predict</Button>
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