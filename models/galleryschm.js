let mongoose = require("mongoose");

let GallerySchema= new mongoose.Schema({
    image: String,
	name: String,
	descriptions: String
});


module.exports = mongoose.model("Gallery", GallerySchema)