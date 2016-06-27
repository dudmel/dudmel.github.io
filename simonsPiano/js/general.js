function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
} 
 
function getFromStorage(key) {
  var str = localStorage.getItem(key);
  return JSON.parse(str);
} 

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
