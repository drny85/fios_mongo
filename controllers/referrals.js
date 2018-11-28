

exports.getReferrals = (req, res, next) => {
  let title = 'Referrals'
  res.render('referrals/referrals', { title: title })
}


exports.addReferral = (req, res, next) => {
    let title = 'Adding referral'
    res.render('referrals/add-referral', { title: title })
  }
  




