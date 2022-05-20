var myArray = [
    {'area':'Long Island Wall', 'stripdate':'May 18, 2022', 'resetdate':'19 May', 'timeleft':''},
    {'area':'Font Back Wall', 'stripdate':'May 25, 2022', 'resetdate':'26 May', 'timeleft':''},
    {'area':'Islands Back Wall', 'stripdate':'June 29, 2022', 'resetdate':'30 June', 'timeleft':''},
    {'area':'Rhino', 'stripdate':'July 06, 2022', 'resetdate':'07 July', 'timeleft':''},
    {'area':'Comp Wall', 'stripdate':'June 08, 2022', 'resetdate':'09 June', 'timeleft':''},
    {'area':'Islands 3+4', 'stripdate':'july 13, 2022', 'resetdate':'14 July', 'timeleft':''},
    {'area':'Font Boulders', 'stripdate':'July 20, 2022', 'resetdate':'21 July', 'timeleft':''},
    {'area':'Islands 1+2', 'stripdate':'July 27, 2022', 'resetdate':'28 July', 'timeleft':''},
    {'area':'Power Tunnel', 'stripdate':'', 'resetdate':'', 'timeleft':''},
    {'area':'Circuit Board', 'stripdate':'', 'resetdate':'24 Mar', 'timeleft':''},
    {'area':'Auto Belays 1-4', 'stripdate':'', 'resetdate':'', 'timeleft':''},
    {'area':'Auto Belays 6-7', 'stripdate':'', 'resetdate':'09 May', 'timeleft':''},
    {'area':'Auto Belays 8-10', 'stripdate':'', 'resetdate':'13 May', 'timeleft':''},
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

        if(gap < 10000 || isNaN(textDay)) {
            // when timer runs out
            myArray[i].timeleft = '-';
        }
    }
    buildTable(myArray);
};

countdown();
// setInterval(countdown, 1000);

// EVENT COUNTDOWN
const harroweenCountdown = () => {
    const countDate = new Date("May 7, 2022 13:00:").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = (Math.floor(gap / day)).toLocaleString(undefined, {minimumIntegerDigits:2});
    const textHour = (Math.floor((gap % day) / hour)).toLocaleString(undefined, {minimumIntegerDigits:2});
    const textMinute = (Math.floor((gap % hour) / minute)).toLocaleString(undefined, {minimumIntegerDigits:2});
    const textSecond = (Math.floor((gap % minute) / second)).toLocaleString(undefined, {minimumIntegerDigits:2});

    if (gap > 10000) {
    document.querySelector('.section__subtitle').innerText = "🧗London Climbing Festival " + textDay + ':' + textHour + ':' + textMinute + ':' + textSecond;
    }
}  
setInterval(harroweenCountdown, 1000);

// BUILD TABLE
function buildTable(data){
    var table = document.getElementById('myTable')

    //table is cleared each time function is called (for setInterval countdown)
    // table.innerHTML = ''

    // * sort in strip date order *
    data = data.sort(function(a,b){
        return new Date(a.stripdate) - new Date(b.stripdate)
        })
    
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