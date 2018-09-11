import { GoogleMapsAPIWrapper } from '@agm/core';
import { SalesServiceProvider, ISale } from './../../providers/sales-service/sales-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapCenter: {lat: number, lng: number}
  sales: ISale[] = [];
  user: {username?: string, lat: number, lng: number} = {username: 'anon', lat: -70.00, lng: 40.00}
  bSalesLoaded: boolean = false;
  loadMarkerSet: boolean = true;
  bHasMapLoaded: boolean = false;
  circleRadius: number; // in miles
  gmap: GoogleMapsAPIWrapper;

  username: string;
  usersale: ISale[];
  bFindUserNameCheck  : boolean = false;
  bFindUserSaleCheck  : boolean = false;

  bLoadAll:boolean = false;

  constructor(
  public navCtrl: NavController, 
  private salesService: SalesServiceProvider,
  private userService: UserServiceProvider) 
  { 
    this.mapCenter = {lat: -74.01, lng: 40.00};
  }


  ionViewDidLoad(){
    this.getUserLocation()
    this.circleRadius = 6;
    this.login();
  }


  login(){
    this.userService.getUsername().then((name) => {
      let bDoesUserExist = this.userService.doesUserExist(name);
      console.log("DOES THE USER EXIST: " + bDoesUserExist);
      if(!bDoesUserExist){
        console.log("CREATING USER... ");
        this.createUser();
      }else{
        this.username = name;
        this.bFindUserNameCheck = true;
        // this.findActiveSalesForUser(this.username)
      }

      console.log(this.username);
 
    });
  }

  createUser(){
    this.userService.createUser().subscribe(data => { 
      try {
        let username = this.userService.createUserCallBack(data)
        if (username !== false){
          this.username = username
          console.log("this.username ===> " + this.username);
          this.bFindUserNameCheck = true;
        }
        
      } catch (error) {
        console.log(error);
      }
    }, error => {
      console.log(error);
    });
  }


  // findActiveSalesForUser(username){
  //   this.userService.getSaleByUsername(username).subscribe(data => {
  //     try {
  //       this.usersale = this.userService.getSaleByUsernameCallBack(data);
  //       console.log('USER SALE: ==> ')
  //       console.log(this.usersale)
  //       this.bFindUserSaleCheck = true;
  //       this.sales.push({ distance: 0.00, lat: (Number)(this.usersale.lat), lng: (Number)(this.usersale.lng), title: this.usersale.title, username: this.usersale.username });
  //       // this.addPin();
  //       this.bLoadAll = true;
  //     } catch (error) {
  //       console.log(error)
  //     }

  //   }, error => {
  //     console.log(error);
  //   });
  // }

  onMapReady(map: GoogleMapsAPIWrapper){
    this.gmap = map;
    this.bHasMapLoaded = true;
  }

  getUserLocation() {
    this.userService.getUserLocation().then((position) => {
        this.geolocationCallBack(position)
    })
    .catch((error) => {
      console.log('Error getting location', error);
    },
    );
  }


  geolocationCallBack(pos) {
    console.log('home.ts geolocationCallBack()')
    this.mapCenter = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }
    this.user.lat = pos.coords.latitude
    this.user.lng = pos.coords.longitude
    

    this.getSales();
  }

  getSales(){
    console.log('getSales2 start')
    let location = { lat: this.user.lat, lng: this.user.lng}
    this.salesService.getSales(location, this.circleRadius).subscribe(data => {
      let allsales = this.salesService.getSalesCallBack(data, this.username);
      this.sales = allsales.sales;
      this.usersale = allsales.usersale;

      console.log('ALLSALES')
      console.log(allsales)

      console.log(this.sales)
      console.log(this.usersale)
      this.bSalesLoaded = true;
      this.bLoadAll = true;
    }, error => {
      console.log(error);
    });
  }



  addPin(){
    this.loadMarkerSet = !this.loadMarkerSet;
    console.log(this.username)

    
  }


}
