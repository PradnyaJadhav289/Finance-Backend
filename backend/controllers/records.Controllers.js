import Record from '../models/record.Model.js';

export let autoCategory = (recordnote) =>{
    if(!recordnote || recordnote.trim()==''){
        if(!recordnote) return 'other';

        recordnote = recordnote.toLowerCase();
        if(recordnote.includes("zomato")|| recordnote.includes("swiggy") )  return "food";
        if(recordnote.includes("uber")|| recordnote.includes("ola") )  return "transport";
        if(recordnote.includes("amazon")|| recordnote.includes("flipkart") )  return "shopping";
        if(recordnote.includes("salary")|| recordnote.includes("bonus") )  return "income";
        if(recordnote.includes("rent")|| recordnote.includes("house") )  return "rent";
        if(recordnote.includes("gym")|| recordnote.includes("fitness") )  return "health";
        if(recordnote.includes("movie")|| recordnote.includes("netflix") )  return "entertainment";
        if(recordnote.includes("gift")|| recordnote.includes("present") )  return "gift";
        if(recordnote.includes("education")|| recordnote.includes("course") )  return "education";

        return "other";

    };
}

//create record
export const makeRecord=async (req,res) => {
    try{
        let {useramount,recordcategory,recordnote,recorddate,typeofRecord}=req.body;
        
        if(!useramount || useramount <=0){
            return res.status(400).json({message:"amount is invalid"});
        }

        if(!typeofRecord || (typeofRecord !=='income' && typeofRecord!=='expense')){
            return res.status(400).json({message:"type is invalid ,it should be either income or expense"});
        }

        if(!recordcategory || recordcategory.trim()==''){
            recordcategory= autoCategory(recordnote);
        }

        const record = new Record({
             useramount: useramount,
      typeofRecord: typeofRecord,
      recordcategory: recordcategory,
      recordnote: recordnote,
      recorddate: recorddate || new Date(),
      createdBy: req.headers.user || "admin"
        });
        await record.save();

        res.status(201).json({
            message:"Record created successfully",
            data:record
        })
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

// get records
export const fetchAllfinaceRecord=async(req,res)=>{
    try{
        const {type,category,startDate,endDate,minimumamount,maximumamount ,createdBy} = req.query;

        let filter= {isDeleted:false};

        if(type){
            filter.type = type;
        }
        if(category){
            filter.category = category;
        }
        if(minimumamount || maximumamount){
            filter.amount={};
            
            if(minimumamount) {
                filter.amount.$gte=Number(minimumamount);
            }
            if(maximumamount) {
                filter.amount.$lte=Number(maximumamount);
            }
        }
        if(createdBy){
            filter.createdBy = createdBy;
        }
        if(startDate ||endDate){
            filter.date={};
            if(startDate){
                filter.date.$gte=new Date(startDate);
            }
            if(endDate){
                filter.date.$lte=new Date(endDate);
            }
        }

        const records=await Record.find(filter).sort({date:-1});
        res.json(records);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

//modify record 
export const modifyRecord=async(req,res)=>{
    try{
        const {id}=req.params;
        let {useramount,typeofRecord,recordcategory,recordnote,recorddate,updatedBy}=req.body;
        const orecord=await Record.findById(id);
        
        if(!orecord || orecord.isDeleted){
            return res.status(404).json({message:"record not found"});
        }
        if(useramount && useramount >=0){
         return res.status(400).json({message:"amount is invalid"});
        }
        if(recordcategory && recordcategory.trim()==''){
            recordcategory=autoCategory(recordnote);
        }

        updatedBy = req.headers.user || 'admin';
         
        orecord.useramount=useramount || orecord.useramount;
        orecord.type=typeofRecord || orecord.type;
        orecord.category=recordcategory || orecord.category;
        orecord.recordnote=recordnote || orecord.recordnote;
        orecord.date=recorddate || orecord.date;
        await orecord.save();

        res.json({
            message:"record updated successfully",
            data:orecord
        });

        }
        catch(err){
            res.status(500).json({message:err.message});
        }
};

//remove record
export const removeRecord=async(req,res)=>{
    try{
        const {id}=req.params;
        const orecord=await Record.findById(id);
        
        if(!orecord || orecord.isDeleted){
            return res.status(404).json({message:"record not found"});
        }

        orecord.isDeleted=true;
        await orecord.save();

        res.json({
            message:"record deleted successfully",
            data:orecord
        });

        }
        catch(err){
            res.status(500).json({message:err.message});
        }
};


