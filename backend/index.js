const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const authRoute=require("./Routes/authRoute");
const employeeRoute=require("./Routes/employeeRoute");

dotenv.config();

const app=express();
//middlewre
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch(err=>{
    console.error('MongoDB connection error:', err);
});

app.use('/api/auth',authRoute);
app.use('/api/employees',employeeRoute);



const PORT=process.env.PORT || 8001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});