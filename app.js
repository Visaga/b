const express          = require("express"),
	  app              = express(),
	  bodyParser       = require("body-parser"),
	  mongoose         = require("mongoose"),
	  methodOverride   = require("method-override"),
	  Gallery          = require("./models/galleryschm.js"),
	  Master           = require("./models/master"),
	  Booking          = require("./models/bookingschm"),
	  passport         = require("passport"),
	  LocalStrategy    = require("passport-local"), 
	  url              = require("url");
	 



//===============================
//=========APP CONFIG ===========
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://vobiar:1824Sania@cluster0.vxx8x.mongodb.net/<BarberShop>?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(() => {
	console.log("Connected to DB")
}).catch(err => {
	console.log("Something whent wrong!")
    console.log(err.message)
});

app.set("view engine","ejs");

app.use(express.static(__dirname + "/public")); // TO CONNECT STYLESHEETS


app.use(function(req, res, next){
	if (req.method == "GET"){
	res.locals.url = req._parsedOriginalUrl.path; //////TO PASS THE CURRENT URL TO ALL EJS TEMPLATES INCL PARTIALS (RES.LOCALS + VAR NAME = TO )
	} else {
		res.locals.url = "/success"; //////TO PASS THE CURRENT URL TO ALL EJS TEMPLATES INCL PARTIALS (RES.LOCALS + VAR NAME = TO )
	}
	next();
});




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



// Booking.findById("5f6fc71b39f8bc326aca4d48")
// .then((res) => {
// 	console.log(res)
// })
// .catch(err => console.log(err))



// Booking.deleteOne( {_id: "5f6e52ad4c637902d652a355"})
// .then((res) => {
// 	console.log("removed ")
// })
// .catch(err => console.log(err))





//==== HOME PAGE =============================
app.get("/", (req, res, next) => {
	
	Master.findOne({name: "Livia Rem"})
	.then(result => res.render("home.ejs"))
	.catch(errr => res.send(errr))	
});
// ----------------------------------------------


// ==== GALLERY================================
app.get("/gallery", (req, res) => {
	Gallery.find({})
		.then(allImages => res.render("gallery", {allImages}))
		.catch(errr => res.send(errr))
});
// ----------------------------------------------
 





// === Booking ============================
app.get("/booking", (req, res) => {
	Master.find({}, (err, allMasters) => {
		if (err){
			console.log(err)
		} else {
			res.render("booking", {allMasters, message: ""});
		}
	});
});


//=======================AJAX======================




app.get("/booking/day", (req, res) => {
	Booking.find({})
	.then(allAppointments => {
		const days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
		let currentMasterAppsTimes = {sun: [], mon: [], tue: [], wed: [], thur: [], fri: [], sat: []};
		allAppointments.forEach( app => {
			if (app.master == req.headers.master){
				currentMasterAppsTimes[app.day].push(app.time);
			}
		});
		 Master.findOne({name: req.headers.master})
		.then(master => {
			 res.json([currentMasterAppsTimes, master.rota]);
		 })
	})
	.catch(err => console.log(err))			
});

// app.get("/booking/day", (req, res) => {	
// 	Master.findOne({name: req.headers.master}, (err, foundMaster) => {
// 		if (err){
// 			console.log(err);
// 		} else {
// 			 	const days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
			
// 			let timesTaken = {}
			
// 			days.forEach(day => {
// 				timesTaken[day] = [];
// 				foundMaster.appointments[day].forEach(appointment => {
// 					timesTaken[day].push(appointment.time)
// 				})
// 			});		
// 			res.send([timesTaken, foundMaster.rota]);
// 		}
// 	});
// });



app.post("/booking", (req, res) => {
	const {name, phone, comment, master, day, date,time} = req.body;
	const timeOpen = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
	
	console.log(master)
	Booking.find({day: day})
		.then(result => {
			let bookedTime = [];
			result.forEach(app =>{
				if (app.master == master){
					 bookedTime.push(app.time)
					
				}
			});
		     console.log(bookedTime)
	
			 if (timeOpen.includes(time) && !bookedTime.includes(time)){
						 if(name !== "" && phone !== "" && comment !== "" && master !== "" && day !== "" && time !== ""){
							      const d = new Date()
							     let timeStamp = (d.getMonth() +1) + (d.getDate()) + (d.getTime())
							 
								Booking.create({name,phone,comment,master,day,time, date, timeStamp})
									.then(appointment => {
									res.render( "succeed", { appointment});
								})
								.catch(err => console.log(err))
						    } else { res.redirect( "/booking") }
			 } else {
				 console.log("This time is alredy taken.. Please select another time")
				 res.redirect("/booking");
			 }
		})
	.catch(err => console.log(err));	
});
		
		



