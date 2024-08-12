const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const engine = require('ejs-locals');

const app = express();
const cors = require('cors');
const config = require('./config');
const routes = require('./app/routes');
const authSetup = require('./app/utils/authsetup');

mongoose.connect(config.dbURI);
// const corsOptions = {
//   origin: config.appBaseURL,
//   methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   allowedHeaders: ['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept'],
//   credentials: true,
// };
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', engine);
app.set('view engine', 'ejs');
// app.use(cors(corsOptions));
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  }),
);

authSetup(passport, app);

app.use((req, res, next) => {
  if (req.user) {
    res.locals.userType = req.user.constructor.modelName;
  }
  return next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '30mb',
  extended: true,
}));

app.use(routes);
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
