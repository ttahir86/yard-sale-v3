import { GoogleMapsAPIWrapper } from '@agm/core';
import { SalesServiceProvider, ISale } from './../../providers/sales-service/sales-service';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { IonPullUpFooterState } from 'ionic-pullup';
import { CreateWhaleSalePage } from '../create-whale-sale/create-whale-sale';


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

  allSales : {usersale: ISale[], sales: ISale[]};

  username: string;
  usersale: ISale[];
  bFindUserNameCheck  : boolean = false;
  bFindUserSaleCheck  : boolean = false;

  bLoadAll:boolean = false;

  footerState: IonPullUpFooterState;


  constructor(
  public navCtrl: NavController, 
  private salesService: SalesServiceProvider,
  private userService: UserServiceProvider,
  private modalCtrl: ModalController) 
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
    
    console.log(this.mapCenter)
    this.getSales();
  }

  getSales(){
    console.log('getSales2 start')
    let location = { lat: this.user.lat, lng: this.user.lng}
    this.salesService.getSales(location, this.circleRadius).subscribe(data => {
      this.allSales = this.salesService.getSalesCallBack(data, this.username);
      this.sales = this.allSales.sales;
      this.usersale = this.allSales.usersale;

      console.log('ALLSALES')
      console.log(this.allSales)

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

  onMapReady(map: GoogleMapsAPIWrapper){
    this.gmap = map;
    this.bHasMapLoaded = true;
  }


  openModal() {
    
    let modalPage = this.modalCtrl.create(CreateWhaleSalePage);
   
    modalPage.present();
  }




  footerExpanded() {
    console.log('Footer expanded!');
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }


}
