
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