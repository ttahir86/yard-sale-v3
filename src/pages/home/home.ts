import { GoogleMapsAPIWrapper } from '@agm/core';
import { SalesServiceProvider } from './../../providers/sales-service/sales-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapCenter: {lat: number, lng: number}
  sales: {title: string, distance: number, lat: number, lng: number}[] = [];
  user: {username?: string, lat: number, lng: number} = {username: 'anon', lat: -70.00, lng: 40.00}
  bSalesLoaded: boolean = false;
  loadMarkerSet: boolean = true;
  bHasMapLoaded: boolean = false;
  circleRadius: number; // in miles
  gmap: GoogleMapsAPIWrapper;

  constructor(public navCtrl: NavController, private geo: Geolocation, private http: Http, private salesService: SalesServiceProvider) {
    this.mapCenter = {lat: -74.01, lng: 40.00};
  }


  ionViewDidLoad(){
    this.getUsersLocation()
    this.circleRadius = 6;
   
  }

  onMapReady(map: GoogleMapsAPIWrapper){
    this.gmap = map;
    this.bHasMapLoaded = true;
  }

  getUsersLocation() {
    console.log('home.ts getUsersLocation()')
    let GPSoptions = { enableHighAccuracy: true, maximumAge: 0 };
    this.geo.getCurrentPosition(GPSoptions)
      .then((position) => {
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
      this.sales = this.salesService.getSalesCallBack(data);
      this.bSalesLoaded = true;
    }, error => {
      console.log(error);
    });
  }



  toggleSales(){
    this.loadMarkerSet = !this.loadMarkerSet;
    this.sales.push({ distance: 5.79, lat: 40.30314, lng: -74.67605, title: '' });
  }


}
