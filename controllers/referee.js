//jshint esversion:6
const Referral = require('../models/referral');
const Referee = require('../models/referee');
const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');
const _ = require('lodash');

const transporter = nodemailer.createTransport(transport({
  auth : {
    api_key : process.env.SENDGRID_API_KEY
    
  }
}));


//get Referee page
exports.getAddReferee = (req, res, next) => {
    let title = 'Add Referre';
    let path = 'add-referee';
  
    res.render('referee/add-referee', {title: title, path: path , message: req.flash('error')});
  }



  exports.getReferees = (req, res, next) => {
    const title = 'All referees';
    const path = 'referees';
    
    
    Referee.find()
    .then(referees => {
  
      res.render('referee/all-referees', {referees: referees, title: title, path: path});
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
       
exports.getOneReferee = (req, res, next) => {

  const id = req.params.id;
  const title = 'Referee Details';
  const path = 'referee-details';

  Referee.findOne({_id: id})
  .then(referee => {
    res.render('referee/details', {referee: referee, title: title, path: path});
  })
  .catch(err => console.log(err));
}

//get edit referee page

exports.getEditReferee = (req, res, next) => {

  const title = 'Edit Referee';
  const path = 'edit referee';
  const id = req.params.id;
  Referee.findOne({_id: id})
  .then(referee => {
    res.render('referee/edit', {referee: referee, title: title, path: path});
  })
  .catch(err => console.log(err))
}

//post update referre page

exports.postUpdateReferee = ( req, res) => {
  const id = req.params.id;
  const title = "Update Referee";
  const path = 'update referee';
  const body = _.pick(req.body, ['name', 'last_name', 'email', 'phone']);

  Referee.findByIdAndUpdate(id, body)
  .then(referee => {
    res.redirect('/referee/details/'+ id);
  })
  .catch();
  

}


  