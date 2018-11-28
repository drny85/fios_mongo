//jshint esversion:6
exports.reports = (req, res, next) => {
  let title = 'Reports'
  res.render('reports/reports', { title: title })
}
