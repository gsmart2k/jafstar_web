const mongoose = require("mongoose")

const Schema = mongoose.Schema


//  Creating Schema


const PhotoModelSchema = new Schema({
    Modelname:String,
    Modelimages:[String]
})


const PhotoModels = mongoose.model("photomodel", PhotoModelSchema)

module.exports = PhotoModels
