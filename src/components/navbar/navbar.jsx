
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the library
import Dropdown from '../dropdown/dropdown';
import './navbar.css';

function Navbar(props) {
    const AuthenticationFunk =()=>{
        return null
    }
    const {authenticationCall,setauthenticationCall }  = props;
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const url = 'http://localhost:5000';


    
    useEffect(() => {

        
    }, []);


    return (
        <div className='main-nav'>
            <div className='top-search'>
                <div className='logo-nav' onClick={() => navigate("/")}></div>
                <div className='categories'>
                    <button className='category'>About</button>
                    <button className='category'>Services</button>
                    
                    
                </div>
                
                
                {/* <div className='profile'>
                    <Dropdown authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall}  />
                </div> */}
            </div>
            <hr />
            
        </div>

    );
}

export default Navbar;
