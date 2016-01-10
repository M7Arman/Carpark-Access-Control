/**
 * The main js file to perform AJAX calls
 */
$(document).ready(function() {

	var url = window.location.href; // Returns full URL

	$("#confirm-btn").click(confirmCallback);

	/**
	 * The function is called when a click event on 'Confirm' button is
	 * performed
	 */
	function confirmCallback() {
		console.log("Confirming...");
		console.log("url: " + url);
		$.get(url + "api/TODO", function(data) {
			// TODO: implement function
		});
	}
});