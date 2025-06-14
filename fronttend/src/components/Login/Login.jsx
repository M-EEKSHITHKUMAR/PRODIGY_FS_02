import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import "./Login.css"
const Login = () => {
    const [formData,setFormData]=useState({username:'',password:""});
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});

    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:8001/api/auth/login',formData);
            localStorage.setItem('token',res.data.token);
            navigate("/employees");
        }catch(e){
             setError(e.response?.data?.msg || 'An error occured');

        }
    }

  return (
    <div className='loginform'>
       
        <form className="loginForm" onSubmit={handleSubmit}>
             <h2>Login</h2>
        {error && <p className="error">{error}</p> }
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type='text' className="infoInput" placeholder="Enter Username" value={formData.username} name="username" onChange={handleChange} required/>

            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type='password' className="infoInput" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange} required/>
                
            </div>
            <button className='button' type='submit'>Login</button>
 <p>Don't have an account?<Link to="/register">Register</Link></p>
        </form>
       
    </div>
  );
};

export default Login;