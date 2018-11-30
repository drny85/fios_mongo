//jshint esversion:6
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const referralSchema = new Schema({
    name: { type: String, required: true},
    last_name: { type: String, required: true},
    address: Object,
    phone: {type: String, required: true},
    email: String,
    referralBy: String,
    comment: String,
    status: String,
    moveIn: String,
    date_entered: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('Referral', referralSchema);