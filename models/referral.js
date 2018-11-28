const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const referralSchema = new Schema({
    name: { type: String, required: true},
    last_name: { type: String, required: true}
    
})

exports = mongoose.model('Referral', referralSchema);