//jshint esversion:6

const express = require('express');

const router = express.Router();

const referralController = require('../controllers/referrals');

//getting all referrals
router.get('/referrals', referralController.getReferrals);

//adding a nw referral 
router.get('/add-referral', referralController.addReferral);

router.post('/add-referral', referralController.postReferral);



module.exports = router;

