const Authentication = require('./controllers/authentication');
const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = app => {
    app.get('/', requireAuth, function(req, res) {
        res.send({success: true});
    })
    app.post('/signin', requireSignIn, Authentication.signin);
    app.post('/signup', Authentication.signup);
}