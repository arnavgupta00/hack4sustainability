import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./dropdown.css";

// To delete a cookie, specify its name

export default function Dropdown(props) {

    const navigate = useNavigate();




    return <div className="container">

        <button className="btn">
            <span> Hello </span>
            <ul className="dropdown">
                <li className="active"><a href="#">Profile Information</a></li>
                <li onClick={() => { navigate("/cart") }}><a>Cart</a></li>
                <li><a href="#">Help</a></li>
                <li onClick={() => {  }}><a >Log Out</a></li>
            </ul>
        </button>
    </div>







}