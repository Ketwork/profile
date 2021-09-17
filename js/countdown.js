const countdown = () => {
  // getTime returns the time in milliseconds 
  const countDate = new Date("Sept 15, 2021 00:00:").getTime();
  // const countDate = new Date().getDate();
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  document.querySelector(".day").innerText = textDay + 'day ' + textHour + 'h' + textMinute + 'm' + textSecond + 's';
  document.querySelector(".hour").innerText = textHour;
  document.querySelector(".minute").innerText = textMinute;
  document.querySelector(".second").innerText = textSecond;

  if(gap < 10000) {
    
  }
};

setInterval(countdown, 1000);