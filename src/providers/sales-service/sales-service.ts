import { Http } from '../../../node_modules/@angular/http';
import { Injectable } from '@angular/core';

export interface ISale{
  title           : string;
  description     ?: string;
  username        ?: string;
  lat             : number;
  lng             : number;
  startTime       ?: string;
  endTime         ?: string;

}
const URL_FIND_SALES = "https://talaltahir.com/local-messages-api/find-sales.php";


@Injectable()
export class SalesServiceProvider {

  constructor(public http: Http) {
    console.log('Hello SalesServiceProvider Provider');
  }

  getSales(location: {lat: number, lng:number}, milesToSearch: number ){
   
    let postData = JSON.stringify
      (
      {
        lat: location.lat,
        lng: location.lng,
        maxDistance: milesToSearch,
      }
      );
    console.log("location");
      console.log(location);
    return this.http.post(URL_FIND_SALES, postData);
  }

  getSalesCallBack(data){
    let closestSales;
    let sales = [];
    console.log('getSalesCallBack start')
    console.log(data)
    try {
      console.log(data["_body"]);
      closestSales = JSON.parse(data["_body"]);
    } catch (error) {
      console.log(error);
    }

    for (let i in closestSales) {

      let d = Number(closestSales[i].distance).toFixed(2);
      sales.push({ title: closestSales[i].title, distance: Number(d), lat: Number(closestSales[i].latitude), lng: Number(closestSales[i].longitude) });
      console.log(sales);
    }
    return sales;
  }


}
