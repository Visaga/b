const express          = require("express"),
	  app              = express(),
	  bodyParser       = require("body-parser"),
	  mongoose         = require("mongoose"),
	  methodOverride   = require("method-override"),
	  Gallery          = require("./models/gallery"),
	  Master           = require("./models/master"),
	  Booking          = require("./models/booking"),
	  passport         = require("passport"),
	  LocalStrategy    = require("passport-local"), 
	  url              = require("url");



//===============================
//=========APP CONFIG ===========
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://vobiar:1824Sania@cluster0.vxx8x.mongodb.net/<BarberShop>?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Connected to DB")
}).catch(err => {
	console.log("Something whent wrong!")
    console.log(err.message)
});

app.set("view engine","ejs");

app.use(express.static(__dirname + "/public")); // TO CONNECT STYLESHEETS



// Master.create({
//     image: "https://avatars.mds.yandex.net/get-pdb/1605014/1cb472b4-40cd-41e6-a7ab-b74e0ba13c73/s1200",
// 	name: "Livia Rem",
// 	position: "Master",
// 	descriptions: "Hi, Im Barber for about 20 yers and how about you my friend?",
// 	rota: {
// 		0: true,
// 		1: true,
// 		2: false,
// 		3: false,
// 		4: true,
// 		5: true,
// 		6: true
// 	},
// 		appointments: {
// 		mon: [],
// 		tue: [],
// 		wed: [],
// 		thur: [],
// 		fri: [],
// 		sat: [],
// 		sun: []
// 	}
// }, (err, newMaster) => {
// 	newMaster.save();
// });



//=================== DAYLY ROTA UPDATE========= 

// Master.find({}, (err, allMasters) => {
// 	if (err){
// 		console.log(err);
// 	} else {
// 		let d = new Date();
// 		let tDay = d.getDay()
		
// 		allMasters.forEach(master => {
			
		
// 		  master.rota[d.getDay()] = false;	 
	
// 		Master.updateOne({name: master.name}, master, (err, updatedMaster) => {
// 			if (err){
// 				console.log(err);
// 			} else {
// 				console.log("A day " + tDay + " has been removed from the " + master.name + " rota!");
// 				console.log("New day " + tDay + " has been addet to the " + master.name + " rota!");
// 			}
// 		});
// 	  });
// 	}	
// });




//==== HOME PAGE =============================
app.get("/", (req, res) => {
	res.render("home.ejs");
});
// ----------------------------------------------


// ==== GALLERY================================
app.get("/gallery", (req, res) => {
	Gallery.find({}, (err, allImages) => {
		if (err){
			console.log(err);
		} else{
			res.render("gallery", {allImages});
		}
	});
});
// ----------------------------------------------
 





// === Booking ============================
app.get("/booking", (req, res) => {
	Master.find({}, (err, allMasters) => {
		if (err){
			console.log(err)
		} else {
			res.render("booking", {allMasters});
		}
	});
});


//=======================AJAX======================

app.get("/booking/day", (req, res) => {	
	Master.findOne({name: req.headers.master}, (err, foundMaster) => {
		if (err){
			console.log(err);
		} else {
			 	const days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
			
			let timesTaken = {}
			
			days.forEach(day => {
				timesTaken[day] = [];
				foundMaster.appointments[day].forEach(appointmet => {
					timesTaken[day].push(appointmet.time)
				})
			});		
			res.send([timesTaken, foundMaster.rota]);
		}
	});
});




app.post("/booking", (req, res) => {
	const {name, phone, comment, master, day, time} = req.body;
	
    Booking.create({name,phone,comment,master,day,time}, (err, appointment) => {
		if (err){
			console.log(err);
		} else {
			appointment.save();
			Master.findOne({name: master}, (err, foundMaster) => {
				if (err){
					console.log(err);
				} else{
					
					//check if time is availble 
					function checkTimeAvailability(){
						let timeStatus =  false;
						console.log(req.body)
						foundMaster.appointments[day].forEach(dayAppoitment =>{ 
					        if (dayAppoitment.time == time){
								timeStatus = true;
						//time already booked
					     } 
					  })
						return timeStatus;
					}
					
					if (checkTimeAvailability() != true){
					    foundMaster.appointments[day].push(appointment);
					    	
						console.log("New appointment has been created");
						console.log(appointment);
						foundMaster.save();
						res.redirect("/");
					} else {
						console.log("time alreday taken")
						res.redirect("/booking");
					}
				}
			});
			
		}
	});
	
});





// ----------------------------------------------



// ===============Admin dashbord==========
 
app.get("/bensdashbord", (req, res) => {
	Master.find({}, (err, allMasters) => {
		if (err){
			console.log(err);
		} else {
			res.render("dashbord", {allMasters});
		}
	});
});


// ========Ajax======

//show selected master details
app.get("/bensdashbord/master", (req, res) => {	
	
	Master.findOne({name: req.headers.master}, (err, foundMaster) => {
		if (err){
			console.log(err);
		} else {
			res.send(foundMaster);
		}
	});
});




// Delete appointment

app.get("/bensdashbord/delete", (req, res) => {	
	
	Master.findOne({name: req.headers.master}, (err, foundMaster) => {
		const appId = req.headers.appointmentid;
		
		if (err){
			console.log(err);
		} else {
			
			Object.keys(foundMaster.appointments).forEach(function(key, ind) {
           if(ind !== 0){
	           this[key].forEach(app =>{
				   
		         if (app._id == appId){
		        	console.log(app)
		}
	})
	
} 
}, foundMaster.appointments);
			// console.log(foundMaster.appointments)
			res.send({foundMaster, message: "Hello Bliaha chut ne udalil appp"});
		}
	});
});




//----------------------------------------

















app.listen(3333, () =>{
	console.log("Serever started")
})