import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import studentSchema from "../models/student.model.js"

// controller for register route
export const register = async(req, res)=>{
    // console.log(req.body)
    const existingStudent = await studentSchema.findOne({username: req.body.username});
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
            let hash = bcrypt.hashSync(req.body.password, salt);
            // creating a new student data in db
            const newStudent = new studentSchema({...req.body, password: hash});
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

// controller for login route
export const login = async (req, res)=>{
    const {password, username} = req.body;
    const student = await studentSchema.findOne({username});
    if(!student){
        res.status(404).json({
            success: false,
            message: "user doesn't exists",
        })
    }else{
        if(!bcrypt.compareSync(password, student.password)){
            res.status(403).json({
                success: false,
                message: "Incorrect password"
            })
        }else{
            console.log("hit")
            const {password, ...others} = student._doc; 
            const token = jwt.sign({id: req.body._id}, process.env.JWT_SECRET);
            res.cookie("token", token, {httpOnly: true}).status(200).json({
                success: true,
                message: "logged in successfully",
                ...others,
                "token": token
            })
        }
    }
}
