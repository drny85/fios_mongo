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

exports.getReferrals = (req, res, next) => {
  let title = 'Referrals';
  let path = 'referrals';
  Referral.find()
  .populate('referralBy')
  .sort('moveIn')
  .exec()
  .then(referrals => {
    res.render('referrals/referrals', { title: title, referrals: referrals, path: path});
  })
  .catch(err => console.log(err));
  
};

exports.getReferral = (req, res, next) => {
  const id = req.params.id;
  Referral.findById(id)
  .populate('referralBy', 'name last_name -_id')
  .then(referral => {
   let title = "Details";
   let path = 'details';
    res.render('referrals/referral-detail', { referral: referral, title: title, path: path});
  });
};

//add a referral page
exports.getAddReferral = (req, res, next) => {
    let title = 'Adding referral';
    let path = 'add-referral';
    let refereesArray = [];
    Referee.find()
    .then(referees => {
      refereesArray = [...referees];
      res.render('referrals/add-referral', { title: title, path: path, referees:  refereesArray});
    })
   
  };

// editing a referral 
exports.editReferral = (req, res, next) => {
    const id = req.params.id;
    Referral.findOne({_id: id})
    .then(referral => {
      res.render('referrals/referral-edit', { referral: referral, title: "Editing", path: 'editing'});
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
  const Referee = req.body.Referee;
  const comment = req.body.comment;
  const status = req.body.status;
  const moveIn = req.body.moveIn;
  const mon = req.body.mon;
  const due_date = req.body.due_date;
  const order_date = req.body.order_date;
  const package = req.body.package;


  Referral.findOneAndUpdate({_id: id}, {
    name: name,
    last_name: last_name,
    address: address,
    email: email,
    phone: phone,
    comment: comment, 
    Referee: Referee,
    status: status,
    due_date: due_date,
    order_date: order_date,
    package: package,
    mon: mon,
    moveIn: moveIn
  }).then(referral => {
   
    res.redirect('/detail/'+referral._id);
    // if ( status.toLowerCase() === 'closed') {
    //   return transporter.sendMail({
    //     to: 'drny85@me.com',
    //     from: 'drny85@gmail.com',
    //     subject: 'Testing',
    //     html: ` <!DOCTYPE html>
    //     <html>
    //       <head>
    //         <!--Import Google Icon Font-->
    //         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    //         <!--Import materialize.css-->
    //         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      
    //         <!--Let browser know website is optimized for mobile-->
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    //       </head>
      
    //       <body>
          
    //        <div class="z-depth-2">
    //         <h5 class="center"> This referral has been closed </h5.
    //         <br>
    //         Name: <p>${name} ${last_name}</p>
    //         MON: <p>${mon} </p>
    //         Phone: <p>${phone} </p>
    //        </div>
    //       </body>
    //     </html>
    //           `
    //   })
    // }
  })
  .catch(err => console.log(err));

}

//get Referee page
exports.getAddReferee = (req, res, next) => {
  let title = 'Add Referre';
  let path = 'add-referee';

  res.render('referrals/add-referee', {title: title, path: path , message: req.flash('error')});
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
    return Referee.findById(referralBy)
  }).then(ref => {
    console.log(ref);
    res.redirect('/referrals')
  })
  .catch(err => console.log(err));
  
 
};


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
     

  




