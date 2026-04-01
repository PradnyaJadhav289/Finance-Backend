import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    useremail:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    userPassword:{
        type:String,
        required:true,
        trim:true
    },
    userrole:{
        type:String,
        enum:['viewer','admin','analyst'],
        default:'viewer',
    },
    userstatus:{
        type:String,
        enum:['active','inactive'],
        default:'active',
    },
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;