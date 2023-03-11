const Plan = require('../models/Plan');



const checkPlan = async (req, res, next) => {
    
   const existingPlan = await Plan.findOne({userId :req.auth.userId});
   
   if (!req.body.mondayBreakfast || !req.body.sundayDinner){
    return res.status(400).json({message: 'No body'});
    }

   if (existingPlan) {
        return res.status(400).json({message : 'Already exist'});
   } else {
    next()
   }
};

module.exports = checkPlan;