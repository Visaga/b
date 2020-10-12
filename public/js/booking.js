import header from "/js/header.js"
header()




//====================SELECTOR ===============================


const select = document.querySelector(".select"),
      selectHeader = document.querySelector(".select-header"),
      selectItems = document.querySelectorAll(".select-item"),
	  selectBody = document.querySelector(".select-body"),
	  days = document.querySelectorAll(".day"),
      master = document.querySelector("#master"),
	  timeLine = document.querySelectorAll(".time-line"),
      time = document.querySelector("#time"),
	  date = document.querySelector(".day-date")
	  dateInput = document.querySelector("#date");


select.addEventListener("click", () => {
  select.classList.toggle("is-active");
});

 
  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      selectHeader.innerHTML = item.innerHTML;
      master.value = item.querySelector(".select-current").innerHTML;
	 days.forEach(day => {
		day.classList.remove("selectedDay");
		});
	timeLine.forEach(timeBox => {
		timeBox.classList.remove("selected-time");
		timeBox.classList.remove("time-availible")
	})
    });
  });

//-------------------------------------------------------------




//================SELECT DAY ===============================

//UPDATE DAYS
const d = new Date();
const dayInput = document.querySelector("#day");
const weekDays = [ "Sun","Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];


  let count = 0;  




//////////////// Show availible days / times on response

selectBody.addEventListener("click", checkMasterRota);
 function checkMasterRota(){
	
	 
	 
  let request = fetch("/booking/day/", {
	  method: "GET", 
	  headers: {
        "Content-type": "text/plain",
		 "master": master.value
    }
  })
  .then((res) => { 
	  console.log( master.value)
    return res.json();
})
  //==========CHECK FOR WORKING DAYS
 .then((res) => {
	const response = res[1];
	days.forEach((day, ind) => {
		day.classList.remove("available-day");
	 if (response[day.id] == true){
		 day.classList.add("available-day");
	 } 	
});
	 return res;
 })
  
  //==========FIND AVAILIBLE TIME ON DAY SELECT
  .then((res) => { 
	  
		days.forEach(day => {
		day.addEventListener("click", () => {
		if (day.classList.contains("available-day")){
			days.forEach(day => {
		        day.classList.remove("selectedDay");
		     });
			day.classList.add("selectedDay");
			dayInput.value = day.innerText.replace(/\s/g, '').toLowerCase();
			dateInput.value = date.innerText;
			
		//========FIND AVAILIBLE TIME
		
			    timeLine.forEach(timeBox => {
				   timeBox.classList.remove("selected-time");
				   
				   	if (res[0][dayInput.value] && res[0][dayInput.value].includes(timeBox.innerText)){
					timeBox.classList.remove("time-availible");					
				     }
	
				 else {
					timeBox.classList.add("time-availible");
				}    
			   });
			}	 
		 });
		});
  })
  .then((res) => {
	  timeLine.forEach(timeBox => {
		  timeBox.addEventListener("click", () =>{
			  if (timeBox.classList.contains("time-availible")){
				  timeLine.forEach(time => { 
					  time.classList.remove("selected-time")
				  });
				  timeBox.classList.add("selected-time")
				   time.value = timeBox.innerText;			  
			  } 
		  });
	  });
	  
	  
	
      

  });
	 
}


//select day







//-------------------------------------------------------------
//=====================Select Time=============================

// -------------------------------------------------------------



// ===================Form=====================================



// ----------------------------------------------------------------