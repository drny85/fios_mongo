//jshint esversion:6
const mongoose = require('mongoose');

const Referral = require('./referral');

const Schema = mongoose.Schema;

const referralBySchema = new Schema({
    name: {type: String, required: true},
    last_name: String,
    email: String,
    referrals: [Referral]
})

const referralBy = mongoose.model('Referee', referralBySchema);

module.exports = referralBy;

