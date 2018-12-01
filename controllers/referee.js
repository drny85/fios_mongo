//jshint esversion:6
const Referral = require('../models/referral');
const Referee = require('../models/referee');
const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(transport({
  auth : {
    api_key : process.env.SENDGRID_API_KEY
    
  }
}));


//get Referee page
exports.getAddReferee = (req, res, next) => {
    let title = 'Add Referre';
    let path = 'add-referee';
  
    res.render('referrals/add-referee', {title: title, path: path , message: req.flash('error')});
  }



  exports.getReferees = (req, res, next) => {
    const title = 'All referees';
    const path = 'referees';
    
    
    Referee.find()
    .then(referees => {
  
      res.render('referrals/all-referees', {referees: referees, title: title, path: path});
    })
    .catch(err => console.log(err));
  }
  
  //post Referee or referee
  exports.postReferee = (req, res, next) => {
    const name = req.body.name;
    const last_name = req.body.last_name;
    const phone = req.body.phone;
    const email = req.body.email;
  
    
    
    Referee.findOne({name: name, last_name: last_name})
    .then(result => {
      if (result) {
        req.flash('error', 'Referee aldeay in Database');
        res.redirect('/add-referee');
        throw new Error('Referee already in file');
        
      } else {
        const referee = new Referee({
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
       
  
  