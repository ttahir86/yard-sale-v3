import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ISale } from '../../providers/sales-service/sales.model';
import { Slides } from 'ionic-angular';
import { SalesServiceProvider } from '../../providers/sales-service/sales-service';
/**
 * Generated class for the WhalesalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-whalesale',
  templateUrl: 'whalesale.html',
})


export class WhalesalePage {
  bLoaded: boolean = false;
  sale: ISale = {owner :'', title: '', distance: 0, lat: 0, lng: 0, startDate: ''};
  @ViewChild(Slides) slides: Slides;
  bIsOpen: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private salesService: SalesServiceProvider, private viewCtrl: ViewController) {}


  selectedImageIndex: number = 0;


  images: string[] = ['../../assets/imgs/whalesale.png','../../assets/imgs/whalesale-sign.png'];

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhalesalePage');
    this.sale = this.navParams.get('sale');
    console.log(this.sale)
    this.bLoaded = true;
    this.bIsOpen = this.salesService.isOpen(this.sale);
    console.log('isOpen: ' + this.bIsOpen)
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }

  contactSeller(){
    
  }

  onThumbnailClick(selectedImageIndex: number){
    console.log("thumbnail click" + selectedImageIndex)
    this.selectedImageIndex = selectedImageIndex;
    let currentSlide = this.slides.getActiveIndex();
    if (selectedImageIndex === 1 && currentSlide === 0){
      this.slides.slideNext();
    } else if (selectedImageIndex === 0 && currentSlide === 1){
      this.slides.slidePrev();
    }
    
  }


  slideChanged(){
    let currentSlide = this.slides.getActiveIndex();
    if (currentSlide >= this.images.length){
      this.selectedImageIndex = 1;
    }else{
      this.selectedImageIndex = currentSlide;
    }
  }

  

}
