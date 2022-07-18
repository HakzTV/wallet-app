'use strict'

const {User } = require('../model')
const passport = require("passport")
const session = require("express-session")
const controller = {
    register: async (req, res) => {

        const { name, email, password} = req.body

        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })
        newUser.save()
        res.end()
    },
    login: async(req, res)=>{
        const {email, password} = req.body;
        const user = new User({
            email: req.body.name, 
            password:req.body.password
        })
        req.login(user, function(err){
            if(err){
                console.log(err)
            }else{
                passport.authenticate("local")(req, res, function(){
                    res.send(200)
                })
            }
        })
    }, 
    logout: async(req, res)=>{
        if(req.session.isLoggin)
        req.logout()
        res.redirect('/login')
    }
}


module.exports = controller;