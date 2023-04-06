
let xhrFooter = new XMLHttpRequest();

xhrFooter.open('GET', '../global/footer.html', true);

xhrFooter.send();



xhrFooter.onload = function(){
  if(this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
    let footer = document.getElementById('footer-placeholder')
    if(footer !== null){
      footer.innerHTML = this.responseText;
    }
  }
}

function goToEditor(){

  let pages =new Map()

  pages.set('yasith', ["index.html","feedback.html", "page-editor-yasith.html", "extra-content-yasith.html"])
  pages.set('nethmi', ["buyproducts.html","page-editor-nethmi.html", "extra-content-nethmi.html", "checkout.html"])
  pages.set('dilana', ["gallery.html", "sitemap.html", "page-editor-dilana.html", "extra-content-dilana.html"])
  pages.set('chamod', ["quiz.html", "aboutus.html", "end.html","game.html", "highscores.html", "page-editor-chamod.html", "extra-content-chamod.html" ])

  

  // Get the current URL
  let currentURL = window.location.href;
  let urlContent = currentURL.split("/")
  console.log("Current URL: " + urlContent[urlContent.length -1]);

  let newUrl = urlContent[urlContent.length -1]


  pages.forEach((value,key) => {
    value.forEach(page => {
      if(page == newUrl){
        let goToLink;
        if(newUrl == "index.html"){
          goToLink = "routes/page-editor-" + key + ".html";
          window.location.href = goToLink;
        }else{
          goToLink = "page-editor-" + key + ".html";
          window.location.href = goToLink;
        }
        
      }
      
    })
  })



}
