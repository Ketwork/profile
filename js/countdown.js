var myArray = [
    {'area':'Long Island Wall', 'stripdate':'Dec 8, 2021', 'resetdate':'9 Dec', 'timeleft':''},
    {'area':'Font Back Wall', 'stripdate':'Dec 15, 2021', 'resetdate':'16 Dec', 'timeleft':'test'},
    {'area':'Islands Back Wall', 'stripdate':'Oct 20, 2021', 'resetdate':'21 Oct', 'timeleft':'test'},
    {'area':'Rhino', 'stripdate':'Oct 27, 2021', 'resetdate':'28 Oct', 'timeleft':'test'},
    {'area':'Comp Wall', 'stripdate':'Nov 11, 2021', 'resetdate':'13 Nov', 'timeleft':''},
    {'area':'Islands 3+4', 'stripdate':'Nov 18, 2021', 'resetdate':'19 Nov', 'timeleft':''},
    {'area':'Font Boulders', 'stripdate':'Nov 24, 2021', 'resetdate':'25 Nov', 'timeleft':''},
    {'area':'Islands 1+2', 'stripdate':'Dec 01, 2021', 'resetdate':'2 Dec', 'timeleft':''},
    {'area':'Power Tunnel', 'stripdate':'Dec 29, 2021', 'resetdate':'30 Dec (est.)', 'timeleft':''},
    {'area':'Circuit Board', 'stripdate':'Nov 3, 2021', 'resetdate':'4 Nov', 'timeleft':''},
    {'area':'Auto Belays 1-4', 'stripdate':'', 'resetdate':'', 'timeleft':''},
    {'area':'Auto Belays 5-7', 'stripdate':'', 'resetdate':'', 'timeleft':''},
    {'area':'Auto Belays 8-10', 'stripdate':'', 'resetdate':'', 'timeleft':''},
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
    const countDate = new Date("Nov 13, 2021 13:00:").getTime();
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
    document.querySelector('.section__subtitle').innerText = "🧗HARROCOMP!🏆 " + textDay + ':' + textHour + ':' + textMinute + ':' + textSecond;
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