const logOutButton = document.getElementById('log-out');

if(logOutButton) {
	logOutButton.addEventListener('click', function(e) {
		removeCodeFromLocalStorage();
		refreshPage();
	});
}

function removeCodeFromLocalStorage() {
	localStorage.removeItem('code');
}

function refreshPage() {
	window.location.href = window.location.origin;
}
