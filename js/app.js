/**
 * The main js file to perform AJAX calls
 */

var URL = window.location.href; // Returns current URL
var apis = {
	addCar : "api/add-car",
	removeCar : "api/remove-car",
	getAllCars : "api/get-all-cars"
};

var addCarApiParams = {
	car_number : "",
	is_there_ticket : ""
};

$(document).ready(function() {

	//TODO: get all cars via API
	drawTable(data);

	$("#confirm-btn").click(confirmCallback);
	$(".btn-danger").click(removeCarNum);
});

/**
 * The function is called when a click event on 'Confirm' button is performed
 */
function confirmCallback() {
	console.log("Confirming...");
	var fullUrl = URL + apis.addCar;
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

/**
 * The function is called when a click event on 'Remove' button of any table row
 * is performed
 */
function removeCarNum() {
	var row = $(this).parent().parent();
	var carNumToRemove = row.find(".car-number");
	var ticketOfCar = row.find(".is-there-ticket");
	if (carNumToRemove.html() !== "-") {
		//TODO: remove car number via API
		carNumToRemove.text("-");
		ticketOfCar.text("-");
	}
}

function getIsThereTicket() {
	var selected = $('#ticket-radio label.active input').val();
	console.log("selected: " + selected);
	return selected;
};

function getCarNumber() {
	var largeNumber = $('#large-number').val();
	var smallNumber = $('#small-number').val();
	console.log("large number: " + largeNumber);
	console.log("small number: " + smallNumber);
	return largeNumber + smallNumber;
}

function setGetParameter(url, paramName, paramValue) {
	if (url.indexOf("?") < 0) {
		url += "?" + paramName + "=" + paramValue;
	} else {
		url += "&" + paramName + "=" + paramValue;
	}
	return url;
}

var data = [ {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
}, {
	"ticket" : "-",
	"number" : "-"
} ];

function drawTable(data) {
	for (var i = 0; i < data.length; i++) {
		drawRow(data[i], i);
	}
}

function drawRow(rowData, i) {
	var row = $("<tr />")
	$("#table").append(row);
	var tdOpen = "<td class=\"td-inner\">";
	var tdOpenForCarNum = "<td class=\"td-inner car-number\">";
	var tdOpenForTicket = "<td class=\"td-inner is-there-ticket\">";
	var tdClose = "</td>";
	var removeBtn = "<a class=\"btn btn-danger center-block\" href=\"#\"><i class=\"glyphicon glyphicon-remove\"></i></a>";
	var disabledRemoveBtn = "<a class=\"btn btn-danger center-block disabled\" href=\"#\"><i class=\"glyphicon glyphicon-remove\"></i></a>";
	row.append($(tdOpen + (i + 1) + tdClose));
	row.append($(tdOpenForTicket + rowData.ticket + tdClose));
	row.append($(tdOpenForCarNum + rowData.number + tdClose));
	if(rowData.number === "-") {
		row.append($(tdOpen + disabledRemoveBtn + tdClose));
	} else {
		row.append($(tdOpen + removeBtn + tdClose));
	}
}
