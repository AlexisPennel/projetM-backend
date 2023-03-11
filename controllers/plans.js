const Plan = require('../models/Plan');

exports.getPlan = (req, res, next) => {
    Plan.find({userId: req.auth.userId})
        .then(Plan => res.status(200).json(Plan))
        .catch(error => res.status(400).json({ error }));
};


exports.postPlan = (req, res, next) => {
    const planObject = req.body;
    delete planObject._userId;

    const plan = new Plan({
        ...planObject,
        userId: req.auth.userId,
        mondayBreakfast: planObject.mondayBreakfast.trim(),
        mondayLunch: planObject.mondayLunch.trim(),
        mondayDinner: planObject.mondayDinner.trim(),
        tuesdayBreakfast: planObject.tuesdayBreakfast.trim(),
        tuesdayLunch: planObject.tuesdayLunch.trim(),
        tuesdayDinner: planObject.tuesdayDinner.trim(),
        wednesdayBreakfast: planObject.wednesdayBreakfast.trim(),
        wednesdayLunch: planObject.wednesdayLunch.trim(),
        wednesdayDinner: planObject.wednesdayDinner.trim(),
        thursdayBreakfast: planObject.thursdayBreakfast.trim(),
        thursdayLunch: planObject.thursdayLunch.trim(),
        thursdayDinner: planObject.thursdayDinner.trim(),
        fridayBreakfast: planObject.fridayBreakfast.trim(),
        fridayLunch: planObject.fridayLunch.trim(),
        fridayDinner: planObject.fridayDinner.trim(),
        saturdayBreakfast: planObject.saturdayBreakfast.trim(),
        saturdayLunch: planObject.saturdayLunch.trim(),
        saturdayDinner: planObject.saturdayDinner.trim(),
        sundayBreakfast: planObject.sundayBreakfast.trim(),
        sundayLunch: planObject.sundayLunch.trim(),
        sundayDinner: planObject.sundayDinner.trim(),
    })

    plan.save()
            .then(() => { res.status(201).json({ message: 'Plan created' }) })
            .catch(error => { res.status(400).json({ error }) })

};

exports.updatePlan = (req, res, next) => {
    const planObject = req.body;

    delete planObject._userId;
    planObject.mondayBreakfast = planObject.mondayBreakfast.trim(),
    planObject.mondayBreakfast = planObject.mondayBreakfast.trim(),
    planObject.mondayLunch = planObject.mondayLunch.trim(),
    planObject.mondayDinner =  planObject.mondayDinner.trim(),
    planObject.tuesdayBreakfast = planObject.tuesdayBreakfast.trim(),
    planObject.tuesdayLunch = planObject.tuesdayLunch.trim(),
    planObject.tuesdayDinner = planObject.tuesdayDinner.trim(),
    planObject.wednesdayBreakfast = planObject.wednesdayBreakfast.trim(),
    planObject.wednesdayLunch = planObject.wednesdayLunch.trim(),
    planObject.wednesdayDinner = planObject.wednesdayDinner.trim(),
    planObject.thursdayBreakfast = planObject.thursdayBreakfast.trim(),
    planObject.thursdayLunch = planObject.thursdayLunch.trim(),
    planObject.thursdayDinner = planObject.thursdayDinner.trim(),
    planObject.fridayBreakfast = planObject.fridayBreakfast.trim(),
    planObject.fridayLunch = planObject.fridayLunch.trim(),
    planObject.fridayDinner = planObject.fridayDinner.trim(),
    planObject.saturdayBreakfast = planObject.saturdayBreakfast.trim(),
    planObject.saturdayLunch = planObject.saturdayLunch.trim(),
    planObject.saturdayDinner = planObject.saturdayDinner.trim(),
    planObject.sundayBreakfast = planObject.sundayBreakfast.trim(),
    planObject.sundayLunch = planObject.sundayLunch.trim(),
    planObject.sundayDinner = planObject.sundayDinner.trim(),

    Plan.findOne({ _id: req.params.id })
        .then((plan) => {
            if (plan.userId != req.auth.userId) {
                res.status(401).json({ message: 'No authorized' });
                return
            }

            Plan.updateOne({ _id: req.params.id }, { ...planObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Plan modified' }))
                .catch(error => res.status(401).json({ error }));

        })
        .catch((error) => {
            res.status(404).json({ message: `the plan doesn't exist` });
        });
};

exports.deletePlan = (req, res, next) => {
    Plan.findOne({ _id: req.params.id })
        .then(plan => {
            if (plan.userId != req.auth.userId) {
                res.status(401).json({ message: 'No authorized' });
                return
            }

            Plan.deleteOne({ _id: req.params.id })
                .then(() => { res.status(204).json() })
                .catch(error => res.status(401).json({ error }));
        })
        
        .catch(error => {
            res.status(404).json({ message: 'Plan no found' });
        })
};

