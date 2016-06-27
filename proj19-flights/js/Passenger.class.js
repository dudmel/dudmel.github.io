'use strict';

const KEY_PASSENGERS = 'passengers';

// This is a constructor function
function Passenger(name, birthdate, passport, phone, pin, imgFileName, id) {
    this.name = name;
    this.birthdate = new Date(birthdate);
    this.pin = pin ? pin : randomPin();
    this.id = (id) ? id : Passenger.nextId();
    this.passport = passport;
    this.phone = phone;
    this.imgFileName = imgFileName;
}


// static methods:
Passenger.getNamesList = function () {
    return Passenger.query().map(p => p.name + ' - ' + p.id);
}

Passenger.nextId = function () {
    let result = 1;
    let jsonPassengers = Passenger.loadJSONFromStorage();
    if (jsonPassengers.length) result = jsonPassengers[jsonPassengers.length - 1].id + 1;
    return result;
}

Passenger.findById = function (pId) {
    let result = null;
    let passengers = Passenger.query()
        .filter(p => p.id === pId);
    if (passengers.length) result = passengers[0];
    return result;
}

Passenger.loadJSONFromStorage = function () {
    let passengers = getFromStorage(KEY_PASSENGERS);
    if (!passengers) passengers = [];
    return passengers;
}

Passenger.query = function () {
    if (Passenger.passengers) return Passenger.passengers;
    let jsonPassengers = Passenger.loadJSONFromStorage();

    Passenger.passengers = jsonPassengers.map(jsonPassenger => {
        return new Passenger(jsonPassenger.name, jsonPassenger.birthdate, jsonPassenger.passport, jsonPassenger.phone, jsonPassenger.pin, jsonPassenger.imgFileName, jsonPassenger.id);
    })

    return Passenger.passengers;
}   

Passenger.save = function (formObj) {
    let passengers = Passenger.query();
    let passenger;
    if (formObj.pid) {
        passenger = Passenger.findById(+formObj.pid);
        passenger.name = formObj.pname;
        passenger.passport = formObj.ppassport;
        passenger.phone = formObj.pphone;
        passenger.birthdate = new Date(formObj.pdate);
        if (formObj.pphoto)
            passenger.imgFileName = formObj.pphoto;
        Passenger.render();
    } else {
        passenger = new Passenger(formObj.pname, formObj.pdate, formObj.ppassport, formObj.pphone, formObj.ppin, formObj.imgFileName);
        passengers.push(passenger);
    }
    Passenger.passengers = passengers;
    saveToStorage(KEY_PASSENGERS, passengers);
    Passenger.renderDteails(passenger);
}

Passenger.savePassenger = function () {
    var formObj = $('form').serializeJSON();
    var imgFileName = $('#pphoto').val();
    if (imgFileName)
        formObj.pphoto = imgFileName.substring(imgFileName.lastIndexOf('\\') + 1);
    Passenger.save(formObj);
    Passenger.render();
    $('#modalPassenger').modal('hide');

}

Passenger.remove = function (pId, event) {
    event.stopPropagation();
    let passengers = Passenger.query();
    passengers = passengers.filter(p => p.id !== pId)
    saveToStorage(KEY_PASSENGERS, passengers);
    Passenger.passengers = passengers;
    Passenger.render();
}

const imgPath = "img/monster/";
Passenger.renderDteails = function (p) {
    $('.pDetailsName').html(p.name);
    $('#pDetailsPIN').html(p.pin);
    $('#pDetailsPassport').html(p.passport);
    $('#pDetailsPhone').html(p.phone);
    $('#pDetailsFlights').html(p.getFlights());
    $('#pDetailsBirthdate').html(moment(p.birthdate).format('DD-MM-YYYY'));
    $('#pDetailsImg').attr('src', imgPath + p.imgFileName);
}

Passenger.prototype.getFlights = function () {
    let passengerFlights = [];
    let flights = Flight.query();
    flights.forEach(flight => {
        if (flight.passengers.indexOf(this.id) >= 0) passengerFlights.push(moment(flight.date).format('DD-MM-YYYY') + '&nbsp&nbsp&nbsp' + flight.src + ' >>> ' + flight.dest + '<br>'); 
    })
    return passengerFlights.join('');
}

Passenger.init = function () {
    Passenger.render();
    $("#pphone").mask("999-9999999");
    $("#ppassport").mask("9999999999");
}

Passenger.render = function () {

    let passengers = Passenger.query();
    var strHtml = passengers.map(p => {
        return `<tr onclick="Passenger.select(${p.id}, this)">
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>
                ${moment(p.birthdate).format('DD-MM-YYYY')}
                ${(p.isBirthday()) ? '<i class="glyphicon glyphicon-gift"></i>' : ''}
            </td>
            <td>
                <button class="btn btn-danger" onclick="Passenger.remove(${p.id}, event)">
                    <i class="glyphicon glyphicon-trash"></i>
                </button>
                 <button class="btn btn-info" onclick="Passenger.editPassenger(${p.id}, event)">
                    <i class="glyphicon glyphicon-edit"></i>
                </button>
            </td>
        </tr>`

    }).join(' ');
    $('.tblPassengers').html(strHtml);
}

Passenger.select = function (pId, elRow) {
    let p = Passenger.findById(pId);
    $('.active').removeClass('active success');
    $(elRow).addClass('active success');
    $('#detailsActions').html(`<button class="btn btn-danger" onclick="Passenger.remove(${p.id}, event)">
                                <i class="glyphicon glyphicon-trash"></i>
                            </button>
                            <button class="btn btn-info" onclick="Passenger.editPassenger(${p.id}, event)">
                                <i class="glyphicon glyphicon-edit"></i>
                            </button>`);
    $('.details').show();
    Passenger.renderDteails(p);
    let elem = $('.details');
    $(window).scrollTop(elem.offset().top).scrollLeft(elem.offset().left);
}


Passenger.editPassenger = function (pId, event) {
    if (event) event.stopPropagation();
    if (pId) {
        let passenger = Passenger.findById(pId);
        $('#pid').val(passenger.id);
        $('#ppin').val(passenger.pin);
        $('#pname').val(passenger.name);
        $('#ppassport').val(passenger.passport);
        $('#pphone').val(passenger.phone);
        $('#pdate').val(moment(passenger.birthdate).format('YYYY-MM-DD'));

    } else {
        $('#pid').val('');
        $('#pname').val('');
        $('#ppassport').val('');
        $('#pphone').val('');
        $('#pdate').val('');
    }


    $('#modalPassenger').modal('show');

}

// instance methods:
Passenger.prototype.isBirthday = function () {
    let now = new Date();
    return (this.birthdate.getMonth() === now.getMonth() &&
        this.birthdate.getDate() === now.getDate());
}

Passenger.prototype.checkPin = function (pin) {
    return pin === this.pin;
}

