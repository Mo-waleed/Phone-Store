 // check if there's localSrorage color option
 let mainColors = localStorage.getItem("option-box");

 if (mainColors !== null) {
   //  console.log("localSrorage is not null");
   //  console.log(mainColors);
   document.documentElement.style.setProperty('--main-color', mainColors);
   // remove active classs from all colors list
   document.querySelectorAll(".colors-list li").forEach(element => {
     element.classList.remove("active");
     // add active class on element with data-color = localSrorage item
     if (element.dataset.color === mainColors) {
       element.classList.add("active");
     }
   });
 }

 // toggle spin class on icon
 document.querySelector(".toggle-setting .tool-setting").onclick = function() {

   // toggle class fa-spin for rotation on self
   this.classList.toggle("fa-spin");

   // toggle class open on main setting box
   document.querySelector(".setting-box").classList.toggle("open");
 };

 // switch colors
 const colorLi = document.querySelectorAll(".colors-list li");

 colorLi.forEach(li => {
   li.addEventListener("click", function(e) {

     localStorage.setItem("option-box", e.target.dataset.color);

     e.target.parentElement.querySelectorAll(".active").forEach(element => {
       element.classList.remove("active");
     });
     e.target.classList.add("active");
     // set color on root
     document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
   })
 })

 // switch background option
 const randomBackgroundElements = document.querySelectorAll(".random-background span");

 randomBackgroundElements.forEach(span => {
   span.addEventListener("click", function(e) {
     e.target.parentElement.querySelectorAll(".active").forEach(span => {
       span.classList.remove("active");
     })
     // add active class on self
     e.target.classList.add("active");

     if (e.target.dataset.background === 'yes') {
       backgroundOption = true;
       randomizeImgs();
       localStorage.setItem("background_option", true);
     } else {
       backgroundOption = false;
       clearInterval(backgroundInterval);
       localStorage.setItem("background_option", false);
     }
   })
 });

 // select landing page element
 let landingPage = document.querySelector(".landing-page");

 // get array of imgs
 let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "10.jpg", "11.jpg"];

 // random background option
 var backgroundOption = true;

 // variable to control the interval
 var backgroundInterval;

 // check the localStorage is not null or no
 let backgroundLocalItem = localStorage.getItem("background_option");

 // check if random-background localStorage is not empty
 if (backgroundLocalItem !== null) {

   if (backgroundLocalItem === 'true') {
     backgroundOption = true;
   } else {
     backgroundOption = false;
   }

   // remove active from all spans
   document.querySelectorAll(".random-background span").forEach(element => {
     element.classList.remove("active")
   });

   if (backgroundLocalItem === 'true') {
     document.querySelector(".random-background .yes").classList.add("active")
   } else {
     document.querySelector(".random-background .no").classList.add("active")
   }
 }

 // function to randomize imgs
 function randomizeImgs() {

   if (backgroundOption === true) {

     backgroundInterval = setInterval(() => {
       // get random number
       let randomNumber = Math.floor(Math.random() * imgArray.length);
       // change background image url
       landingPage.style.backgroundImage = 'url("imgs/' + imgArray[randomNumber] + '")';
     }, 10000);
   }
 }
 randomizeImgs();

 // select skills selector
 let ourSkills = document.querySelector(".skills");

 window.onscroll = function() {

   // skills offset top
   let skillsOffsetTop = ourSkills.offsetTop;

   // skills outer height
   let skillsOuterHeight = ourSkills.offsetHeight;

   // window height
   let windowHeight = window.innerHeight;

   // window scroll top
   let windowScrollTop = window.pageYOffset;

   if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

     let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");

     allSkills.forEach(skill => {

       skill.style.width = skill.dataset.progress;

     })
   }
 };

 // create pop with image
 let ourGallery = document.querySelectorAll(".gallery img");

 ourGallery.forEach(img => {

   img.addEventListener("click", (e) => {

     //create overlay element
     let overLay = document.createElement("div");

     // add class to overLay
     overLay.className = "popup-overlay";

     //append overLay to the body
     document.body.appendChild(overLay);

     // create popup-box
     let popupBox = document.createElement("div");

     // add class to the pop box
     popupBox.className = "popup-box";

     if (img.alt !== null) {

       // create the heading
       let theHeading = document.createElement("h3");

       // create the text
       let theText = document.createTextNode(img.alt);

       // append the text to the heading
       theHeading.appendChild(theText);

       // append the headind to the popupBox
       popupBox.appendChild(theHeading);
     }

     if(img.title !== null){
     // create the heading
     let theHeading = document.createElement("h5");

     // create the text
     let theText = document.createTextNode(img.title);

     // append the text to the heading
     theHeading.appendChild(theText);

     // append the headind to the popupBox
     popupBox.appendChild(theHeading);
     }

     // craete the image
     let popupImage = document.createElement("img");

     // set img source
     popupImage.src = img.src;

     // add image to pop box
     popupBox.appendChild(popupImage);

     // append the popupBox tp the body
     document.body.appendChild(popupBox);

     // create the close span
     let closeButton = document.createElement("span");

     // craete the x
     let closeButtonText = document.createTextNode("X");

     // append the x to the span
     closeButton.appendChild(closeButtonText);

     // add clase to the closeButton
     closeButton.className = "close-button";

     // add closeButton to the popupBox
     popupBox.appendChild(closeButton);

   })
 });

 // close pop
 document.addEventListener("click", function(e) {

   if (e.target.className == 'close-button') {

     // remove the current pop
     e.target.parentNode.remove();

     // remove overlay
     document.querySelector(".popup-overlay").remove();
   }
 })

 // select all bullets

 const allBullets = document.querySelectorAll(".nav-bullets .bullet");

 allBullets.forEach(bullet => {

   bullet.addEventListener("click", (e) => {

     document.querySelector(e.target.dataset.section).scrollIntoView({
       behavior: 'smooth'
     })
   })
 })

 // option bullets

 let bulletsSpan = document.querySelectorAll(".bullets-option span");

 let bulletsContainer = document.querySelector(".nav-bullets");

 let bulletLocalItem = localStorage.getItem("bullets-option");


 if (bulletLocalItem !== null) {

   bulletsSpan.forEach(span => {

     span.classList.remove("active");

   });

   if (bulletLocalItem === 'block') {

     bulletsContainer.style.display = 'block';

     document.querySelector(".bullets-option .yes").classList.add("active");

   } else {

     bulletsContainer.style.display = "none";

     document.querySelector(".bullets-option .no").classList.add("active");

   }

 }

 bulletsSpan.forEach(span => {

   span.addEventListener("click", function() {

     if (span.dataset.display === 'show') {

       bulletsContainer.style.display = 'block';

       localStorage.setItem("bullets-option", "block");

     } else if (span.dataset.display === "hide") {

       bulletsContainer.style.display = 'none';

       localStorage.setItem("bullets-option", "none");

     }

     bulletsSpan.forEach(span => {

       span.addEventListener("click", function(e) {

         e.target.parentElement.querySelectorAll(".active").forEach(ele => {

           ele.classList.remove("active")

         });

         e.target.classList.add("active");

       })
     })

   })

 })

 // reset option
 document.querySelector(".reset-option ").addEventListener("click", function() {

   localStorage.removeItem("option-box");
   localStorage.removeItem("background_option");
   localStorage.removeItem("bullets-option");

   window.location.reload();

 });

 // toggle menu

 let toggleBtn = document.querySelector(".toggle-menu");
 let theLinks = document.querySelector(".links");

 toggleBtn.addEventListener("click", function(e) {

   e.stopPropagation();

   this.classList.toggle("menu-active");

   theLinks.classList.toggle("open");
 });

 document.addEventListener("click", function(e) {
   if (e.target !== toggleBtn && e.target !== theLinks) {
     theLinks.classList.remove("open");
     toggleBtn.classList.remove("menu-active");
   }
 })

 // stop propagation
 theLinks.addEventListener("click", function(e) {
   e.stopPropagation();
 });
