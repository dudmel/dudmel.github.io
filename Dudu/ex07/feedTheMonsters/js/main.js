'use strict'

var gMonsters = [ {name: "muki", power: 1, friends: ["luki", "puki"]},
                  {name: "luki", power: 5, friends: ["muki"]},
                  {name: "puki", power: 3, friends: ["muki", "suki"]},
                  {name: "suki", power: 2, friends: ["puki"]} ];

console.table(gMonsters);

function getMonsterByName(name, monsters){
    var monsterObj;
    monsters.forEach(function(monster){
        if (monster.name === name)  monsterObj = monster;
    })
    return monsterObj;
}

function strongerThanFriends(monsters){
    var strongerMonsters = [];
    var isStronger = true;
    strongerMonsters = monsters.filter(function(monster) {
        for (var i = 0; i < monster.friends.length; i++) {
            var friendObj = getMonsterByName(monster.friends[i], gMonsters);
            if (friendObj.power > monster.power) return false;
        }
        return true;
    });
    return strongerMonsters;
}
console.table(strongerThanFriends(gMonsters));