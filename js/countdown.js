var myArray = [
    {'area':'Long Island Wall', 'stripdate':'Dec 20, 2023', 'resetdate':'21 Dec', 'timeleft':''},
    {'area':'Font Back Wall', 'stripdate':'Dec 27, 2023', 'resetdate':'28 Dec', 'timeleft':''},
    {'area':'Barrel Wall', 'stripdate':'Nov 08, 2023', 'resetdate':'09 Nov', 'timeleft':''},
    {'area':'Rhino', 'stripdate':'Nov 15, 2023', 'resetdate':'17 Nov', 'timeleft':''},
    {'area':'Comp Wall', 'stripdate':'Nov 29, 2023', 'resetdate':'30 Nov', 'timeleft':''},
    {'area':'Islands 3+4', 'stripdate':'Nov 22, 2023', 'resetdate':'23 Nov', 'timeleft':''},
    {'area':'Font Boulders', 'stripdate':'Dec 06, 2023', 'resetdate':'07 Dec', 'timeleft':''},
    {'area':'Islands 1+2', 'stripdate':'Dec 13, 2023', 'resetdate':'14 Dec', 'timeleft':''},
    {'area':'Power Tunnel', 'stripdate':'Nov 08, 2023', 'resetdate':'08 Nov', 'timeleft':''},
    {'area':'Circuit Board', 'stripdate':'Sept 07, 2023', 'resetdate':'08 Sept', 'timeleft':''},
    {'area':'Auto Belays 1-4', 'stripdate':'Nov 06, 2023', 'resetdate':'06 Nov', 'timeleft':''},
    {'area':'Auto Belays 5-7', 'stripdate':'Dec 11, 2023', 'resetdate':'11 Dec', 'timeleft':''},
    {'area':'Auto Belays 8-10', 'stripdate':'Oct 11, 2023', 'resetdate':'11 Oct', 'timeleft':''},
]

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array(12);
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "Aug";
month[8] = "Sept";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

// DAYS COUNTDOWN
const countdown = () => {
    for (var i = 0; i < myArray.length; i++) {
        // getTime returns the time in milliseconds 
        // const countDate = new Date("Sept 15, 2021 00:00:").getTime();
        const countDate = new Date(myArray[i].stripdate).getTime();
        // const countDate = new Date().getDate();
        const now = new Date().getTime();
        const gap = countDate - now;
        var d = new Date(myArray[i].stripdate);
        var b = d.getDate();
        var w = weekday[d.getDay()];
        var m = month[d.getMonth()];

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        myArray[i].timeleft = textDay+1;
        myArray[i].stripdate = w + ' ' + b + ' ' + m;

        if(m == undefined || isNaN(b)) {
            myArray[i].stripdate = '-';
        }

        if(gap < -86400000 || isNaN(textDay)) {
            // when timer runs out
            myArray[i].timeleft = '-';
        }
    }
    buildTable(myArray);
};

countdown();
// setInterval(countdown, 1000);

// EVENT COUNTDOWN
const eventCountdown = () => {
    const eventDate = new Date("September 23, 2023 13:00:").getTime();
    const now = new Date().getTime();
    const gap = eventDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = (Math.floor(gap / day)).toLocaleString(undefined, {minimumIntegerDigits:2});
    const textHour = (Math.floor((gap % day) / hour)).toLocaleString(undefined, {minimumIntegerDigits:2});
    const textMinute = (Math.floor((gap % hour) / minute)).toLocaleString(undefined, {minimumIntegerDigits:2});
    const textSecond = (Math.floor((gap % minute) / second)).toLocaleString(undefined, {minimumIntegerDigits:2});

    if (gap > 10000) {
    document.querySelector('.section__subtitle').innerText = "🧗The Big Comp🏆 " + textDay + ':' + textHour + ':' + textMinute + ':' + textSecond;
    }
}  
setInterval(eventCountdown, 1000);

// BUILD TABLE
function buildTable(data){
    var table = document.getElementById('myTable')

    //table is cleared each time function is called (for setInterval countdown)
    // table.innerHTML = ''

    // * sort in strip date order *
    // data = data.sort(function(a,b){
    //   return new Date(a.stripdate) - new Date(b.stripdate);
    // });

    // sort data by days left (if >= 0)
    let timeSortedData = data.filter(num => num.timeleft >= 0).sort(function(a,b){
      return (a.timeleft) - (b.timeleft);
    });

    // sort rest of data by strip date
    let stripSortedData = data.sort(function(a,b){
        return new Date(a.stripdate) - new Date(b.stripdate);
    }).filter(num => isNaN(num.timeleft));

    // combine both sets of data
    data = timeSortedData.concat(stripSortedData);
        
    // console.log(data[0].timeleft);

    // build table
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].area}</td>
                        <td>${data[i].stripdate}</td>
                        <td>${data[i].resetdate}</td>
                        <td class="time-left">${data[i].timeleft}</td>
                </tr>`
        table.innerHTML += row
        
    }
}