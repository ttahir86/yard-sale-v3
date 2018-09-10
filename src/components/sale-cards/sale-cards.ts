import { MapComponent } from './../map/map';
import { Component, Input, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the SaleCardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sale-cards',
  templateUrl: 'sale-cards.html'
})
export class SaleCardsComponent{

  @Input() sales: { title: string, distance: number, lat: number, lng: number }[] = [];
  @ViewChild(Slides) slides: Slides;
  @Input() map: MapComponent
  
  constructor() {
    console.log('Hello SaleCardsComponent Component');
  }


  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex >= this.sales.length) {
      currentIndex = this.sales.length - 1
    }
    this.map.centerMap(this.sales[currentIndex]);
  }

}
