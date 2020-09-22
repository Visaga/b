const  galleryImgs = document.querySelectorAll(".gallery_img"),
      galleryImgBlock = document.querySelectorAll(".gallery_img_block");


//===========galery imges hover========
//ZOOM-IN
galleryImgs.forEach(img => {
  img.addEventListener("mouseover", () => {
    img.classList.add("galleryPhotoHover");
  });
});

//    ZOOM-OUT
galleryImgs.forEach(img => {
  img.addEventListener("mouseout", () => {
    img.classList.remove("galleryPhotoHover");
  });
});

//===================  Clicked on gallery imge =============
const popUp = document.querySelector(".popUp");

//====popUp
galleryImgs.forEach((img, ind) => {
  img.addEventListener("click", () => {
    
    const popUpBlock = document.createElement("div");
    const leftArrow  = document.createElement("div");
            leftArrow.innerHTML = `
               <div class="left-arrow-line-one"> </div>
               <div class="left-arrow-line-two"> </div>
               `  
    if (ind == 0){
    leftArrow.classList.add("hide-opacity");
}
    leftArrow.classList.add("left-arrow");
    
    popUpBlock.append(leftArrow);
    popUpBlock.classList.add("popUp-close-icon-block");
    const popUpImg = document.createElement("img");
    popUpImg.classList.add("popUp-img");
    popUpImg.src = img.src;
    popUp.classList.remove("hide");
    popUpBlock.append(popUpImg);
    const icon = document.createElement("div");
     icon.innerHTML = `
                  <div class="close-icon-wrapper">
                      <div class="close-icon">
                         <div class="close-line-one close-lines"></div>
                         <div class="close-line-two close-lines"></div>
                      </div>  
                 </div>
                  <div class="right-arrow"> 
               <div class="right-arrow-line-one"> </div>
               <div class="right-arrow-line-two"> </div>
                </div>
                 
` 
    popUpBlock.append(icon);
    popUp.append(popUpBlock);
    document.body.style.overflow = "hidden";
    if (ind == (galleryImgs.length -1)){
      document.querySelector(".right-arrow").classList.add("hide-opacity");
    }
    arrows(galleryImgs, ind);
    popUpClose();
  });
});

//====popUp Close
function popUpClose(){
  const icon = document.querySelector(".close-icon")
  icon.addEventListener("click", () => {
  popUp.classList.add("hide");
  document.body.style.overflow = "scroll";
  popUp.innerHTML = "";
  
});
}


//=============== galery slider ===========
function arrows(imgArray, ind){
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const popUpImg = document.querySelector(".popUp-img");
  
  if(leftArrow){
    leftArrow.addEventListener("click", () => {
      popUpImg.src = imgArray[(ind - 1)].src;
      ind -= 1;
      if (ind == 0 ) {
        leftArrow.classList.add("hide-opacity");
      }
      if (ind <(imgArray.length -1)){
        rightArrow.classList.remove("hide-opacity");
      }
    });
  }
  
  
    if(rightArrow){
    rightArrow.addEventListener("click", () => {
      popUpImg.src = imgArray[(ind + 1)].src;
      ind += 1;
      if (ind == (imgArray.length - 1)) {
        rightArrow.classList.add("hide-opacity");
      }
      if (ind > 0){
        leftArrow.classList.remove("hide-opacity");
      }
    });
  }  
  
}


//====================SELECTOR ===============================
const select = document.querySelector(".select"),
      selectHeader = document.querySelector(".select-header"),
      selectItems = document.querySelectorAll(".select-item"),
      master = document.querySelector("#master");


select.addEventListener("click", () => {
  select.classList.toggle("is-active");
});

 
  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      selectHeader.innerHTML = item.innerHTML;
      master.value = item.textContent.replace(/\s/g, '');;
    });
  });

//-------------------------------------------------------------
















//================SELECT DAY ===============================

//UPDATE DAYS
const d = new Date();
const days = document.querySelectorAll(".day"),
      availableDays = document.querySelectorAll(".available-day"),
      day = document.querySelector("#day");

const weekDays = [ "Sun","Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];


  let count = 0;  
days.forEach((day, ind) => {
      if (d.getDay() + count <= 6) {
          days[ind].textContent =  weekDays[d.getDay() + count];
  count +=1
      } else{
        count = 0;
         days[ind].textContent =  weekDays[d.getDay() - d.getDay()];
        count -= (d.getDay() - 1);
      }
});


//select day
availableDays.forEach(day => {
  day.addEventListener("click", selectDay);
});

function selectDay(){
  availableDays.forEach(day => {
    day.classList.remove("selectedDay");
  });
  this.classList.add("selectedDay");
  day.value = this.textContent.replace(/\s/g, '');;
}

//-------------------------------------------------------------
//=====================Select Time=============================
const availableTime = document.querySelectorAll(".time-availible"),
      time = document.querySelector("#time");


availableTime.forEach(time => {
  time.addEventListener("click", selectTime);
});

function selectTime(){
  availableTime.forEach(time => {
    time.classList.remove("selected-time");
  });
  this.classList.add("selected-time");
  time.value = this.textContent.replace(/\s/g, '');;
}
// -------------------------------------------------------------



// ===================Form=====================================



// ----------------------------------------------------------------

alert("ghjgk")