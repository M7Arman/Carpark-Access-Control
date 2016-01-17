/**
 * The main js file to perform AJAX calls
 */

var URL = window.location.href; // Returns current URL
var carParkLimit = 10;
var endpoints = {
    addCar: "car",
    deleteCar: "car",
    getAllCars: "cars"
};

var addCarApiInitialBody = {
    number: "",
    region: "",
    ticket: ""
};

var emptyRow = {
    "ticket": "-",
    "number": "-"
};

$(document).ready(function () {
    getAllCars();
    $("#confirm-btn").click(addCar);
    $("#car-number").change(validateInputs);
    $("#region").change(validateInputs);
});

function validateInputs() {
    var carNumberVal = $("#car-number").val();
    var regionVal = $("#region").val();

    if (carNumberVal.length == 6 && (regionVal.length == 2 || regionVal.length == 3)) {
        $("#confirm-btn").removeClass("disabled");
    } else {
        $("#confirm-btn").addClass("disabled");
    }
}


function injectRemoveCarClickEvents() {
    $("#table button").click(removeCar);
    console.log("injectClickEvents");
}

function getAllCars() {
    console.log("Returning cars info...");
    var fullUrl = URL + endpoints.getAllCars;
    console.log("url: " + fullUrl);
    $.ajax({
        url: fullUrl,
        type: "GET",
        async: false,
        success: function (data, status) {
            drawTable(data);
        },
        error: function () {
            alert("Перезагрузите страницу.");
            //TODO: Handle this function
        }
    });
    injectRemoveCarClickEvents();
}

/**
 * The function is called when a click event on 'Confirm' button is performed
 */
function addCar() {
    console.log("adding...");
    var fullUrl = URL + endpoints.addCar;
    console.log("url: " + fullUrl);
    addCarApiBody = $.extend({}, addCarApiInitialBody);
    addCarApiBody.number = $('#car-number').val();
    addCarApiBody.region = $('#region').val();
    addCarApiBody.ticket = getIsThereTicket();
    $.ajax({
        url: fullUrl,
        type: "POST",
        data: addCarApiBody,
        success: function (data, status) {
            // TODO: Print notification about successful adding
            emptyAddCarFields();
            getAllCars();
        },
        error: function () {
            alert("Не удалось добавить этот автомобиль в базы данных.");
            //TODO: Handle this function
        }
    });
}

function emptyAddCarFields() {
    console.log("Empting Add Car fields...")
    $('#car-number').val("");
    $('#region').val("");
}

/**
 * The function is called when a click event on 'Remove' button of any table row
 * is performed
 */
function removeCar() {
    console.log("Removing the car...")
    var row = $(this).parent().parent();
    var carFullNum = row.find(".car-number").html().split(" ");
    var carNum = carFullNum[0];
    var region = carFullNum[1];
    var ticketOfCar = row.find(".is-there-ticket");
    var fullUrl = URL + endpoints.deleteCar + "/" + carNum + "/" + region;
    $.ajax({
        url: fullUrl,
        type: "DELETE",
        success: getAllCars,
        error: function () {
            alert("Не удаётся удалить этот автомобиль из базы данных.");
            //TODO: Handle this function
        }
    });
}

function getIsThereTicket() {
    var selected = $('#ticket-radio label.active input').val();
    console.log("selected: " + selected);
    return selected;
};

function drawTable(cars) {
    resetTable();
    console.log("Drawing table...");
    var carsNum = cars.length;
    for (var i = 0; i < carParkLimit; i++) {
        if (carsNum > i) {
            drawRow(cars[i], i);
        } else {
            drawRow(emptyRow, i);
        }

    }
}

function resetTable() {
    console.log("Reseting table...");
    $("#table>tbody").remove();
}

function drawRow(row, i) {
    var rowData = $.extend({}, emptyRow);
    if (row.number !== emptyRow.number) {
        rowData.number = row.number + " " + row.region;
        rowData.ticket = (row.ticket === "Y") ? "Да" : "Нет";
    }
    var row = $("<tr />")
    $("#table").append(row);
    var tdOpen = "<td class=\"td-inner\">";
    var tdOpenForCarNum = "<td class=\"td-inner car-number\">";
    var tdOpenForTicket = "<td class=\"td-inner is-there-ticket\">";
    var tdClose = "</td>";
    var removeBtn = "<button class=\"btn btn-danger center-block\"><i class=\"glyphicon glyphicon-remove\"></i></button>";
    var disabledRemoveBtn = "<button class=\"btn btn-danger center-block disabled\"><i class=\"glyphicon glyphicon-remove\"></i></button>";
    row.append($(tdOpen + (i + 1) + tdClose));
    row.append($(tdOpenForTicket + rowData.ticket + tdClose));
    row.append($(tdOpenForCarNum + rowData.number + tdClose));
    if (rowData.number === "-") {
        row.append($(tdOpen + disabledRemoveBtn + tdClose));
    } else {
        row.append($(tdOpen + removeBtn + tdClose));
    }
}