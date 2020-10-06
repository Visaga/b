const dashTitles = document.querySelectorAll(".dashbord-title"),
      masterNames = document.querySelectorAll(".day-master"),
	  weekDays = document.querySelectorAll(".rota-week-day"),
	  appResults = document.querySelector(".dashbord-appointments-result"),
	  masterWorkingDays = document.querySelector(".master-workingDays")

	  
	  


dashTitles.forEach(title => {
  title.addEventListener("click", selectTitle);
});
     
function selectTitle(){
  dashTitles.forEach(title => {
    title.classList.remove("active-header");
    this.classList.add("active-header");
  });
}


masterNames.forEach(name =>{
  name.addEventListener("click", selectMasterAndUpdateInfo);
});


//select and update
function selectMasterAndUpdateInfo(){
    masterNames.forEach(name => {
    name.classList.remove("active-name");
    this.classList.add("active-name");
	weekDays.forEach(day => day.classList.remove("working-day-in"));	
    let loader = `<div class="boxLoading">Loading...</div>`;
		
	 appResults.innerHTML = loader;

	
		//SEnd req/////////////////////////////////////////
	const selectedMaster = this.innerText;
		
	let request = fetch("/bensdashbord/master/", {
      method: "GET", 
	  headers: {
        "Content-type": "text/plain",
		 "master": selectedMaster
    }
  })
  .then((res) => { 
    return res.json();
})
 .then((res) => {
	 
	 weekDays.forEach(day => day.classList.remove("working-day-in"));
	
	 weekDays.forEach(day => {
		 if (res.rota[day.id] == true){
			 day.classList.add("working-day-in")
		 }
	 });
	 
	 return res;
 })
 .then(res => {
	 
	 appResults.innerHTML = "";
	 
	for (let day in res.appointments){
		
		const workingDayWrapper = document.createElement("div");
		workingDayWrapper.classList.add("working-day-wrapper");
		
		const workingDay = document.createElement("div");
		workingDay.classList.add("working-day");
		workingDay.textContent = day; 
		
		if (res.appointments[day].length > 0){
			workingDayWrapper.append(workingDay);
		}
		
		
		res.appointments[day].forEach( app => {
			
			const appLine = document.createElement("div");
		
			appLine.classList.add("appointment-line");
			appLine.innerHTML = `
          <div class="appointment-line-inner">
                    <div class="app-time">` + app.time + `</div>
                    <div class="client-name">` + app.name + `</div>
                    <div class="client-phone">` + app.phone + `</div>
                    <button id="`+ app._id + `" class="cancel-btn"><a href="#" class="cancel-link">CANCEL</a></button>   
               </div> 
               <div class="client-message">` + app.comment + `</div>
               <div class="timeStamp">` + app.timeStamp  + `</div>
`
			
			workingDayWrapper.append(appLine);
		}) 
		
		appResults.append(workingDayWrapper);
	}	 	 

 })
 .then(() => {
	   const cancelBtns = document.querySelectorAll(".cancel-btn");	  
	
		cancelBtns.forEach((btn, ind) =>{
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				
				let request = fetch("/bensdashbord/delete", {
                  method: "DELETE", 
	                 headers: {
                              "Content-type": "text/plain",
		                    "appointmentId":  cancelBtns[ind].id,
						    "master": selectedMaster
                    }
 				 })
				  .then((res) => { 
				    return res.json();
				})
				.then(res => {
					console.log(res.message)
					e.target.closest('.appointment-line').remove();
				})
				.catch((err) => console.log("Somethinng whent wrong!" + err))
			});	
		})
 })
  });
	
}







