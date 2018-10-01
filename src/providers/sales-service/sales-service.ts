// import { ISale } from './sales-service';
import { Http } from '../../../node_modules/@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISale } from './sales.model';
import { TimeProvider } from '../time/time';



// export interface ISale{
//   title           : string;
//   distance        : number;
//   lat             : number;
//   lng             : number;
//   description     ?: string;
//   username        ?: string;
//   startTime       ?: string;
//   endTime         ?: string;
//   image           ?: string;

// }
const URL_FIND_SALES = "https://talaltahir.com/local-messages-api/find-sales.php";


@Injectable()
export class SalesServiceProvider {

  constructor(public http: Http, private timeService : TimeProvider) {}

  getSales(location: {lat: number, lng:number}, milesToSearch: number ) : Observable<any>{
    let postData = JSON.stringify
      (
        {
          lat: location.lat,
          lng: location.lng,
          maxDistance: milesToSearch,
        }
      );

    return this.http.post(URL_FIND_SALES, postData);
  }

  getSalesCallBack(data, username) : {sales: ISale[], usersale: ISale[]}{
    let closestSales;
    let sales: ISale[] = [];
    let usersale: ISale[] = []

    try {
      closestSales = JSON.parse(data["_body"]);
    } catch (error) {
      console.log(error);
      console.log(data);
    }

    for (let i in closestSales) {
      let d = Number(closestSales[i].distance).toFixed(2);
      if(closestSales[i].owner == username ){
        usersale.push({ 
          owner: closestSales[i].owner, 
          title: closestSales[i].title, 
          description: closestSales[i].description, 
          startDate: closestSales[i].startDate, 
          startTime: closestSales[i].startTime,
          displayStartTime: this.timeService.convertTime(closestSales[i].startTime),   
          distance: Number(d), 
          lat: Number(closestSales[i].latitude), 
          lng: Number(closestSales[i].longitude) });
      }else{
        sales.push({ 
          owner: closestSales[i].owner, 
          title: closestSales[i].title, 
          description: closestSales[i].description, 
          startDate: closestSales[i].startDate, 
          startTime: closestSales[i].startTime, 
          displayStartTime: this.timeService.convertTime(closestSales[i].startTime),
          distance: Number(d), 
          lat: Number(closestSales[i].latitude), 
          lng: Number(closestSales[i].longitude) });
      }
      
    }
    return {sales: sales, usersale: usersale}
  }




}
