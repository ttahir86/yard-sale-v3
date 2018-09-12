import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

const STORAGE_USERNAME = "username"
const URL_CREATE_USER = "https://talaltahir.com/local-messages-api/make-new-user.php";
const URL_FIND_SALES_BY_USERNAME =  "https://talaltahir.com/local-messages-api/find-sales-by-username.php"
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: Http, 
    private storage: Storage, 
    private geo: Geolocation) {
    console.log('Hello UserServiceProvider Provider');
  }

  getUserLocation(){
    // let GPSoptions = { enableHighAccuracy: true, maximumAge: 0 };
    return this.geo.getCurrentPosition()
  }

  getUsername(){
    return this.storage.get(STORAGE_USERNAME);
  }

  doesUserExist(username){
    return username === null ? false : true
  }

  removeUser(){
    this.storage.remove(STORAGE_USERNAME).then(() => { })
  }

  createUser(){
     return  this.http.post(URL_CREATE_USER, {})
  }

  createUserCallBack(data){
    try {
      let newUserName = data["_body"].replace(/['"]+/g, '').replace(/[\r\n]/g, "");;
      this.storage.set(STORAGE_USERNAME, newUserName)
      return newUserName;

    } catch (error) {
      console.log(data);
      console.log(error);
      return false;
    }
  }

  getSaleByUsername(username){

    return this.http.post(URL_FIND_SALES_BY_USERNAME, {username: username})
  }


  getSaleByUsernameCallBack(data){
      let usersSale: any = false;
      try {
        usersSale = data["_body"].replace(/[\r\n]/g, "");
        let bDoesUserHaveActiveSale = usersSale == "\"{status : false}\"" ? false : true;
        if (bDoesUserHaveActiveSale) {
          return JSON.parse(usersSale);
        }else{
          return false;
        }
      } catch (error) {
        console.log(error)
        return false;
      }
  }
}
