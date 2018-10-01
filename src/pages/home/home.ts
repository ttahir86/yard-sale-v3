import { WhalesalePage } from './../whalesale/whalesale';
import { MapComponent } from './../../components/map/map';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { SalesServiceProvider } from './../../providers/sales-service/sales-service';
import { ISale } from './../../providers/sales-service/sales.model';
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { IonPullUpFooterState } from 'ionic-pullup';
import { CreateWhaleSalePage } from '../create-whale-sale/create-whale-sale';
import { Storage } from '@ionic/storage';
import { IntroSlidePage } from '../intro-slide/intro-slide';
import { EditWhaleSalePage } from '../edit-whale-sale/edit-whale-sale';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapListToggle: any;

  mapCenter: {lat: number, lng: number}
  sales: ISale[] = [];
  // sales2 : ISale2[] = [];
  user: {username?: string, lat: number, lng: number} = {username: 'anon', lat: -70.00, lng: 40.00}
  bSalesLoaded: boolean = false;
  loadMarkerSet: boolean = true;
  bHasMapLoaded: boolean = false;
  circleRadius: number; // in miles
  gmap: GoogleMapsAPIWrapper;
  @ViewChild('map') map: MapComponent;

  allSales : {usersale: ISale[], sales: ISale[]};

  username: string;
  usersale: ISale[];
  bFindUserNameCheck  : boolean = false;
  bFindUserSaleCheck  : boolean = false;

  bLoadAll:boolean = false;
  bLocationHasLoaded: boolean = false;

  footerState: IonPullUpFooterState;

  bDoesUserHaveActiveSale: boolean = false;


  constructor(
  public navCtrl: NavController, 
  private salesService: SalesServiceProvider,
  private userService: UserServiceProvider,
  private modalCtrl: ModalController,
  private storage: Storage) 
  { 
    this.mapCenter = {lat: -74.01, lng: 40.00};
  }


  ionViewDidLoad(){
    // this.storage.remove("newuser").then(() => { })
    
    this.storage.get('newuser').then((res) => {this.openSlideCallback(res)});
    // this.storage.remove("newuser").then(() => { })
    


    this.circleRadius = 6;
    this.start();

    


  }

  start(){
    this.login();
  }

  openSlideCallback(res){
    console.log(res);
    if ( res === null){
      this.openIntroSlides();
    }
  }


  openIntroSlides() {
    console.log(this.user)
    let modalPage = this.modalCtrl.create(IntroSlidePage);
    // modalPage.onDidDismiss(returndata => {

    //   try {
    //     console.log('RETURN DATA FROM MODAL: ')
    //     console.log(returndata);
    //     if (returndata == undefined){

    //     }else{
    //       this.addPin();
    //       this.usersale = [returndata];
    //       this.bDoesUserHaveActiveSale = true;
    //     }
      

    //   } catch (error) {
    //     console.log(error)
    //   }
    // });
    modalPage.present();
  }

  editWhaleSale(){
    console.log(this.user)
    let modalPage = this.modalCtrl.create(EditWhaleSalePage, {user: this.usersale[0]});
    modalPage.onDidDismiss(returndata => {

      try {
        console.log('RETURN DATA FROM EDIT WHALE SALE PAGE: ')
        console.log(returndata);
        if (returndata == 1) {
          this.addPin();
          this.usersale = undefined;
          console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
          console.log(this.usersale)
          this.bDoesUserHaveActiveSale = false;

        } else {

        }


      } catch (error) {
        console.log(error)
      }
    });
    modalPage.present();
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
        this.user.username = name;
        this.bFindUserNameCheck = true;

        this.getUserLocation()
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
          this.user.username = username;
        }

        this.getUserLocation()
        
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
    this.bLocationHasLoaded = true;
    this.getSales();
  }

  getSales(){
    console.log('getSales2 start')
    let location = { lat: this.user.lat, lng: this.user.lng}
    this.salesService.getSales(location, this.circleRadius).subscribe(data => {
      this.allSales = this.salesService.getSalesCallBack(data, this.username);
      this.sales = this.allSales.sales;
      if (this.allSales.usersale.length > 0){
        this.usersale = this.allSales.usersale;

        this.bDoesUserHaveActiveSale = true;
      }

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
    console.log(this.user)
    let modalPage = this.modalCtrl.create(CreateWhaleSalePage, {user: this.user});
    modalPage.onDidDismiss(returndata => {

      try {
        console.log('RETURN DATA FROM MODAL: ')
        console.log(returndata);
        if (returndata == undefined){

        }else{
          this.addPin();
          this.usersale = [returndata];
          console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
          console.log(this.usersale)
          this.bDoesUserHaveActiveSale = true;
        }
      

      } catch (error) {
        console.log(error)
      }
    });
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

  centerMap(){
    this.map.center({lat: this.user.lat, lng: this.user.lng})
  }

  openWhaleSale(sale: ISale){

      let modalPage = this.modalCtrl.create(WhalesalePage, { sale: sale });

      modalPage.present();
    
  }


}
