import Record from '../models/record.Model.js';

export const fetchRecordSummary = async (req, res) => {
try{
   const records=await Record.find({isDeleted:false});

   let totalincome=0;
   let totalexpense=0;
   let categorySummary={};

   records.forEach((record)=>{
     const recordamount=record.useramount;
     const recordtype=record.typeofRecord;
     const recordcategory=record.recordcategory;

    if(recordtype==='income'){
        totalincome+=recordamount;
    }else if(recordtype==='expense'){   
        totalexpense+=recordamount;
    }
    if(!categorySummary[recordcategory]){
        categorySummary[recordcategory]=0;
    }
    categorySummary[recordcategory]+=recordamount;
   });
   
   res.json({
    totalincome,
    totalexpense,
    netbalance:totalincome-totalexpense,
    categorySummary
   });
}
catch(err){
    res.status(500).json({ message: err.message });
}
};