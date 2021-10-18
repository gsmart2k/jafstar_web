const mongoose = require("mongoose")

const Schema = mongoose.Schema


//  Creating Schema

const ItemsSchema = new Schema({
    Itemname:String,
    Itemprice:Number,
    Itemimage:String

})


const Items = mongoose.model("items", ItemsSchema)

module.exports = Items
