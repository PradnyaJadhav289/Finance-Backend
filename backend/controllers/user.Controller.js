import User from '../models/user.model.js';

export const makeUser=async(req,res)=>{
    try{
        const oneuser=new User(req.body);
        await oneuser.save();
        res.json(oneuser);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//fetch users 
export const fetchusers=async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message:err.message});
    }
 }

 //update user
    export const modifyuser=async(req,res)=>{  
        try{
            const {id}=req.params;
            const ouser=await User.findById(id);
            Object.assign(ouser,req.body);
            await ouser.save();
            res.json(ouser);
        }catch(err){
            res.status(500).json({message:err.message});
        }
    };
    export const removeuser=async(req,res)=>{
        try{
            const {id}=req.params;
            const ouser=await User.findByIdAndDelete(id);
            
            if(!ouser){
                return res.status(404).json({message:"user not found"});
            }
            
            res.json({message:"user removed"});
        }catch(err){
            res.status(500).json({message:err.message});
        }
    };


