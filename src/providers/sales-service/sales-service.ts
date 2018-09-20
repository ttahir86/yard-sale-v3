// import { ISale } from './sales-service';
import { Http } from '../../../node_modules/@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISale } from './sales.model';


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

  constructor(public http: Http) {
    console.log('Hello SalesServiceProvider Provider');
  }

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
    console.log('CLOSESTSALES')
    console.log(closestSales);
    for (let i in closestSales) {
      let d = Number(closestSales[i].distance).toFixed(2);
      console.log("USERNAME INSIDE OF SERVCE THAT IS PASSED: " + username)
      console.log("closestSales[i].owner: " + closestSales[i].owner)
      if(closestSales[i].owner == username ){
        console.log("THEY ARE EQUAL!")
        usersale.push({ owner: closestSales[i].owner, title: closestSales[i].title, distance: Number(d), lat: Number(closestSales[i].latitude), lng: Number(closestSales[i].longitude) });
      }else{
        sales.push({ owner: closestSales[i].owner, title: closestSales[i].title, distance: Number(d), lat: Number(closestSales[i].latitude), lng: Number(closestSales[i].longitude) });
      }
      
    }
    return {sales: sales, usersale: usersale}
  }


}
