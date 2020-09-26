let mongoose = require("mongoose");

let MasterSchema = new mongoose.Schema({
    image: String,
	name: String,
	position: String,
	descriptions: String,
	rota: {},
	appointments: {
		mon: [],
		tue: [], 
		wed: [],
		thur: [],
		fri: [],
		sat: [], 
		sun: []
	}
});


module.exports = mongoose.model("Master", MasterSchema);