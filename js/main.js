//Import navigation bar from source

let xhr = new XMLHttpRequest();

xhr.open('GET', '../global/navbar.html', true);

xhr.send();

xhr.onload = function(){
    if (this.status == 200) {
        document.getElementById('navbar-placeholder').innerHTML = this.responseText;
    }
}






//Highlight current page on navbar
const navLinkHighlight = ()=>{
  document.addEventListener("DOMContentLoaded", function() {
    // Get the current URL
    var currentURL = window.location.href;
  
    // Loop through the navbar links and compare their URLs with the current URL
    var navbarLinks = document.getElementsByTagName("a");
    //console.log(navbarLinks.length);
    for (var i = 0; i < navbarLinks.length; i++) {
      var linkURL = navbarLinks[i].href;
      
      if (currentURL === linkURL) {
        // Add the "current" class to the corresponding a tag
        navbarLinks[i].classList.add("current");
      }
    }
  });
}

  //document.getElementsByTagName('body').onLoad(navLinkHighlight());
navLinkHighlight()
  //window.addEventListener('load', navLinkHighlight());