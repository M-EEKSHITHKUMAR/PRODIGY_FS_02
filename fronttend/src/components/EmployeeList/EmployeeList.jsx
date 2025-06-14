import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./EmployeeList.css"

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                //fetch auth det check if admin
                const userResponse = await axios.get("http://localhost:8001/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsAdmin(userResponse.data.isAdmin);
                //fetch
                const employeesResponse = await axios.get("http://localhost:8001/api/employees", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployees(employeesResponse.data);
            } catch (e) {
                alert("Failed to fetch data");
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8001/api/employees/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(employees.filter((emp) => emp._id !== id));
        } catch (e) {
            alert("failed to Delete employee");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="employee-list">
            <div className="employee-list-header">
                {isAdmin && <Link className='add-btn' to="/add-employee">Add Employee</Link>}
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.position}</td>
                            <td>{emp.department}</td>
                            <td className='action-buttons'>
                                <Link to={`/edit-employee/${emp._id}`}>Edit</Link>
                                {isAdmin && (
                                    <button onClick={() => handleDelete(emp._id)}>Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList;