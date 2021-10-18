const mongoose = require("mongoose")

const Schema = mongoose.Schema


//  Creating Schema
const cartSchema = new Schema({
    Itemname: String,
    Itemprice: Number,
    Itemimage:String
})

const UsersSchema = new Schema({
    Name:String,
    Email:String,
    Phonenumber:String,
    Cartcontent:[cartSchema],
    Password:String
})
// 0365915886
// 2016991701

const Users = mongoose.model("users", UsersSchema)

module.exports = Users
