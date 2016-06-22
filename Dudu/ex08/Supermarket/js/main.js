'use strict'

var gItems = [ 
    {name: 'onion',       price: 5,  department: 0},
    {name: 'tomato',      price: 4,  department: 0},
    {name: 'salt',        price: 3,  department: 1},
    {name: 'cinamon',     price: 5,  department: 1},
    {name: 'beef',        price: 8,  department: 2},
    {name: 'chicken',     price: 6,  department: 2},
    {name: 'cola',        price: 4,  department: 3},
    {name: 'watr',        price: 2,  department: 3},
    {name: 'dishsoap',    price: 5,  department: 4},
    {name: 'bleech',      price: 4,  department: 4},
    {name: 'shampoo',     price: 6,  department: 5},
    {name: 'conditioner', price: 7,  department: 6},
    {name: 'screwdriver', price: 15, department: 6},
    {name: 'drill',       price: 13, department: 6}
];

var gDepartments = [
    {name: 'Vegtables', items: ['onion',       'tomato'     ], soldCount: 0, cashCount: 0 },
    {name: 'Spices',    items: ['salt',        'cinamon'    ], soldCount: 0, cashCount: 0 },
    {name: 'Deli',      items: ['beef',        'chicken'    ], soldCount: 0, cashCount: 0 },
    {name: 'Drinks',    items: ['cola',        'water'      ], soldCount: 0, cashCount: 0 },
    {name: 'Cleaning',  items: ['dishsoap',   'bleech'      ], soldCount: 0, cashCount: 0 },
    {name: 'Bath',      items: ['shampoo',     'conditioner'], soldCount: 0, cashCount: 0 },
    {name: 'Tools',     items: ['screwdriver', 'drill'      ], soldCount: 0, cashCount: 0 }
];               

var gCashRegs = [ 
    {serial: 0, cash: 0}, 
    {serial: 1, cash: 0},
    {serial: 2, cash: 0},
    {serial: 3, cash: 0},
    {serial: 4, cash: 0},
    {serial: 5, cash: 0},
    {serial: 6, cash: 0}
];


function sellItem(itemName, cashReg) {
    var price = getPriceByName(itemName);
    gCashRegs[cashReg].cash += price;
    
    var departmentIndex = getDepartmentByName(itemName);
    console.log(departmentIndex);
    
    gDepartments[departmentIndex].soldCount++;
    gDepartments[departmentIndex].cashCount += price;
    console.log(itemName, ': cash no. ', cashReg, ' ,price: ', price);
}

function getPriceByName(itemName) { 
    for (var i = 0; i < gItems.length; i++) {
        if (gItems[i].name === itemName) return gItems[i].price; 
    }
}

function getDepartmentByName(itemName) {
    for (var i = 0; i < gItems.length; i++) {
        if (gItems[i].name === itemName) return gItems[i].department; 
    }
}

function printDepartmentsStatus() {
    for (var i = 0; i < gDepartments.length; i++) {
        console.log('Department ', gDepartments[i].name, ': Items sold: ', gDepartments[i].soldCount, ', sales: ', gDepartments[i].cashCount);
        
    }
}

function init() {
    buildCashesTable();
    
}

function buildCashesTable() {
    var elCashRegs = document.querySelector('.cashRegs');
    for (var i = 0; i < gCashRegs.length; i++) {
        elCashRegs.innerHTML += ' <div class="cashReg"> </div>';
    }    
    for (var i = 0; i < gCashRegs.length; i++) {
        var strHTML = '<button style="position: relative; top: 30px"; onclick="buildDepartments(' + i + ')">Cash register no. ' + i + '</button></br>';
        elCashRegs.innerHTML += strHTML;
    }
    elCashRegs.innerHTML += '</div>';
}

function buildDepartments(serial) {
    var elCashRegs = document.querySelectorAll('.cashReg');
    elCashRegs[0].innerText = 'Cash Register no. ' + serial;
    for (var i = 0; i < gDepartments.length; i++) {
        var strHTML = '<div style="position: relative; left: 20px" class="department' + gDepartments[i].name + ' cashReg' + serial + '"> <button onclick="buildProducts(' + i + ',' + serial + ')">'  + gDepartments[i].name + '</button> </div>';
        elCashRegs[i].innerHTML = strHTML;
    }
}

function buildProducts(i, serial) {
    var elCashRegs = document.querySelectorAll('.cashReg');
    for (var j = 0; j < gDepartments[i].items.length; j++) {
        var elDepartment = document.querySelector('.department' + gDepartments[i].name);
        elDepartment.innerHTML += '<div class="' + gDepartments[i].items[j] + '" style="position: relative; left: 20px"> </div>'
        var elItem = document.querySelector('.' + gDepartments[i].items[j]);
        elItem.innerHTML = '<button onclick="sellItem(this.innerText,' + serial + ')">' + gDepartments[i].items[j] + '</button>';
    }
}

