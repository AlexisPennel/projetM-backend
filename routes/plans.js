const express = require('express');
const plansCtrl = require('../controllers/plans');
const auth = require('../middleware/auth');
const checkPlan = require('../middleware/checkPlan');
const router = express.Router();

router.get('/', auth, plansCtrl.getPlan);

router.post('/', auth, checkPlan, plansCtrl.postPlan);

router.put('/:id', auth, plansCtrl.updatePlan);

router.delete('/:id', auth, plansCtrl.deletePlan);


module.exports = router;