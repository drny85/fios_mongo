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

//update referral route
router.post('/referral/update/:id', referralController.updateReferral);

//delete referral route
router.post('/referral/delete/:id', referralController.deleteReferral);

//get referralby page route
router.get('/referralby', referralController.getReferralBy);

//add referralBy or referee 
router.post('/add-referee', referralController.postReferralBy);

//get all referees route
router.get('/all-referees', referralController.getReferees);

module.exports = router;

