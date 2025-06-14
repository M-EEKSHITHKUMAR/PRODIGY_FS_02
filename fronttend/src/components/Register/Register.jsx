import React, { useState } from 'react';
import axios from "axios";
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData,setFormData]=useState({username:'',password:'',name:'',email:'',phone:'',position:'',department:'',isAdmin:false,});
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value,type,checked}=e.target;
        setFormData({
            ...formData,[name]:type==='checkbox' ? checked : value,

        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8001/api/auth/register",formData);
            alert("Registered Succesfully, kindly Login");
            navigate('/');

        }catch(e){
            setError(e.response?.data?.msg || 'An errror occured');

        }

    };
  return (

    <div className="registerform">
        
        <form className="authForm" onSubmit={handleSubmit}>
            <h2>Register</h2>
        {error && <p className="error">{error}</p> }
            
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type='text' className="infoInput" placeholder="Enter Username" value={formData.username} name="username" onChange={handleChange} required/>

                
            </div>
                
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type='password' className="infoInput" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange} required/>
                
            </div>
            
            
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type='text' className="infoInput" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} required/>
                
                 
                
                <label htmlFor="email">Email</label>
                <input type='email' className="infoInput" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required/>
                
            </div>
            
            
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type='text' className="infoInput" placeholder="Enter phone" name="phone" value={formData.phone} onChange={handleChange} required/>
                
               
              
                <label htmlFor="position">Position</label>
                <input type='text' className="infoInput" placeholder="Enter Position" name="position" value={formData.position} onChange={handleChange} required/>
                
            </div>
            
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <input type='department' className="infoInput" placeholder="Enter Department" name="department" value={formData.department} onChange={handleChange} required/>
                
            </div>
            <div className="checkbox-group">
                <label htmlFor="isAdmin">
                    <input type='checkbox'  name="isAdmin" checked={formData.isAdmin} onChange={handleChange} required/>
                    Is Admin
                </label>
                
            </div>
            <button className='button' type='submit'>Register</button>
<p>Already have an account? <Link to="/">Login</Link> </p>
        </form>
        


    </div>
  )
}

export default Register