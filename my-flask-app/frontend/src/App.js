import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import './App.css'
import Training from './components/training';
import Predict from './components/predict';
import Evaluation from './components/Evaluation';

const App = () => {
  return (
    <div className= 'body'>
      <div className='title'>
      </div>
      <Training />
      <Predict/>
      <Evaluation/>
    </div>
  );
};

export default App;
