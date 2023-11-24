import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import { Link, useNavigate } from 'react-router-dom';
import "dotenv/config";
import './TextToText.css';



const TextToText = () => {
  const [leftInputLanguage, setLeftInputLanguage] = useState('');
  const [leftInputText, setLeftInputText] = useState('');
  const [rightInputLanguage, setRightInputLanguage] = useState('');
  const [result, setResult] = useState('Generated Text will be shown here!!');
  
  const navigate = useNavigate();

  const url = "http://localhost:5000";

  const handleLeftInputChange = (e) => {
    setLeftInputLanguage(e.target.value);
  };

  const handleLeftTextInputChange = (e) => {
    setLeftInputText(e.target.value);
  };

  const handleRightInputChange = (e) => {
    setRightInputLanguage(e.target.value);
  };

  const handleSubmitLeft = (e) => {
    e.preventDefault();
    // Perform any actions with left input data
    console.log('Left Input Language:', leftInputLanguage);
    console.log('Left Input Text:', leftInputText);
  };

  const handleSubmitRight = (e) => {
    e.preventDefault();
    // Perform any actions with right input data
    console.log('Right Input Language:', rightInputLanguage);
  };

  const fetchData = async () => {
    try {
        
        setResult("Loading...");
        const response = await fetch(url + `/${leftInputLanguage}/${rightInputLanguage}/${leftInputText}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const res = await response.json();
            setResult(res.convertedText);
        } else {
            console.error("Failed to make request:", response.statusText);
            setResult(response.statusText);
        }
    } catch (error) {
        console.error("Failed to make request:", error);
        setResult(error)
    }
};

  return (
    <div style={{overflowX:"hidden"}}>
      <Navbar />
      <h1 className='textTTT' style={{textAlign:'center', marginTop:"50px", fontSize:"70px"}}>Text Translation</h1>
      <div className='mainSTS'>
        <form className='formLeft' onSubmit={handleSubmitLeft}>
          <input
            type='text'
            className='inputBox lang'
            placeholder='Input Language'
            value={leftInputLanguage}
            onChange={handleLeftInputChange}
          />
          <input
            type='text'
            className='inputBox text'
            placeholder='Input Text'
            value={leftInputText}
            onChange={handleLeftTextInputChange}
          />
          <button type='submit' className='submitLeft' onClick={ ()=>{fetchData()}}>
            Go
          </button>
        </form>
        <div className='mainSTSright'>
          <form className='formRight' onSubmit={handleSubmitRight}>
            <input
              type='text'
              className='inputBox lang'
              placeholder='Output Language'
              value={rightInputLanguage}
              onChange={handleRightInputChange}
            />
            <button type='submit' className='submitRight' onClick={()=>{navigate("/")}} >
              Retry
            </button>
          </form>
          <div className='genratedText'>
            <h1> {result}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToText;
