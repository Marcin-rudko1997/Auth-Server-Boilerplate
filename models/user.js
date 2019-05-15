const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//Defining the model
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});

//Hash the password using bcrypt [DONE]

userSchema.pre("save", function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {return next(err);}

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {return next(err);}

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePasswords = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err)
            return callback(err);
        callback(null, isMatch);
    })
}

//Defining the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model class
module.exports = ModelClass;
