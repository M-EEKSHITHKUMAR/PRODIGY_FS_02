import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';

function App() {
  return (
    
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/employees' element={<EmployeeList/> }/>
            <Route path='/add-employee' element={<EmployeeForm/> }/>
            <Route path='/edit-employee/:id' element={<EmployeeForm/>}/>
             
          </Routes>
        </div>
      </Router>
    
  );
}

export default App;
