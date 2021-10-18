const { before } = require("lodash")
const mongoose = require("mongoose")
const Users = require("../models/users")

// Connect to mongodb


mongoose.connect("mongodb://localhost/JafstartDb",{useNewUrlParser:true, useUnifiedTopology:true})

mongoose.connection.once("open",()=>{
    console.log("Connection has been made!!!")
}).on('error',()=>{
    console.log('error')
})

// var userdetails = new Users({
//     Name:"Gbolahan",
//     Email:"Ogunrinadegbolahan2000@gmail.com",
//     Password:"Fatherwell"
// })

//     // userdetails.save().then(()=>{
//     //     console.log("Saving") 
//     // })
// Users.find({Name:"Gbolahan"}).then((result)=>{
//     var us = result
//     console.log(us)
// })
