//jshint esversion:6

exports.index = (req, res, next) => {
    let title = 'Welcome Page'
    res.render('home/index', {title: title});
}

exports.mainPage = (req, res, next) => {
    let title = 'Main Page'
    res.render('home/main', {title: title});
}



