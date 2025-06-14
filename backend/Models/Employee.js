const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({
    username:{ type:String}, 
    password:{ type:String},
    name:{ type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true},
    position:{type:String,required:true},
    department:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()},
    isAdmin:{type:Boolean,default:false}
});
const Employee=mongoose.model("Employee",employeeSchema);
module.exports=Employee;