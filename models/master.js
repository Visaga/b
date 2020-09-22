let mongoose = require("mongoose");

let MasterSchema = new mongoose.Schema({
    image: String,
	name: String,
	position: String,
	descriptions: String,
	rota: {},
	appointments: {

	}
});


module.exports = mongoose.model("Master", MasterSchema);