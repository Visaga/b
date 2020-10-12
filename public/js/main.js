const nav = document.querySelector("nav"),
      hamburger = document.querySelector(".hamburger"),
      navLinks = document.querySelector(".nav-links"),
      links = document.querySelectorAll(".nav-links li"),
      hambFirstLine = document.querySelector("#firstLine"),
      hambSecondLine = document.querySelector("#secondLine"),
      hambThirdLine = document.querySelector("#thirdLine"),
      btn = document.querySelector(".btn");
      
import header  from "/js/header.js"
header()

hamburger.addEventListener("click", () =>{
  navLinks.classList.toggle("open");
  hambFirstLine.classList.toggle("nav-close-icon-firstLine");
  hambSecondLine.classList.toggle("nav-close-icon-secondLine");
  hambThirdLine.classList.toggle("nav-close-icon-thirdLine");
  document.body.classList.toggle("remove-scroll");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});

//============Close menu after clik on the link / show navbar =========
links.forEach( link => {
  link.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hambFirstLine.classList.toggle("nav-close-icon-firstLine");
      hambSecondLine.classList.toggle("nav-close-icon-secondLine");
      hambThirdLine.classList.toggle("nav-close-icon-thirdLine");
      document.body.classList.toggle("remove-scroll");
        setTimeout(() =>{
          nav.classList.remove("nav-mobile");
          sections.classList.remove("sections-modbile-onScrollDown");
  },800);
       links.forEach(link => {
         link.classList.toggle("fade");
       });
  });
});


//=========================NAV SCROLL ANIMATION==============
const sections = document.querySelector(".sections");

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  
  if (prevScrollpos > currentScrollPos && prevScrollpos > 0 && prevScrollpos < (document.body.clientHeight - window.innerHeight)) {
    nav.classList.remove("nav-mobile");
    
    sections.classList.remove("sections-modbile-onScrollDown");
  } else {
    if (prevScrollpos > 0){
          nav.classList.add("nav-mobile");
    sections.classList.add("sections-modbile-onScrollDown");
    }
  }
  prevScrollpos = currentScrollPos;
}


// ==============================Click scroll===========

const anchors = document.querySelectorAll('a.scroll-to')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href')
    
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}


// ======================= Hoover on btn=================
const hoverBox = document.querySelector(".hoverEffectBox");

btn.addEventListener("mouseover", btnHover);
function btnHover(){
  hoverBox.classList.add("hoverActive");
  btn.style.color = "#000";
  btn.style.border = "1px solid #000"
}

btn.addEventListener("mouseout", removeBtnHover);
function removeBtnHover(){
  hoverBox.classList.remove("hoverActive");
  btn.style.color = "#c69d5b";
  btn.style.border = "1px solid #fff"
}

//==========  Section ===========

const headerBlock = document.querySelector(".main-title-box");


window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
      headerBlock.classList.add("main-title-box-inview");
  },300);

  setTimeout(() => {
    btn.style.transition = "all 0.5s"
    btn.style.opacity = "1";
  }, 1000)
  
});



//==== HOVER EFFECT ON IMAGES========

const optionImg = document.querySelectorAll(".option_img"),
      covers = document.querySelectorAll(".cover"),
      galleryImgs = document.querySelectorAll(".gallery_img"),
      galleryImgBlock = document.querySelectorAll(".gallery_img_block");


//      ZOOM-IN
covers.forEach((cover, ind) => {
  cover.addEventListener("mouseover", () => {
    optionImg[ind].classList.add("photoHover");
    cover.style.fontWeight = "700";
  });
});

//    ZOOM-OUT
covers.forEach((cover, ind) => {
  cover.addEventListener("mouseout", () => {
    optionImg[ind].classList.remove("photoHover");
    cover.style.fontWeight = "300";
  });
});


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


