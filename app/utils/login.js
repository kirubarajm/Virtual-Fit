const passport = require('passport');

module.exports = (req, res, next, strategy) => {
  passport.authenticate(strategy,
    {
      failureRedirect: `/${strategy}/login`,
      successRedirect: `${strategy}/`,
    });
};
