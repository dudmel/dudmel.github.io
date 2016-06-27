'use strict'
//const imgPath = "img/monster/";
const NoResults = "No flights where found";
$(document).ready(function () {
    init();
    $("#pname").autocomplete({
        source: Passenger.getNamesList(),
        appendTo: '.appendTo',
        select: function (event, ui) {
            let pId = parseInt(ui.item.value.split(' - ')[1]);
            log('id', pId);
            let passenger = Passenger.findById(pId);
            $('#pImg').attr('src', imgPath + passenger.imgFileName)
            log(ui.item.value);
        }
    });
})

function init() {
    //render airports list to source and dest selects
    bindSelectFromArray('#src', getAirports(), 'From');
}

function searchFlights() {
    let src = $("#src option:selected").text();
    let dest = $("#dest option:selected").text();
    log(src, dest);
    let results = Flight.search(src, dest);
    log(results);
    renderSearchResults(results);

}

function renderSearchResults(results) {
    if (results.length == 0)
        $('.searchResults').html(NoResults);
    else {
        let strHtml = results.map(f =>
            `<div class="resultFlight">
                 <div class="flightDate">${moment(f.date).format('DD-MM-YYYY')}</div>
                 <div> ${f.src} to ${f.dest} </div>
                 <div class="availSitsCount_${f.id}"><img src="img/layout/seat.png"/> Available Seats: &nbsp${f.availableSits}</div>
                 <button class="btn btn-primary" onclick="openModal(${f.id})">Book It</button>   
             </div>`
        )
        $('.searchResults').html(strHtml);
    }
}

function openModal(fId) {
    $('#modalBook').modal('show');
    $('#modalFlightId').val(fId);

}