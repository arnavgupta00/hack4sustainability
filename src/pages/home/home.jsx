import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from 'react-router-dom';

import "./home.css";

export default  function Home() {

    const navigate = useNavigate();

    return <>

        <Navbar/>
        <h1 className='textHomeLanding'>The #1 communication solution  </h1>

        <div className='buttonHomeMain'>
        
            <button className='homeButton' onClick={()=>navigate("/SpeechToSpeech")}>Speech To Speech</button>
            <button className='homeButton TextToText' onClick={()=>navigate("/TextToText")}> Text To Text</button>
            <button className='homeButton' onClick={()=>navigate("/SpeechToText")}>Sign Language</button>
        </div>
    </>
}