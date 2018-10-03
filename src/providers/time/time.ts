import { Injectable } from '@angular/core';

@Injectable()
export class TimeProvider {

  constructor() {
    console.log('Hello TimeProvider Provider');
  }

  public convertTime(time) {


    time = time.split(':'); // convert to array

    // fetch
    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    let seconds = Number(time[2]);


    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours == 0) {
      timeValue = "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    // timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

    // show
    console.log("time:")
    console.log(timeValue);
    return timeValue;
    
  }

  getCurrentFullDate() {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    dd = dd < 10 ? '0' + dd : dd;
    mm = mm < 10 ? '0' + mm : mm;

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

}
