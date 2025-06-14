import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "./EmployeeForm.css"

const EmployeeForm = () => {
    const [employee,setEmployee]=useState({
        name:"",email:'',phone:'',position:'',department:'',
    });
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        if(id){
            const fetchEmployee=async()=>{
                try{
                    const token=localStorage.getItem('token');
                    const {data}=await axios.get(`http://localhost:8001/api/employees/${id}`,{
                        headers: { Authorization: `Bearer ${token}` },

                    });
                    setEmployee(data);
                }catch(e){
                    alert("Failed to fetch Employee");

                }
            };
            fetchEmployee();

        }
      
    },[id]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const token=localStorage.getItem('token');
            if(id){
                await axios.put(`http://localhost:8001/api/employees/${id}`,employee,{
                     headers: { Authorization: `Bearer ${token}` },
                });

            }else{
                await axios.post("http://localhost:8001/api/employees",employee,{
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            navigate('/employees');
        }catch(e){
            alert('Failed to save Employee');
        }
    };


  return (
    <div className="employee-list">
        <h2>{id?"Edit Employee":"Add Employee" }</h2>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Name' value={employee.name} onChange={(e)=>setEmployee({...employee,name:e.target.value})} required />
            <input type='email' placeholder='Email' value={employee.email} onChange={(e)=>setEmployee({...employee,email:e.target.value})} required />
            <input type='text' placeholder='Phone' value={employee.phone} onChange={(e)=>setEmployee({...employee,phone:e.target.value})} required />
            <input type='text' placeholder='Position' value={employee.position} onChange={(e)=>setEmployee({...employee,position:e.target.value})} required />
            <input type='text' placeholder='Department' value={employee.department} onChange={(e)=>setEmployee({...employee,department:e.target.value})} required />
            <button type='submit'>{id?"Update":"Add"}</button>
        </form>

    </div>
  );
};

export default EmployeeForm;