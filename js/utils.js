'use strict'

function saveToStorage(str, obj) {
    localStorage.setItem(str, JSON.stringify(obj));
}

function getFromStorage(str) {
    return  JSON.parse(localStorage.getItem(str));
}

function getRandomInt(min,max) {
    return (parseInt(Math.random()*(max + 1 - min) + min));
}

//init sound object
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function replaceAll(str, search, replacement) {
    return str.split(search).join(replacement);
}