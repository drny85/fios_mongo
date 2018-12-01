//jshint esversion:6
const mongoose = require('mongoose');

const Referral = require('./referral');

const Schema = mongoose.Schema;

const referralBySchema = new Schema({
    name: {type: String, required: true},
    last_name: String,
    phone: String,
    email: String,
    referrals: {type: [Schema.Types.ObjectId], ref: 'Referral'}
})

const referre = mongoose.model('Referee', referralBySchema);

module.exports = referre;

