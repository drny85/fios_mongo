//jshint esversion:6

const express = require('express');

const router = express.Router();

const referralController = require('../controllers/referrals');

//getting all referrals
router.get('/referrals', referralController.getReferrals);

//adding a new referral 
router.get('/add-referral', referralController.addReferral);
//adding referral route
router.post('/add-referral', referralController.postReferral);
// referral detail route
router.get('/detail/:id', referralController.getReferral);
//editing referral route
router.get('/referral/edit/:id', referralController.editReferral);

router.post('/referral/update/:id', referralController.updateReferral);

module.exports = router;

