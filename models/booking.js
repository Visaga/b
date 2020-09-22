let mongoose = require("mongoose");

let BookingSchema = new mongoose.Schema({
    
		name: String,
		phone: String,
		comment: String,
		master: String,
		day: String,
	    date: String,
		time: String
});


module.exports = mongoose.model("Booking", BookingSchema);