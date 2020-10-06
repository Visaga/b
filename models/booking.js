let mongoose = require("mongoose");

let bookingSchema = new mongoose.Schema({ 
		name: String,
		phone: String,
		comment: String,
		master: String,
		day: String,
	    date: String,
		time: String,
	    timeStamp: Date
});


module.exports = mongoose.model("Booking", bookingSchema);