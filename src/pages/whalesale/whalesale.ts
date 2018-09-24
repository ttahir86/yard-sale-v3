import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ISale } from '../../providers/sales-service/sales.model';

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
  sale: ISale = {owner :'', title: '', distance: 0, lat: 0, lng: 0};
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhalesalePage');
    this.sale = this.navParams.get('sale');
    console.log(this.sale)
    this.bLoaded = true;
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }


}
