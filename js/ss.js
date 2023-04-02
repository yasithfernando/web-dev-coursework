
window.addEventListener('load', function() {
	const splashScreen = document.querySelector('.splash-screen');
	const isSplashShown = localStorage.getItem('isSplashShown');
  
	if (!isSplashShown) {
	  splashScreen.classList.add('active');
	  localStorage.setItem('isSplashShown', true);
	  setTimeout(function() {
		splashScreen.classList.remove('active');
	  }, 4000);
	} else {
	  splashScreen.style.display = 'none';
	}
  });



