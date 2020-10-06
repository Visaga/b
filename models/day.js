let mongoose = require("mongoose"),
	Booking  = require("./booking")


   
let daySchema = new mongoose.Schema({
    String: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Booking"
		}
	]
});


module.exports = mongoose.model("Day", daySchema);