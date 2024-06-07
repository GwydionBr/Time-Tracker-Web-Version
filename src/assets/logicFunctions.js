  // transform Seconds in display Time
  function displayTime(sec){
    let h, m, s = 0;

    s = sec % 60;
    m = ((sec - s)/ 60) % 60;
    h = ((((sec - s)/ 60) - m) / 60) % 100;

    if (h < 10) {h = "0" + h;}
    if (m < 10) {m = "0" + m;}
    if (s < 10) {s = "0" +s;}
    return (h + ":" + m + ":" + s);
  }

  export default displayTime;