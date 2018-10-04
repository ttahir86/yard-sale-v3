import { FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { ISale } from './../../providers/sales-service/sales.model';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { SalesServiceProvider } from '../../providers/sales-service/sales-service';

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

  form:any ={title: '', description: '', image: ''}
  toastTime : number = 2000;
  username: string = 'anon';
  usersale: ISale = {owner : '', title : '', description: '', startDate: '', lat: 0, lng: 0, distance: 0};
  bDisableSaveButton : boolean = false;
  public img0: string = "";
  public img1: string = "";

  exitType = {'cancel': 0, 'end' : 1, 'save' : 2};



  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController, 
    private http: Http, 
    private sales: SalesServiceProvider,
    private camera: Camera,
    private transfer: FileTransfer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditWhaleSalePage');
    console.log(this.navParams.get('user'));
    this.usersale = this.navParams.get('user');
    this.username = this.navParams.get('user').owner;
    this.form.title = this.usersale.title;
    this.form.description = this.usersale.description;
    this.form.startDate = this.usersale.startDate;
    this.form.startTime = this.usersale.startTime;


  }
  private closeModal(exitType = this.exitType.cancel) {
    this.viewCtrl.dismiss(exitType);
  }

  logForm(){
    console.log(this.form);
    let post = {title: this.form.title, description: this.form.description, owner: this.username}
    this.sales.editSale(post).subscribe(data => { 
      try {
          this.sales.editSaleCallBack(data)
        
        
      } catch (error) {
        console.log(error);
      }
    }, error => {
      console.log(error);
    });
    this.closeModal(this.exitType.save);

    

    this.presentLoadingSpinner();
    
  }

  onTimePickerChange(){
    console.log(this.form.startTime);
    console.log(this.form.endTime);

    if ( (this.form.startTime != undefined && this.form.endTime != undefined) && (this.form.endTime <= this.form.startTime)){
      this.bDisableSaveButton = true;
    }else{
      this.bDisableSaveButton = false;
    }

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

        this.closeModal(this.exitType.end);
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


  private presentConfirm() {
  
    let alert = this.alertCtrl.create({
      title: 'Close Whalesale',
      message: '<div>Are you sure you want to close your sale?</div>',
      cssClass: 'alert-close-sale',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Close Sale',
          handler: () => {
            console.log('Start clicked');
            this.closeSale();

          }
        }
      ]
    });
    alert.present();
  }




  takePicture(imgIndex : number) {
    console.log("takePicture() start()");
    console.log("imgIndex: " + imgIndex);
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      if(imgIndex == 0){
        this.img0 = "data:image/jpeg;base64," + imageData;
        alert(imageData)
        alert(this.img0)
        this.upload(this.img0);
      }else{
        this.img1 = "data:image/jpeg;base64," + imageData;
        alert(imageData)
        alert(this.img1)
        this.upload(this.img1)
        
      }
    }, (err) => {
      console.log(err);
      
    });
  }

  upload(localImgPath) {
    console.log('uploading Image...')
    alert('upload() start')
    alert('localImgPath: ' + JSON.stringify(localImgPath))
    let fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'img.jpg',
      headers: {}
    }
    console.log('file upload')
    fileTransfer.upload(localImgPath, 'https://talaltahir.com/local-messages-api/upload-image.php', options)
      .then((data) => {
        console.log('upload image success')
        alert('success promise response: ' + JSON.stringify(data))
      }, (err) => {
        console.log('upload image failure')
        alert('error on promise return: ' + err)
      })
  }






}