// app.post("/booking", (req, res) => {
// 	const {name, phone, comment, master, day, time} = req.body;
	
//     Booking.create({name,phone,comment,master,day,time}, (err, appointment) => {
// 		if (err){
// 			console.log(err);
// 		} else {
// 			appointment.save();
// 			Master.findOne({name: master}, (err, foundMaster) => {
// 				if (err){
// 					console.log(err);
// 				} else{
					
// 					//check if time is availble 
// 					function checkTimeAvailability(){
// 						let timeStatus =  false;
// 						console.log(req.body)
// 						foundMaster.appointments[day].forEach(dayAppoitment =>{ 
// 					        if (dayAppoitment.time == time){
// 								timeStatus = true;
// 						//time already booked
// 					     } 
// 					  })
// 						return timeStatus;
// 					}
					
// 					if (checkTimeAvailability() != true){
// 					    foundMaster.appointments[day].push(appointment);
					    	
// 						console.log("New appointment has been created");
// 						console.log(appointment);
// 						foundMaster.save();
// 						res.redirect("/");
// 					} else {
// 						console.log("time alreday taken")
// 						res.redirect("/booking");
// 					}
// 				}
// 			});
			
// 		}
// 	});
	
// });





// ----------------------------------------------



// ===============Admin dashbord==========
 
app.get("/bensdashbord", (req, res) => {
	Master.find({})
	.then( allMasters => res.render("dashbord", {allMasters}))
	.catch(err => console.log(err))
});


// ========Ajax======

//show selected master details
app.get("/bensdashbord/master", (req, res) => {	
	
	Booking.find({master: req.headers.master})
	.then(allAppoitments =>{
		let foundMasterApointments = {sun: [], mon: [], tue: [], wed: [], thur: [], fri: [], sat: []};
		allAppoitments.forEach(app => {
			foundMasterApointments[app.day].push(app)
		});
		let masterRota = [];
		Master.findOne({name: req.headers.master})
		.then(master => {
			return {
			rota: master.rota,
			appointments: foundMasterApointments 
		}
		})
		.then(foundMaster => res.json(foundMaster))
	})
	.catch(err => console.log(err))
});



// app.get("/bensdashbord/master", (req, res) => {	
	
// 	Master.findOne({name: req.headers.master}, (err, foundMaster) => {
// 		if (err){
// 			console.log(err);
// 		} else {
// 			res.send(foundMaster);
// 		}
// 	});
// });




// Delete appointment


app.delete("/bensdashbord/delete", (req, res) => {	
	console.log(req.headers.appointmentid)
	Booking.findByIdAndRemove(req.headers.appointmentid)
	.then(() => res.json({message: "Appointment has been Deleted"}))
	.catch(err => console.log(err))
});




// app.get("/bensdashbord/delete", (req, res) => {	
	
// 	Master.findOne({name: req.headers.master}, (err, foundMaster) => {
// 		const appId = req.headers.appointmentid;
		
// 		if (err){
// 			console.log(err);
// 		} else {
			
// 			Object.keys(foundMaster.appointments).forEach(function(key, ind) {
//            if(ind !== 0){
// 	           this[key].forEach(app =>{
				   
// 		         if (app._id == appId){
// 		        	console.log(app)
// 		}
// 	})
	
// } 
// }, foundMaster.appointments);
// 			// console.log(foundMaster.appointments)
// 			res.send({foundMaster, message: "Hello Bliaha chut ne udalil appp"});
// 		}
// 	});
// });




//----------------------------------------












app.listen(3333, () =>{
	console.log("Serever started")
})


// app.listen(process.env.PORT, '0.0.0.0')  //server for heroku