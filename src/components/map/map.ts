import { SaleCardsComponent } from './../sale-cards/sale-cards';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMap, Marker, MarkerOptions, MapOptions, InfoWindow, Polyline } from "@agm/core/services/google-maps-types";
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
  sales2: any = [{ distance: 5.79, lat: 40.20304, lng: -74.67599, title: '' }];
 
  @Input() mapCenter: {lat: number, lng: number};
  @Input() sales: {title: string, distance: number, lat: number, lng: number}[];
  @Input() circleRadius: number;
  @Input() loadMarkerSet: boolean;
  @Output() onLoadMapEvent: EventEmitter<any> = new EventEmitter<any>();
  gmap: GoogleMapsAPIWrapper;
  radius: number;


  
  constructor() {
    console.log('Hello MapComponent Component');
  }

  ngOnInit() {
    this.sales2 = [{ distance: 5.79, lat: 40.20304, lng: -74.67599, title: '' }];
    this.radius = (1609.34 * this.circleRadius)

  }
  protected onMapReady(map:GoogleMapsAPIWrapper) {
    this.gmap = map;
    this.onLoadMapEvent.emit(this);
  }


  public centerMap(sale) {
    if (this.gmap)
      this.gmap.panTo({ lat: sale.lat, lng: sale.lng });
  }



}
