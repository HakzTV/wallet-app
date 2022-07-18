'use strict'

const {User } = require('../model')
const passport = require("passport")
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
    }
}

//   if (password.length < 6) {
//     return res.status(400).json({ message: "Password less than 6 characters" })
//   }
//   try {
//     await User.create({
//       name,
//       email,
//       password,
//     }).then(user =>
//       res.status(200).json({
//         message: "User successfully created",
//         user,
//       })
//     )
//   } catch (err) {
//     res.status(401).json({
//       message: "User not successful created",
//       error: error.mesage,
//     })
//   }
module.exports = controller;