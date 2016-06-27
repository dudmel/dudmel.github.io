'use strict';

const KEY_PLANES = "planes";
const NO_FLIGHTS = "No flight found";

// This is a constructor function
function Plane(model, sitsCount, id) {
    this.model = model;
    this.sitsCount = sitsCount;
    this.id = +(id) ? id : Plane.nextId();
}

Plane.prototype.getFlights = function () {
    return Flight.query().filter(f => f.plane === this.id).sort(this.date);   
}

Plane.findById = function (pId) {
    let result = null;
    let planes = Plane.query()
        .filter(p => p.id === pId);
    if (planes.length) result = planes[0];
    return result;
}

Plane.select = function (pId, elRow) {
   
    $('.active').removeClass('active success');
    $(elRow).addClass('active success');
    $('.details').show();
    let plane = Plane.findById(pId);
    $('.pDetailsId').html(plane.id);
    $('#pDetailsModel').html(plane.model);
    $('#pDetailsSitsCount').html(plane.sitsCount);
    let flights = plane.getFlights();
    let strHtml = flights.length > 0 ? flights.sort(flightsComparer).join("<br/>").toString() : NO_FLIGHTS;
    log(strHtml);
    $('#pDetailsFlights').html(strHtml);
    let elem = $('.details');
    $(window).scrollTop(elem.offset().top).scrollLeft(elem.offset().left);
    
}

let flightsComparer = (f1, f2) => { return f2.date - f1.date };

Plane.render = function() {
    let planes = Plane.query();
    let strHtml = planes.map(p => `<tr onclick="Plane.select(${p.id}, this)">
                                    <td>${p.id}</td>
                                    <td>${p.model}</td>
                                    <td>${p.sitsCount}</td>
                                    <td>
                                        <button class="btn btn-danger" onclick="Plane.remove(${p.id}, event)">
                                            <i class="glyphicon glyphicon-trash"></i>
                                        </button>
                                        <button class="btn btn-info" data-btn="editBtn" onclick="Plane.edit(${p.id}, this)">
                                            <i class="glyphicon glyphicon-edit"></i>
                                        </button>
                                    </td>
                                   <tr>` )
    $('.tblPlanes').html(strHtml);
}

Plane.nextId = function () {
    let planes = Plane.query();
    if (planes.length > 0) return planes[planes.length-1].id + 1;
    return 1;
}

Plane.query = function () {
    let planes = [];
    if (getFromStorage(KEY_PLANES)) planes = getFromStorage(KEY_PLANES);
    planes = planes.map(p => new Plane(p.model, p.sitsCount, p.id))
    
    return planes;
}

Plane.findIndex = function (pId) {
    
    let planes = Plane.query();
    let index = null;
    planes.forEach(function (plane, i) {
        if (plane.id === +pId) index = i; 
    })
    return index;
}

Plane.save = function (formObj) {
      let pId = $('#pid').val();
      let planes = Plane.query();
    
    if (pId) {
        let plane = planes[Plane.findIndex(pId)];
        plane.model = formObj.pModel;
        plane.sitsCount = formObj.pSits;
        
    } else {
        // pId = Plane.nextId();
        let plane = new Plane(formObj.pModel, formObj.pSits, pId);
        planes.push(plane);
    }
    saveToStorage(KEY_PLANES, planes);
}

Plane.savePlane = function (pId) {
    var formObj = $('form').serializeJSON();
    Plane.save(formObj);
    Plane.render();
    $('#modal').modal('hide');
}

Plane.edit = function (pId, obj) {
    if (event) event.stopPropagation();
    $('#modal').modal('show');
    if ($(obj).data().btn === 'editBtn') {
        $('#myModalLabel').html('Edit Plane');
        let plane = Plane.findById(pId);
        $('#pModel').val(plane.model);
        $('#pSits').val(plane.sitsCount);
        $('#pid').val(pId);
    }
    else {
        $('#myModalLabel').html('Add Plane');
        $('#pModel').val('');
        $('#pSits').val('');
        $('#pid').val('');
        let plane = new Plane();

    }
}

Plane.remove = function (pId, event) {
    if (event) event.stopPropagation();
    let planes = Plane.query();
    let planeIndex = Plane.findIndex(pId);
    planes.splice(planeIndex, 1);
    saveToStorage(KEY_PLANES, planes);
    Plane.render();
}
