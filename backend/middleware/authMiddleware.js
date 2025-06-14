const jwt=require('jsonwebtoken');
const Employee=require('../Models/Employee');

// General authentication middleware (updated for Bearer token)
const auth=(req, res, next)=>{
  const authHeader=req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token=authHeader.replace('Bearer ', '');
  if (!token){
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try{
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded;
    next();
  }catch(err){
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Admin middleware (updated for Bearer token)
const admin=async(req, res, next)=>{
  const authHeader=req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token=authHeader.replace('Bearer ', '');
  if(!token){
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try{
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    const employee=await Employee.findById(decoded.id);
    if(!employee) return res.status(404).json({ msg: 'User not found' });

    if(!employee.isAdmin) return res.status(403).json({ msg: 'Admin access required' });

    req.user=decoded;
    next();
  }catch(err){
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports={auth,admin};