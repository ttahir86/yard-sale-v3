import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ISale } from '../../providers/sales-service/sales.model';
import { Slides } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {}


  selectedImageIndex: number = 0;


  images: string[] = ['../../assets/imgs/whalesale.png','../../assets/imgs/whalesale-sign.png'];

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhalesalePage');
    this.sale = this.navParams.get('sale');
    console.log(this.sale)
    this.bLoaded = true;
    this.bIsOpen = this.isOpen();
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

  isOpen(){
    let saleStartTime = this.sale.startTime;
    let currentDate = new Date();
    console.log('saleStartTime: ' + saleStartTime)
    let h = currentDate.getHours(); // => 9
    let m = currentDate.getMinutes(); // =>  30
    let s = currentDate.getSeconds();
    let currentTime = h + ":" + m + ":" + s
    
    console.log('currentTime: ' + currentTime)
    
    let bIsSaleTimeOpen = false;
    if (currentTime >= saleStartTime ){
      console.log('open')
      bIsSaleTimeOpen = true;
    }




    let saleDate = this.sale.startDate;

    console.log("current Date: " + this.getCurrentFullDate())
    console.log("sale Date: " + saleDate)
    var d1 = Date.parse(this.getCurrentFullDate());
    var d2 = Date.parse(saleDate);
    if (d1 === d2 && bIsSaleTimeOpen) {
        return true;
    }else if (d1 <= d2){
      return 'opening';
    }

    return false;


  }


  private getCurrentFullDate() {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    dd = dd < 10 ? '0' + dd : dd;
    mm = mm < 10 ? '0' + mm : mm;

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

}
