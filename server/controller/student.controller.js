import express from 'express'
import bcrypt from 'bcryptjs'
import studentSchema from "../models/student.model.js"

const app = express();
app.use(express.json());

// controller for register route
export const register = async(req, res)=>{
    const studentData = await req.body;
    // console.log(studentData);
    const existingStudent = await studentSchema.findOne({username: studentData.username});
    try{
        if(existingStudent){
            // hiding password from frontend
            const {__v, password, ...others} = existingStudent._doc;
            res.json({
                success: false,
                message: "Student already exists",
                ...others
            })
        }else{
            // hashing the password using bcryptjs
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(studentData.password, salt);
            // creating a new student data in db
            const newStudent = new studentSchema({...studentData, password: hash});
            await newStudent.save();
            const {__v, password, ...others} = newStudent._doc;
            res.status(200).json({
                success: true,
                message: "Student added successfully",
                ...others
            })
        }
    }catch(err){
        console.log(err);
    }
    
}
export const login = (req, res)=>{
    res.send("login completed...")
}