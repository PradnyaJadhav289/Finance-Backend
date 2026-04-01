import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    useramount:{
        type:Number,
        required:true,
        min:0
    },
    typeofRecord:{
        type:String,
        enum:['income','expense'],
        required:true
    },
    recordcategory:{
        type:String,
        trim:true
    },
    recordnote:{
        type:String,
        trim:true
    },
    recorddate:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:String,
        required:true,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Record=mongoose.model('Record',recordSchema);

export default Record;