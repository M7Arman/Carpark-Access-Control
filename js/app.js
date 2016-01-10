/**
 * The main js file to perform AJAX calls
 */

var URL = window.location.href; // Returns current URL
var ADD_CAR_API_ENDPOINT = "api/add-car";
var addCarApiParams = {
	car_number : "",
	is_there_ticket : ""
};

$(document).ready(function() {

	$("#confirm-btn").click(confirmCallback);

	/**
	 * The function is called when a click event on 'Confirm' button is
	 * performed
	 */
	function confirmCallback() {
		console.log("Confirming...");
		var fullUrl = URL + ADD_CAR_API_ENDPOINT;
		console.log("url: " + fullUrl);
		addCarApiParams.car_number = getCarNumber();
		addCarApiParams.is_there_ticket = getIsThereTicket();
		$.get(fullUrl, addCarApiParams, function(data, textStatus, xhr) {
			console.log("response: " + data);
			console.log("xhr: " + xhr);
			console.log("xhr status: " + xhr.status);
			// TODO: complete implementation
		});
	}

	function getIsThereTicket() {
		var selected = $('#ticket-radio label.active input').val();
		console.log("selected: " + selected);
		return selected;
	}
	;

	function getCarNumber() {
		var largeNumber = $('#large-number').val();
		var smallNumber = $('#small-number').val();
		console.log("large number: " + largeNumber);
		console.log("small number: " + smallNumber);
		return largeNumber + smallNumber;
	}

	// helpers
	function setGetParameter(url, paramName, paramValue) {
		if (url.indexOf("?") < 0) {
			url += "?" + paramName + "=" + paramValue;
		} else {
			url += "&" + paramName + "=" + paramValue;
		}
		return url;
	}
});