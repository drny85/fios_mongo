//jshint esversion:6
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


//main app
const app = express();
// set views engine 
app.set('view engine', 'ejs');
app.set('views', 'views');
//midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const homeRoutes = require('./routes/home');
const reportRoutes = require('./routes/reports');
const referralRoutes = require('./routes/referrals');


app.use(homeRoutes);
app.use(reportRoutes);
app.use(referralRoutes);



let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server started');
})
