//jshint esversion:6
const Referral = require('../models/referral');
const ReferralBy = require('../models/referralby');

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
  const mon = req.body.mon;
  const due_date = req.body.due_date;
  const order_date = req.body.order_date;
  const package = req.body.package;


  Referral.findByIdAndUpdate(id, {
    name: name,
    last_name: last_name,
    address: address,
    email: email,
    phone: phone,
    comment: comment, 
    referralBy: referralBy,
    status: status,
    due_date: due_date,
    order_date: order_date,
    package: package,
    mon: mon,
    moveIn: moveIn
  }).then(referral => {
    res.redirect('/detail/'+referral._id);
  })
  .catch(err => console.log(err));

}

//get referralby page
exports.getReferralBy = (req, res, next) => {
  let title = 'Referral By';
  let path = 'referralby';

  res.render('referrals/referral-by', {title: title, path: path});
}

//post referralBy or referee
exports.postReferralBy = (req, res, next) => {
  const title = 'Add Referee';
  const path = 'adding referee';
  const name = req.body.name;
  const last_name = req.body.last_name;
  const phone = req.body.phone;
  const email = req.body.email;

  ReferralBy.findOne({name: name, last_name: last_name})
  .then(result => {
    if (result) {
      res.redirect('/referralby');
      throw new Error('Referee already in file');
      
    } else {
      const referee = new ReferralBy({
        name: name,
        last_name: last_name,
        phone: phone,
        email: email,
        referrals: []
      })
      referee.save()
      .then((ref) => {
        res.redirect('/all-referees');
      })
    }
  }).catch(err => console.log(err));
  

}
     
  


  

//delete referral
exports.deleteReferral = (req, res, next) => {
  const id = req.params.id;
  Referral.findByIdAndDelete(id)
  .then(() => {
    res.redirect('/referrals');
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


exports.getReferees = (req, res, next) => {
  const title = 'All referees';
  const path = 'all referess';
  
  ReferralBy.find()
  .then(referees => {
    res.render('referrals/all-referees', {referees: referees, title: title, path: path});
  })
  .catch(err => console.log(err));
}

  




