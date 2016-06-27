
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
 
function getFromStorage(key) {
  var str = localStorage.getItem(key);
  return JSON.parse(str);
} 

function log() {
    var cl = console.log.bind(console, new Date());
    cl.apply(console, arguments)
}

function randomPin() {
    return Math.floor(Math.random()*90000) + 10000;
}

//bound select options from given array
function bindSelectFromArray(selector, arrOptions, firstOption) {
  let strHtml = firstOption ? `<option value= ''> ${firstOption}</option >` : "";
  strHtml += arrOptions.map(function (item) {
    return `<option value="${item}">${item}</option>`;
  }).join('');  
  $(selector).html(strHtml);   
}

// This function is used to achieve class inheritance
// function inherit(derived, base) {
//      function Dummy() { }
//      Dummy.prototype = base.prototype;

//      derived.prototype = new Dummy();
// }


