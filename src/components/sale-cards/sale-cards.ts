import { MapComponent } from './../map/map';
import { Component, Input, ViewChild } from '@angular/core';
import { Slides, ModalController } from 'ionic-angular';
import { ISale } from '../../providers/sales-service/sales.model'
import { WhalesalePage } from '../../pages/whalesale/whalesale';

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

  @Input() sales: ISale[] = [];
  @Input() usersale: ISale[] = [];
  @ViewChild(Slides) slides: Slides;
  @Input() map: MapComponent
  bisLastSlide: boolean = false;
  
  constructor(private modalCtrl: ModalController) {
    console.log('Hello SaleCardsComponent Component');
  }


  slideChanged() {
    // if the user has no sale active, then we don't need to account for userale
    console.log(this.sales)
    let currentIndex = this.slides.getActiveIndex();
    console.log("current index: " + currentIndex)
    console.log("sale length: " + this.sales.length)
    if (this.usersale == undefined || this.usersale.length == 0 || this.usersale == []){
      console.log('yeah, undefined')
      if (currentIndex >= this.sales.length) {
        currentIndex = this.sales.length - 1
      }
      this.map.centerMap(this.sales[currentIndex]);
    }else{
      console.log(currentIndex)
      if(currentIndex == 0){
        console.log("current index = 0")
        this.map.centerMap(this.usersale[0])
        
      }else if (currentIndex >= this.sales.length + 1){
        console.log(this.sales[currentIndex - 2])
        this.map.centerMap(this.sales[currentIndex - 2])
      }else{
        console.log(this.sales[currentIndex - 1])
        this.map.centerMap(this.sales[currentIndex - 1])
      }
    }
    console.log('after check')

    // if (currentIndex >= this.sales.length - 1){
    //   this.bisLastSlide = true;
    // }else{
    //   this.bisLastSlide = false;
    // }
    
  }


  openWhaleSalePage(sale){
    let modalPage = this.modalCtrl.create(WhalesalePage, {sale: sale});

    modalPage.present();
  }

}
