const Users = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

//User is already auth'd, send him a token 
exports.signin = (req, res, next) => {
    res.send({token: tokenForUser(req.user)});
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        res.status(422).send({error: 'You must provide an email and a password!'});
    }

    Users.findOne({email: email}, (err, existingUser) => {
        if(err) {return next(err);}

        if(existingUser) {
            res.status(422).send({error: 'Email already in use'});
        }

        const user = new Users({
            email,
            password
        });

        user.save(err => {
            if(err) {return next(err);}

            res.json({token: tokenForUser(user)});
        })
    })
}