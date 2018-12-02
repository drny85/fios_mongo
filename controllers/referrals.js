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
  .populate('referralBy', 'name last_name')
  .sort('moveIn')
  .exec()
  .then(referrals => {
    console.log(referrals);
    res.render('referrals/referrals', { title: title, referrals: referrals, path: path});
  })
  .catch(err => console.log(err));
  
};

exports.getReferral = (req, res, next) => {
  const id = req.params.id;
  Referral.findById(id)
  .populate('referralBy', 'name last_name _id')
  .then(referral => {
   let title = "Details";
   let path = 'details';
    res.render('referrals/referral-detail', { referral: referral, title: title, path: path});
  }).catch(err => console.log(err));
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
  let referralBy;

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
  })
  .populate('referralBy', 'name last_name')
  .then(referral => {
    referralBy = `${referral.referralBy.name} ${referral.referralBy.last_name}`;
    res.redirect('/detail/'+referral._id);
    if ( status.toLowerCase() === 'closed') {
      return transporter.sendMail({
        to: `drny85@icloud.com`,
        from: 'robertm3lendez@gmail.com',
        cc: 'robert.melendez@drascosales.com',
        subject: `Referral Closed Notification!`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <!--Import Google Icon Font-->
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <!--Import materialize.css-->
               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
          
                 <!--Let browser know website is optimized for mobile-->
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title></title>
        </head>
        <body>
        
            <div class="z-depth-4 row">
                <div class="card col s12">
                    <h4 class="center">Bellow Referral has been closed!</h4>
                    <div>
                            <ul class="collection with-header">
                                    <li style="text-transform:capitalize;" class="collection-header"><h4>${name} ${last_name}</h4></li>
                                    <li style="text-transform:uppercase;" class="collection-item">MON: <b>${mon}</b></li>
                                    <li  class="collection-item">Due Date: ${due_date}</li>
                                    <li class="collection-item">Order Placed On: ${order_date}</li>
                                    <li class="collection-item">Package: ${package}</li>
                                    <li style="text-transform:capitalize;" class="collection-item">Address: ${address.address}</li>
                                    <li style="text-transform:capitalize;" class="collection-item">City: ${address.city}</li>
                                    <li class="collection-item">Phone: ${phone}</li>
                                    <li class="collection-item">Email: ${email}</li>
                                    <li class="collection-item">Move In: ${moveIn}</li>
                                    <li style="text-transform:capitalize;" class="collection-item">Referral By: ${referralBy}</li>
        
                                  </ul>
                                <div style="margin-bottom:100px; class="z-depth-3">
                                    <h5 class="grey center">Notes or Comments</h5>
                                    <p style="padding: 10px" class="center-align">${comment}</p>
                                </div>
        
                    </div>
                </div>
                
            </div>
            
        </body>
        </html>
        `
       
      })
    }
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
  .populate('referralBy', 'name last_name')
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

    ref.referrals.push(referral._id);
    ref.save();
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

exports.getAllReferralsById = (req, res) => {
  const id = req.params.id;
Referral.find({referralBy: id})
  .populate('referralBy', 'name last_name')
  .sort('moveIn')
  .exec()
  .then(referrals => {
    console.log('Result;', referrals);
    const title = 'My Referrals';
    const path = 'personal referrals'
    res.render('referrals/personal-referral', {referrals: referrals, title: title, path: path});
  })
  .catch(err => console.log(err));
}
     

exports.getReferralsStatus = (req, res) => {
   let status = req.params.status;
   let statusRequested = status;

   if (statusRequested === 'not%20sold') {
     statusRequested = 'not sold';
   } else if (statusRequested === 'in%20progress') {
    statusRequested = 'in progress';
   }

   
   console.log(statusRequested);
   const title = 'My Referrals';
   const path = 'my referrals';
   if ( statusRequested !== 'all') {
     Referral.find({status: statusRequested})
     .sort('-moveIn')
     .exec()
     .then(referrals => {

      referrals = [...referrals];
       
       res.render('referrals/my-referrals', { referrals: referrals, title: title, path : path, status: statusRequested});
     })
     .catch(err => console.log(err));
   } else {
    Referral.find()
    .sort('-moveIn')
    .exec()
    .then(referrals => {
      referrals = [...referrals];
      res.render('referrals/my-referrals', { referrals: referrals, title: title, path : path, status: statusRequested});
    })
    .catch(err => console.log(err));
 
   }
}

  




