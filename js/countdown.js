var myArray = [
    {'area':'Long Island Wall', 'stripdate':'Dec 9, 2021', 'resetdate':'10 Dec', 'timeleft':''},
    {'area':'Font Back Wall', 'stripdate':'Oct 7, 2021', 'resetdate':'08 Oct', 'timeleft':'test'},
    {'area':'Islands Back Wall', 'stripdate':'Oct 21, 2021', 'resetdate':'22 Oct', 'timeleft':'test'},
    {'area':'Rhino', 'stripdate':'Sept 28, 2021', 'resetdate':'29 sept', 'timeleft':'test'},
    {'area':'Comp Wall', 'stripdate':'Sept 21, 2021', 'resetdate':'25 sept', 'timeleft':''},
    {'area':'Islands 3+4', 'stripdate':'Nov 18, 2021', 'resetdate':'19 Nov', 'timeleft':''},
    {'area':'Font Boulders', 'stripdate':'Oct 26, 2021', 'resetdate':'27 Oct', 'timeleft':''},
    {'area':'Islands 1+2', 'stripdate':'Dec 02, 2021', 'resetdate':'03 Dec', 'timeleft':''},
    {'area':'Power Tunnel', 'stripdate':'Oct 14, 2021', 'resetdate':'15 Oct', 'timeleft':''},
    {'area':'Circuit Board 1-4', 'stripdate':'', 'resetdate':'', 'timeleft':''},
    {'area':'Auto Belays 1-4', 'stripdate':'', 'resetdate':'', 'timeleft':''},
    {'area':'Auto Belays 5-7', 'stripdate':'', 'resetdate':'', 'timeleft':''},
    {'area':'Auto Belays 8-10', 'stripdate':'', 'resetdate':'', 'timeleft':''},
]

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tues";
weekday[3] = "Wednesday";
weekday[4] = "Thurs";
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
        console.log(m);

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        myArray[i].timeleft = textDay+1 + ' days';
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

countdown()
// setInterval(countdown, 1000);


// BUILD TABLE
function buildTable(data){
    var table = document.getElementById('myTable')

    //table is cleared each time function is called (for setInterval countdown)
    // table.innerHTML = ''
    
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