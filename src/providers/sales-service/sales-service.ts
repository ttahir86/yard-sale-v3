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
const URL_EDIT_SALES = "https://talaltahir.com/local-messages-api/edit-whalesale.php";


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


  editSale(data){
    console.log("editSale")
    console.log(data)
    

    let postData = JSON.stringify
      (
        {
          title: data.title,
          description: data.description,
          owner: data.owner,
        }
      );
    return this.http.post(URL_EDIT_SALES, postData);
  }

  editSaleCallBack(data){
    console.log("EDIT SALE CALLBACK DATA");
    console.log(data)
  }


  isOpen(sale: ISale){
    let saleStartTime = sale.startTime;
    let currentDate = new Date();
    console.log('saleStartTime: ' + saleStartTime)
    let h = currentDate.getHours(); // => 9
    let m = currentDate.getMinutes(); // =>  30
    let s = currentDate.getSeconds();
    let currentTime = h + ":" + m + ":" + s
    
    console.log('currentTime: ' + currentTime)
    
    let bIsSaleTimeOpen = false;
    if (currentTime >= saleStartTime ){
      console.log('open')
      bIsSaleTimeOpen = true;
    }




    let saleDate = sale.startDate;

    console.log("current Date: " + this.timeService.getCurrentFullDate())
    console.log("sale Date: " + saleDate)
    var d1 = Date.parse(this.timeService.getCurrentFullDate());
    var d2 = Date.parse(saleDate);
    if (d1 === d2 && bIsSaleTimeOpen) {
        return true;
    }else if (d1 <= d2){
      return 'opening';
    }

    return false;


  }



}
