const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-find-or-create')

const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    }, 
    password:{
        type: String, 
        required: true,
        minlength: 6,
        // unique: true
    }, 
    wallet:{
        type: String,
        id: Number
    }
})
userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)
const User = new mongoose.model("user", userSchema)

module.exports.User = User
