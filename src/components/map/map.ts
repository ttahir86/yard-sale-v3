import { SaleCardsComponent } from './../sale-cards/sale-cards';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMap, Marker, MarkerOptions, MapOptions, InfoWindow, Polyline } from "@agm/core/services/google-maps-types";
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ISale } from '../../providers/sales-service/sales.model';
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {
 
  @Input() mapCenter: {lat: number, lng: number};
  @Input() sales: {title: string, distance: number, lat: number, lng: number}[];
  @Input() usersale: ISale[] = [{owner: '', title: '', distance: 0.0, lat: 0, lng: 0}];
  @Input() circleRadius: number;
  @Input() loadMarkerSet: boolean;
  @Output() onLoadMapEvent: EventEmitter<any> = new EventEmitter<any>();
  gmap: GoogleMapsAPIWrapper;
  radius: number;
  icons: any =
    
      {  
        url: './assets/imgs/yard-sale-pin.gif',
        scaledSize: {
        height: 40,
        width: 40},
      }

      iconuser: any =
    
      {  
        url: './assets/imgs/yard-sale-pin.gif',
        scaledSize: {
        height: 45,
        width: 45},
      }

      iconWhale: any =
    
      {  
        url: './assets/imgs/sale-sign.png',
        scaledSize: {
        height: 40,
        width: 40},
      }
      
      

  
  constructor() {
    console.log('Hello MapComponent Component');
  }



  ngOnInit() {
    this.radius = (1609.34 * this.circleRadius)
    console.log('USERSALE IN MAP.TS')
    console.log(this.usersale)
    console.log(this.sales)
   
  }
  protected onMapReady(map:GoogleMapsAPIWrapper) {
    this.gmap = map;
    this.onLoadMapEvent.emit(this);
  }


  public centerMap(sale: ISale) {
    if (this.gmap)
      this.gmap.panTo({ lat: sale.lat, lng: sale.lng });
  }



}
