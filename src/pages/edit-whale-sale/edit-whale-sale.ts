import { ISale } from './../../providers/sales-service/sales.model';
import { Http } from '@angular/http';
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
  username: string = 'anon';
  usersale: ISale = {owner : '', title : '', description: '', startDate: '', lat: 0, lng: 0, distance: 0};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
  private loadingCtrl: LoadingController, private toastCtrl: ToastController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditWhaleSalePage');
    console.log(this.navParams.get('user'));
    this.usersale = this.navParams.get('user');
    this.username = this.navParams.get('user').owner;
    this.form.title = this.usersale.title;
    this.form.description = this.usersale.description;
    this.form.startDate = this.usersale.startDate;

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

  closeSale(){
    let link = "https://talaltahir.com/local-messages-api/delete-whale-sale.php";
    console.log("USERNAME:");
    console.log(this.username);
    this.http.post(link, { username: this.username} ).subscribe(data => {
      try {

        console.log(this.username)

        console.log(data["_body"]);

        this.presentLoadingSpinner();

        this.closeModal();
      } catch (error) {
        console.log(data);
        console.log(error);
        // this.presentToastFailure();


      }
    }, error => {
      // this.presentToastFailure();
      console.log(error);
    });
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
