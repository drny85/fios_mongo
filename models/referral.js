const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const referralSchema = new Schema({
    name: { type: String, required: true},
    last_name: { type: String, required: true},
    // addres: {
    //     address: {type: String, required: true},
    //     apt: String,
    //     city: {type: String, required: true},
    //     zipcode: String
    // },
    address: Object,
    phone: {type: String, required: true},
    email: String,
    referralBy: String,
    comment: String,
    status: String
    
})

module.exports = mongoose.model('Referral', referralSchema);