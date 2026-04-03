import Record from "../models/record.Model.js";

export const fetchInsighs = async(req,res)=>{
    try{
        const records=await Record.find({isDeleted:false});

        let categoryAmount={};
        let monthlyAmount={};
        let categorycount ={};

        records.forEach((rec)=>{
            const category=rec.recordcategory||'other';
            const amount = rec.useramount;
            const date = rec.recorddate;

            const month = date.toLocaleString('default',
            {
                    month:'long',year:'numeric'
            });

            //amount per category
            categoryAmount[category]=(categoryAmount[category]||0)+amount;

            //amount per month
            monthlyAmount[month]=(monthlyAmount[month]||0)+amount;

            //count per category
            categorycount[category]=(categorycount[category]||0)+1;

        });

    //highest spending category show
     const highestSpendCategory = Object.keys(categoryAmount).length
      ? Object.keys(categoryAmount).reduce((a, b) =>
          categoryAmount[a] > categoryAmount[b] ? a : b
        )
      : null;
        
    //most frequest category show
 const mostFreqCategory = Object.keys(categoryCount).length
      ? Object.keys(categoryCount).reduce((a, b) =>
          categoryCount[a] > categoryCount[b] ? a : b
        )
      : null;

res.json({
highestSpendCategory,
mostFreqCategory,
totalTransactions:records.length
});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};