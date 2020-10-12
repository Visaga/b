function header(){

const nav = document.querySelector("nav"),
      hamburger = document.querySelector(".hamburger"),
      navLinks = document.querySelector(".nav-links"),
      links = document.querySelectorAll(".nav-links li"),
      hambFirstLine = document.querySelector("#firstLine"),
      hambSecondLine = document.querySelector("#secondLine"),
      hambThirdLine = document.querySelector("#thirdLine");
      

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

links.forEach(link =>{
	if (window.location.href.includes(link.innerText.toLowerCase())){
		console.log(link.innerText.toLowerCase())
	}
})
}

export default header;
