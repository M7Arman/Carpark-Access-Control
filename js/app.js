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
    $("#add-btn").click(addCar);
    $("#delete-btn").click(removeCar);
    $("#car-number").change(validateInputs);
    $("#region").change(validateInputs);
});

function validateInputs() {
    var carNumberVal = $("#car-number").val();
    var regionVal = $("#region").val();

    if (carNumberVal.length == 6 && (regionVal.length == 2 || regionVal.length == 3)) {
        $("#add-btn").removeClass("disabled");
        $("#delete-btn").removeClass("disabled");
    } else {
        $("#add-btn").addClass("disabled");
        $("#delete-btn").addClass("disabled");
    }
}

function getAllCars() {
    console.log("Returning cars info...");
    var fullUrl = URL + endpoints.getAllCars;
    console.log("url: " + fullUrl);
    $.ajax({
        url: fullUrl,
        type: "GET",
        async: true,
        success: function (data, status) {
            drawTable(data);
        },
        error: function () {
            alert("Перезагрузите страницу.");
            //TODO: Handle this function
        }
    });
}

/**
 * The function is called when a click event on 'Confirm' button is performed
 */
function addCar() {
    console.log("adding...");
    var fullUrl = URL + endpoints.addCar;
    console.log("url: " + fullUrl);
    var addCarApiBody = $.extend({}, addCarApiInitialBody);
    addCarApiBody.number = $('#car-number').val();
    addCarApiBody.region = $('#region').val();
    addCarApiBody.ticket = getIsThereTicket();
    $.ajax({
        url: fullUrl,
        type: "POST",
        data: addCarApiBody,
        success: function (data, status) {
            emptyAddCarFields();
            getAllCars();
            validateInputs();
        },
        error: function () {
            alert("Не удалось добавить этот автомобиль в базы данных.");
        }
    });
}

function emptyAddCarFields() {
    console.log("Empting Add Car fields...")
    $('#car-number').val("");
    $('#region').val("");
}

/**
 * The function is called when a click event on 'Remove' button is performed
 */
function removeCar() {
    console.log("Removing the car...")
    var carNum = $('#car-number').val();
    var region = $('#region').val();
    var fullUrl = URL + endpoints.deleteCar + "/" + carNum + "/" + region;
    $.ajax({
        url: fullUrl,
        type: "DELETE",
        success: function (data, status) {
            if (data.status === false) {
                $.growl.error({
                    message: "Нет такой машины в парковке!"
                });
                return;
            }
            emptyAddCarFields();
            getAllCars();
            validateInputs();
        },
        error: function () {
            alert("Не удаётся удалить этот автомобиль из базы данных.");
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
    var tdOpenForCarNum = "<td class=\"td-inner car-number-column\">";
    var tdOpenForTicket = "<td class=\"td-inner is-there-ticket\">";
    var tdClose = "</td>";
    row.append($(tdOpen + (i + 1) + tdClose));
    row.append($(tdOpenForTicket + rowData.ticket + tdClose));
    row.append($(tdOpenForCarNum + rowData.number + tdClose));
}