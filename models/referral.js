//jshint esversion:6
const mongoose = require('mongoose');
const ReferralBy = require('./referralby');

const Schema = mongoose.Schema;

const referralSchema = new Schema({
    name: { type: String, required: true},
    last_name: { type: String, required: true},
    address: Object,
    phone: {type: String, required: true},
    email: String,
    comment: String,
    status: String,
    moveIn: String,
    due_date: String,
    order_date: String,
    package: String,
    mon: String,
    date_entered: {type: Date, default: Date.now},
    referralBy: { type: Schema.Types.ObjectId, ref: 'Referee'}
    
});

module.exports = mongoose.model('Referral', referralSchema);