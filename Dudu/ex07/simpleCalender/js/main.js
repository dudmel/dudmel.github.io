'use strict'

var gMeetings = [ {title: "Basketball game", startDate: Date.parse(new Date('2016-5-20 14:00')) , endDate: Date.parse(new Date('5 20 2016 14:30')), participants: ['Dudu', 'Moshe', 'Alon', 'Omer', 'Gal'] },
                  {title: "Concert",         startDate: Date.parse(new Date('2016-4-21 19:00')) , endDate: Date.parse(new Date('5 21 2016 22:00')), participants: ['Dudu', 'Noam'] },
                  {title: "Dinner",          startDate: Date.parse(new Date('2016-4-22 20:30')) , endDate: Date.parse(new Date('5 22 2016 21:30')), participants: ['Dudu', 'Michal'] },
                  {title: "Breakfest",       startDate: Date.parse(new Date('2016-5-22 9:00')) ,  endDate: Date.parse(new Date('5 20 2016 9:30')),  participants: ['Dudu', 'Noam'] },
                  {title: "Work meeting",    startDate: Date.parse(new Date('2016-5-20 15:00')) , endDate: Date.parse(new Date('5 20 2016 16:00')), participants: ['Dudu', 'Moshe', 'Noam'] },
                ];

function init() {
    sortMeetings(gMeetings);
    createTable(gMeetings);    
}

function createTable(meetings){
    var elMeetingsTable = document.querySelector('.meetingsTable');
    var strHTML = '';
    
    for (var i = 0; i < meetings.length; i++) {
        var participantsToPrint = '';
        for (var j = 0; j < meetings[i].participants.length; j++) {
            participantsToPrint += meetings[i].participants[j] + ', ';
        }

        strHTML = '<tr>';
        strHTML += '<td>' + meetings[i].title + '</td>';
        strHTML += '<td>' + new Date(meetings[i].startDate) + '</td>';
        strHTML += '<td>' + new Date(meetings[i].endDate) + '</td>';
        strHTML += '<td>' + participantsToPrint + '</td>';
        strHTML += '</tr>';
        elMeetingsTable.innerHTML += strHTML;
    }
}    

function sortMeetings(meetings) {
    var sortedMeetings = meetings.sort(function(meeting1, meeting2) {
        return meeting1.startDate > meeting2.startDate;
    })
}

function getParametersAndCreateMeeting() {
    var title = prompt('Title:');
    var start = prompt('Start Date: (yyyy-mm-dd hh:mm:ss)');
    var end = prompt('End Date: (yyyy-mm-dd hh:mm:ss)');
    var participants = prompt('Participants: (separated by commas)').split(',');
    
    addMeeting(title, Date.parse(new Date(start)), end, participants);
    
    alert('Meeting sucsessfully created: \r\r' + title + '\rstarting: ' + start + '\rending: ' + end + '\rwith: ' + participants);
    
    var elMeetingsTable = document.querySelector('.meetingsTable');
    elMeetingsTable.innerHTML = '';
    createTable(gMeetings);
}

function addMeeting(newTitle, newStartDate, newEndDate, newParticipants) {
    var newMeeting = {title: newTitle, startDate: newStartDate , endDate: newEndDate,participants: newParticipants};
    console.log(newMeeting.startDate);
    // gMeetings.push(newMeeting);
    // sortMeetings(gMeetings);
    
    var newIndex = 0;
    for (var i = 0; i < gMeetings.length; i++ ) {
        if (gMeetings[i].startDate > newMeeting.startDate) {
            newIndex = i;
            break;
        }
        newIndex = i;
    }
    
    console.table(gMeetings);
    console.log(newIndex);
    
    if (newIndex === gMeetings.length - 1) gMeetings.push(newMeeting);
    else gMeetings.splice(newIndex, 0, newMeeting);
}

function getFutureMeetings(meetings) {
    var currDate = Date.now();
    var futureMeetings = meetings.filter(function(meeting){
        return meeting.startDate > currDate;
    })  
    return futureMeetings;
}

function findNextMeeting(meetings) {
    var nextMeeting = getFutureMeetings(meetings)[0];
    alert('Your next meeting is: \r' + nextMeeting.title + ' at ' + new Date(nextMeeting.startDate));
}

function getMeetingsCountFor(name, meetings) {
    var counter = 0;
    meetings.forEach(function(meeting) {
        if (meeting.participants.indexOf(name) !== -1) counter++;  
    })
    alert(name + ' has ' + counter + ' meetings')
    return counter;
}
