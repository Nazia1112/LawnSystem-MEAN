const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

userSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username:{
        type: String,
        unique:true
    },
    password:{
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: Number
    }

});



module.exports = mongoose.model('nbUsers', userSchema);