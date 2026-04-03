import Budget from "../models/budget.Model.js";
import Record from "../models/record.Model.js";

export const fixBudget = async(req,res)=>{
    try{
        const {category, limit} = req.body;
        const createdBy = req.headers.user;

        if(!category || !limit){
            return res.status(400).json({message:"Category and limit are required"});
        }

        const budget = new Budget({
            category,
            limit,
            createdBy
        });

        await budget.save();
        res.status(201).json({message:"Budget set successfully", budget});
    } catch (error) {
        res.status(500).json({message:"Error setting budget", error});

    }
};

export const fetchBudgets = async(req,res)=>{
    try{
        const user = req.headers.user;
        const budgets = await Budget.find({createdBy:user});
        const records = await Record.find({isDeleted:false});
        let alters =[];
        let tips = [];

        budgets.forEach((budget)=>{
            let total=0;
            records.forEach((r)=>{
             if(r.recordcategory === budget.category && r.typeofRecord === 'expense'){
                total += r.amount;
             }
            });
            if(total > budget.limit){
                tips.push(`You have exceeded your budget for ${budget.category} by ${total - budget.limit}`);
            }
            tips.push(`Your total spending for ${budget.category} is ${total} out of your budget limit of ${budget.limit}`);
            tips.push(`Consider reducing your spending on ${budget.category} to stay within your budget.`);
            
        })
        res.json({alters, tips})
    } catch (error) {
        res.status(500).json({message:"Error fetching budgets", error});
    }
}