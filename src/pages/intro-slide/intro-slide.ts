import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the IntroSlidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-intro-slide',
  templateUrl: 'intro-slide.html',
})


export class IntroSlidePage {

  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroSlidePage');

    this.storage.set('newuser', 'false');
  }

  slideChanged(){

  }


  closeModal(){
    this.viewCtrl.dismiss();

  }

}
