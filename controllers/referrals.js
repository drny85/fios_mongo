//jshint esversion:6
const Referral = require('../models/referral');

exports.getReferrals = (req, res, next) => {
  let title = 'Referrals'
  res.render('referrals/referrals', { title: title })
}


exports.addReferral = (req, res, next) => {
    let title = 'Adding referral'
    res.render('referrals/add-referral', { title: title })
  }


exports.postReferral = (req, res, next) => {
  const name = req.body.name;
  const last_name = req.body.last_name;

  const referral = new Referral({
    name: name,
    last_name: last_name
  });
  referral.save()
  .then(result => {
    console.log("Saved");
    res.redirect('/');
  })
  .catch(err => console.log(err))
  
 
}
  




