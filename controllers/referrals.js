

exports.getReferrals = (req, res, next) => {
  let title = 'Referrals'
  res.render('referrals/referrals', { title: title })
}


