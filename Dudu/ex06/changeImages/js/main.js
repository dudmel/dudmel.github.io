'use strict'

var gClickedImg = undefined;
var gIntervalId;
// var gImgFiles = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg']
var gImgFiles = [ { url: 'img/1.jpg', desc: '1'},
                  { url: 'img/2.jpg', desc: '2'},
                  { url: 'img/3.jpg', desc: '3'},
                  { url: 'img/4.jpg', desc: '4'},
                  { url: 'img/5.jpg', desc: '5'},
                  { url: 'img/6.jpg', desc: '6'},
                  { url: 'img/7.jpg', desc: '7'},
                  { url: 'img/8.jpg', desc: '8'},
                  { url: 'img/9.jpg', desc: '9'}, ];
                 
function addBorder(elImage) {
    if (gClickedImg) gClickedImg.classList.remove('clicked');
    elImage.classList.add('clicked');
    gClickedImg = elImage;
    
    var elImgDesc = document.querySelector('.imgDesc');
    elImgDesc.innerText = getImgByUrl(elImage.src).desc;  
}

function getImgByUrl(url) {
    var foundImgs = gImgFiles.filter(function(img) {
        return url.indexOf(img.url) !== -1;
    });
    return foundImgs[0];
}

function changePictures() {
    var elImages = document.querySelectorAll('.imgContainer > img');
    for (var i = 0; i < elImages.length; i++) {
        var randomImgObj = parseInt(Math.random()*gImgFiles.length);
        console.log(randomImgObj);
        
        // var randomImgFile = "img/" + gImgFiles[parseInt(Math.random()*10)];
        elImages[i].src = getImgByUrl(gImgFiles[randomImgObj].url).url;
    }
}

function changeIn5() {
    setTimeout(changePictures, 3000);
}

function changeEvery5() {
    gIntervalId = setInterval(changePictures, 1500);
}

function stopInterval() {
    clearInterval(gIntervalId);
}

