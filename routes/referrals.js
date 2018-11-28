//jshint esversion:6

const express = require('express');

const router = express.Router();

const reportController = require('../controllers/referrals');

//getting all referrals
router.get('/referrals', reportController.getReferrals);

//adding a nw referral 
router.get('/add-referral', reportController.addReferral);



module.exports = router;

