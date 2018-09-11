import { Http } from '../../../node_modules/@angular/http';
import { Injectable } from '@angular/core';

export interface ISale{
  title           : string;
  distance        : number;
  lat             : number;
  lng             : number;
  description     ?: string;
  username        ?: string;
  startTime       ?: string;
  endTime         ?: string;
  image           ?: string;

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

    return this.http.post(URL_FIND_SALES, postData);
  }

  getSalesCallBack(data, username){
    let closestSales;
    let sales = [];
    let usersale = []

    try {
      closestSales = JSON.parse(data["_body"]);
    } catch (error) {
      console.log(error);
      console.log(data);
    }
    console.log('CLOSESTSALES')
    console.log(closestSales);
    for (let i in closestSales) {
      let d = Number(closestSales[i].distance).toFixed(2);
      if(closestSales[i].username === username ){
        usersale.push({ title: closestSales[i].title, distance: Number(d), lat: Number(closestSales[i].latitude), lng: Number(closestSales[i].longitude) });
      }else{
        sales.push({ title: closestSales[i].title, distance: Number(d), lat: Number(closestSales[i].latitude), lng: Number(closestSales[i].longitude) });
      }
      
    }
    return {sales: sales, usersale: usersale}
  }


}
