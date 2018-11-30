//jshint esversion:6
const Referral = require('../models/referral');

exports.getReferrals = (req, res, next) => {
  let title = 'Referrals';
  let path = 'referrals';
  Referral.find()
  .sort('moveIn')
  .exec()
  .then(referrals => {
    res.render('referrals/referrals', { title: title, referrals: referrals, path: path});
  })
  .catch(err => console.log(err));
  
};

exports.getReferral = (req, res, next) => {
  const id = req.params.id;
  Referral.findById(id).then(referral => {
   let title = "Details";
   let path = 'details';
    res.render('referrals/referral-detail', {referral:referral, title: title, path: path});
  });
};

//add a referral page
exports.addReferral = (req, res, next) => {
    let title = 'Adding referral';
    let path = 'add-referral';
    res.render('referrals/add-referral', { title: title, path: path });
  };

// editing a referral 
exports.editReferral = (req, res, next) => {
    const id = req.params.id;
    Referral.findOne({_id: id})
    .then(referral => {
      res.render('referrals/referral-edit', {referral: referral, title: "Editing", path: 'editing'});
    })
    .catch(err => console.log(err));
};

//update referral
exports.updateReferral = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const last_name = req.body.last_name;
  const address = {
    address: req.body.address,
    apt: req.body.apt,
    city: req.body.city,
    zipcode: req.body.zipcode
  };
  const email = req.body.email;
  const phone = req.body.phone;
  const referralBy = req.body.referralBy;
  const comment = req.body.comment;
  const status = req.body.status;
  const moveIn = req.body.moveIn;

  Referral.findByIdAndUpdate(id, {
    name: name,
    last_name: last_name,
    address: address,
    email: email,
    phone: phone,
    comment: comment, 
    referralBy: referralBy,
    status: status,
    moveIn: moveIn
  }).then(referral => {
    console.log(referral);
    res.redirect('/detail/'+referral._id);
  })
  .catch(err => console.log(err));

}

//adding the referral handler page
exports.postReferral = (req, res, next) => {
  const name = req.body.name;
  const last_name = req.body.last_name;
  const address = {
    address: req.body.address,
    apt: req.body.apt,
    city: req.body.city,
    zipcode: req.body.zipcode
  };
  const email = req.body.email;
  const phone = req.body.phone;
  const referralBy = req.body.referralBy;
  const comment = req.body.comment;
  const status = req.body.status;
  const moveIn = req.body.moveIn;

  const referral = new Referral({
    name: name,
    last_name: last_name,
    address: address,
    email: email,
    phone: phone,
    comment: comment, 
    referralBy: referralBy,
    status: status,
    moveIn: moveIn

  });
  referral.save()
  .then(result => {
    console.log("Saved");
    res.redirect('/referrals');
  })
  .catch(err => console.log(err));
  
 
};

  




