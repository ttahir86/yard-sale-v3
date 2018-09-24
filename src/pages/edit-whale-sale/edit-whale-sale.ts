import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the EditWhaleSalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-whale-sale',
  templateUrl: 'edit-whale-sale.html',
})
export class EditWhaleSalePage {

  form:any ={title: '', description: '', image: '', endtime: ''}
  toastTime : number = 2000;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
  private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditWhaleSalePage');
  }
  private closeModal() {
    this.viewCtrl.dismiss();
  }

  logForm(){
    console.log(this.form);
    this.closeModal();

    this.presentLoadingSpinner();
    
  }

  onTimePickerChange(){
    
  }





  presentLoadingSpinner() {
    let spinner = this.loadingCtrl.create({
      content: 'Saving changes...'
    });

    spinner.present();


    setTimeout(() => {
      spinner.dismiss();this.presentToastSuccess();
    }, this.toastTime);

  }
  presentToastSuccess() {
    let toast = this.toastCtrl.create({
      message: 'Changes Saved!',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
