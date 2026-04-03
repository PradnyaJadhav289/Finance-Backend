import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    limit:{
        type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
    }


},{
    timestamps:true
});

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;