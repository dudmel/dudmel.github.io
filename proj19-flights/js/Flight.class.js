'use strict';

const KEY_FLIGHTS = 'flights';

// This is a constructor function
function Flight(src, dest, planeId, date, id, passengers) {
    this.id = +(id) ? id : Flight.nextId();
    this.date = new Date(date);
    this.src = src;
    this.dest = dest;
    this.plane = +planeId;
    this.passengers = passengers ? passengers : [];
    this.availableSits = this.availableSits() ;
    
}

Flight.prototype.toString = function () {
    return this.src + "  >>  " + this.dest + "  on  " + moment(this.date).format('DD-MM-YY');
}

Flight.prototype.availableSits = function () {
    return Plane.findById(this.plane).sitsCount - this.passengers.length;
}

Flight.prototype.bookPassenger = function (pStr) {
    $('.modalMessage').addClass('errorMessage');
    $('.modalMessage').removeClass('successMessage');
    let pId = +pStr.split(' - ')[1];
    if (!pId) {
        $('.modalMessage').html('Invalid Passenger!');
        return;
    }
    let flightIndex = Flight.findIndex(this.id);
    let flights = Flight.query();
    let flight = flights[flightIndex]
    if (flight.passengers.indexOf(pId) === -1)
        if (flight.availableSits > 0) {
            flight.passengers.push(pId);
            $('.modalMessage').addClass('successMessage');
            $('.modalMessage').html(`Flight no. ${flight.id} from ${flight.src} to ${flight.dest} successfully booked for passenger ${Passenger.findById(pId).name}`);
            $(`.availSitsCount_${flight.id}`).html(flight.availableSits - 1);
        }
        else {
            $('.modalMessage').html('Flight fully booked!');
        }
    else {
        $('.modalMessage').html('Passnger already booked for this flight!');
    }
    saveToStorage(KEY_FLIGHTS, flights);
}

// static methods:
Flight.search = function (src, dest) {
    return Flight.query()
        .filter(flight => flight.src === src && flight.dest === dest && flight.date > new Date()
         );
}

Flight.findById = function (fId) {
    let result = null;
    let flights = Flight.query()
        .filter(f => f.id === fId);
    if (flights.length) result = flights[0];
    return result;
}

Flight.select = function (fId, elRow) {
   
    $('.active').removeClass('active success');
    $(elRow).addClass('active success');
    $('.details').show();
    let flight = Flight.findById(fId);
    $('.fDetailsId').html(flight.id);
    $('#fDetailsDate').html(moment(flight.date).format('DD-MM-YYYY'));
    $('#fDetailsSrc').html(flight.src);
    $('#fDetailsDest').html(flight.dest);
    $('#fDetailsPlane').html(Plane.findById(+flight.plane).model);
    $('#fDetailsSits').html(flight.availableSits);
    let elem = $('.details');
    $(window).scrollTop(elem.offset().top).scrollLeft(elem.offset().left);
}

Flight.render = function() {
    let flights = Flight.query();
    let strHtml = flights.map(f => `<tr onclick="Flight.select(${f.id}, this)">
                                    <td>${f.id}</td>
                                    <td>${moment(f.date).format('DD-MM-YYYY')}</td>
                                    <td>${f.src}</td>
                                    <td>${f.dest}</td>
                                    <td>${Plane.findById(f.plane).model}</td>
                                    <td>
                                        <button class="btn btn-danger" onclick="Flight.remove(${f.id}, event)">
                                            <i class="glyphicon glyphicon-trash"></i>
                                        </button>
                                        <button class="btn btn-info" data-btn="editBtn" onclick="Flight.edit(${f.id}, this)">
                                            <i class="glyphicon glyphicon-edit"></i>
                                        </button>
                                    </td>
                                   <tr>` )
    $('.tblFlights').html(strHtml);
    
    
}

Flight.nextId = function () {
    let flights = Flight.query();
    if (flights.length > 0) return flights[flights.length-1].id + 1;
    return 1;
}

Flight.query = function () {
    let flights = [];
    if (getFromStorage(KEY_FLIGHTS)) flights = getFromStorage(KEY_FLIGHTS);
    flights = flights.map(f => new Flight(f.src, f.dest, f.plane, f.date, f.id, f.passengers));
    
    return flights;
}

Flight.findIndex = function (fId) {
    
    let flights = Flight.query();
    let index = null;
    flights.forEach(function (flight, i) {
        if (flight.id === +fId) index = i; 
    })
    return index;
}

Flight.save = function (formObj) {
      let fId = $('#fid').val();
      let flights = Flight.query();
    
    if (fId) {
        let flight = flights[Flight.findIndex(fId)];
        flight.src = formObj.fSrc;
        flight.dest = formObj.fDest;
        flight.plane = formObj.fPlane;
        flight.date = formObj.fDate;
        
    } else {
        fId = Flight.nextId();
        let flight = new Flight(formObj.fSrc, formObj.fDest, formObj.fPlane, formObj.fDate, fId, []);
        flights.push(flight);
    }
    saveToStorage(KEY_FLIGHTS, flights);
}

Flight.saveFlight = function (fId) {
    var formObj = $('form').serializeJSON();
    Flight.save(formObj);
    Flight.render();
    $('#modal').modal('hide');
}

Flight.edit = function (fId, obj) {
    if (event) event.stopPropagation();
    $('#modal').modal('show');
    let strHtml;
    console.log(Plane.query());
    
    Plane.query().forEach(plane =>
        strHtml += `<option value=${plane.id}>${plane.id} - ${plane.sitsCount} sits</option>`);
    $('#fPlane').html(strHtml);

    bindSelectFromArray('#fSrc', getAirports(), 'From');


    if ($(obj).data().btn === 'editBtn') {
        $('#myModalLabel').html('Edit Flight');
        let flight = Flight.findById(fId);
        
        $('#fDate').val(moment(flight.date).format('YYYY-MM-DD'));
        $('#fSrc').val(flight.src);
        $('#fid').val(fId);
        $('#fDest').val(flight.dest);
        $('#fPlane').val(flight.plane);

    }
    else {
        $('#myModalLabel').html('Add Flight');
        $('#fDate').val('');
        $('#fSrc').val('');
        $('#fid').val('');
        $('#fDest').val('');
        $('#fPlane').val('');
        let flight = new Flight();
    }
}

Flight.renderDest = function (srcSelector, destSelector, firstOption) {
    let filteredAirports = getAirports().filter(airport => airport !== $(`#${srcSelector}`).val());
    bindSelectFromArray('#'+destSelector, filteredAirports, firstOption);

}

Flight.remove = function (fId, event) {
    if (event) event.stopPropagation();
    let flights = Flight.query();
    let flightIndex = Flight.findIndex(fId);
    flights.splice(flightIndex, 1);
    saveToStorage(KEY_FLIGHTS, flights);
    Flight.render();
}
