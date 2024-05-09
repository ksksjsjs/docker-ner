import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import './App.css'

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
      <div className='div1'>
      <h3>Model Training</h3>
      <form method='POST'  onSubmit={handleSubmit}>
        <label>model:</label>
        <select value={selectedOption} onChange={handleChange} name='model'> 
          {selectList.map(item=><option id={item.id}>{item.name}</option>)}
        </select>
        <label>dataset:</label>
        <select value={selectedOption} onChange={handleChange} name='dataset'>
          {selectList.map(item=><option id={item.id}>{item.dataset}</option>)}
        </select>
        <Button size="small" variant="contained"  type='submit'>Train</Button>
        {/* <LinearProgress variant="determinate" value={progress} /> */}
      </form>
    </div>
  
    )
  }

export default Training