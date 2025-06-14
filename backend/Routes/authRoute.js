const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const Employee=require("../Models/Employee");
const {auth,admin}=require("../middleware/authMiddleware");

router.post('/register',async(req,res)=>{
    const {username,password,name,email,phone,position,department,isAdmin}=req.body;
    try{
        let employee=await Employee.findOne({username});
        if(employee){
            return res.status(400).json({message:"Username already exists"});

        }
        if(!name || !email || !phone || !position || !department || !username || !password){
            return res.status(400).json({message:"All Feilds are required"});

        } 
        employee=new Employee({
            username,
            password: await bcrypt.hash(password, 10),
            name,
            email,phone,position,department,
            isAdmin: isAdmin || false

        });
        await employee.save();

        const token=jwt.sign({id:employee._id},process.env.JWT_SECRET,{expiresIn:'5h'});
        return res.status(200).json({token});

    }catch(error){
        return res.status(500).json({message:"Server error"});

    }
});

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    try{
        const employee=await Employee.findOne({username});
        if(!employee){
            return res.status(400).json({message:"Invalid Credentials"});

        }
        const isMatch=await bcrypt.compare(password, employee.password);
        if(!isMatch) return res.status(400).json({message:"Wrong Password"});

        const token=jwt.sign({id:employee._id},process.env.JWT_SECRET,{expiresIn:'5h'});
        return res.status(200).json({token});

    }catch(error){
        return res.status(500).json({message:"Server Error"});

    }
});
router.get('/me', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select('-password');
    if (!employee) return res.status(404).json({ msg: 'User not found' });

    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports=router;