//jshint esversion:6
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const MONGO_URL = 'mongodb://localhost:27017/referral';
//main app
const app = express();
app.use(helmet());
//storing sessions
const store = new MongoDBStore({
    uri: MONGO_URL,
    collection: 'sessions'
  });
// setting sessions
  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
  
// set views engine 
app.set('view engine', 'ejs');
app.set('views', 'views');
//midlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// setting routes
const homeRoutes = require('./routes/home');
const reportRoutes = require('./routes/reports');
const referralRoutes = require('./routes/referrals');


app.use(homeRoutes);
app.use(reportRoutes);
app.use(referralRoutes);


mongoose
  .connect(MONGO_URL, {useNewUrlParser: true})
  .then(result => {
    let PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log('Server started');
  })
  .catch(err => {
    console.log(err);
  });

