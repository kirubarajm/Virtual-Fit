const LocalStrategy = require('passport-local');
const Client = require('../models/client');
const Customer = require('../models/customer');

module.exports = (passport, app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use('client', new LocalStrategy(Client.authenticate()));
  passport.use('customer', new LocalStrategy(Customer.authenticate()));
  passport.serializeUser((user, done) => {
    const key = {
      id: user.id,
      type: user.constructor.modelName,
    };
    done(null, key);
  });
  passport.deserializeUser((key, done) => {
    const Model = key.type === 'Customer' ? Customer : Client;
    Model.findOne({
      _id: key.id,
    }, '-salt -password', (err, user) => {
      done(err, user);
    });
  });
};
