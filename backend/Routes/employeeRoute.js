const express=require("express");
const router=express.Router();
const {auth,admin}=require("../middleware/authMiddleware");
const Employee=require("../Models/Employee");


//CRUD OPERATIONS
//Create
router.post('/',admin,async(req,res)=>{
    const {name,email,phone,position,department}=req.body;
    try{
        if(!name || !email || !phone || !position || !department ){
            return res.status(400).json({message:"All Feilds are required"});

        } 
        const employee=new Employee({name,email,phone,position,department});
        await employee.save();
        res.json(employee);
    }catch(error){
        console.error(error.message);
        res.status(500).json({message:"Server error"});

    }
});
//get//READ
router.get('/',auth,async(req,res)=>{
    try{
        const employees=await Employee.find().select('-password');
        return res.status(200).json(employees);
    }catch(err){
        return res.status(500).json({message:"Server error"});
    }
});
router.get('/:id',auth,async(req,res)=>{
  try{
    const employee=await Employee.findById(req.params.id).select('-password'); 
    if(!employee) return res.status(404).json({ msg: 'Employee not found' });
    res.json(employee);
  }catch(err){
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Employee not found' }); // Handle invalid ID format
    }
    res.status(500).json({ msg: 'Server error' });
  }
});
//Update
router.put('/:id',auth,async(req,res)=>{
    const {name,email,phone,position,department}=req.body;
    try{
        const employee=await Employee.findById(req.params.id);
        if(!employee){
            return res.status(404).json({message:"Employee not found"});
        }
        employee.name=name || employee.name;
        employee.email=email || employee.email;
        employee.phone=phone || employee.phone;
        employee.position=position || employee.position;
        employee.department=department || employee.department;

        await employee.save();
        return res.status(200).json(employee);
    }catch(err){
        return res.status(500).json({message:"Server error"});
    }
});
//Delete
router.delete('/:id',admin,async(req,res)=>{
    try{
        const employee=await Employee.findByIdAndDelete(req.params.id);
        if(!employee){
            return res.status(404).json({message:"Employee not found"});
        }
        return res.status(200).json({message:"Employee deleted successfully"});
    }catch(err){
        return res.status(500).json({message:"Server error"});
    }
});

module.exports=router;