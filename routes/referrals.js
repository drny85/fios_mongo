//jshint esversion:6

const express = require('express');

const router = express.Router();

const reportController = require('../controllers/referrals');

router.get('/referrals', reportController.getReferrals);

module.exports = router;

