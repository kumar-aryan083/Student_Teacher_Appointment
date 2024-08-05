import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone: String
},{timestamp: true});

export default mongoose.model('Student', studentSchema);