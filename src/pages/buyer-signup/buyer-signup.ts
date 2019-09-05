import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import * as firebase from 'firebase';
import {Buyer} from "../../models/buyer";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast";
import {CameraService} from "../../services/camera";

/**
 * Generated class for the BuyerSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-signup',
  templateUrl: 'buyer-signup.html',
})
export class BuyerSignupPage {

  camera_options: CameraOptions = {
    // Some common settings are 20, 50, and 100
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    // In this app, dynamically set the picture source, Camera or photo gallery
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true  //Corrects Android orientation quirks
  };
  gallery_options: CameraOptions = {
    // Some common settings are 20, 50, and 100
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    // In this app, dynamically set the picture source, Camera or photo gallery
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true  //Corrects Android orientation quirks
  };
  buyer = {
    name: '',
    department: '',
    position: '',
    contactno: '',
    profilepic: ''
  };
  real_buyer: Buyer;
  name: FormControl;
  position: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private cameraplay: CameraService, private camera: Camera, private toasts: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerSignupPage');
  }

  signup2() {
    this.real_buyer = (this.buyer as any);
    if (this.real_buyer.contactno.toString().length == 10) {
      this.navCtrl.push('BuyerSignup2Page', {'buyer': this.real_buyer});
    } else {
      this.toasts.presentSimpleToast('Please Fill Details with Proper Length', 3000);
    }
  }

  onAddProfilePicClick() {
    this.cameraplay.presentChooseOption().then((data:string) => {
      this.buyer.profilepic = data;
    });
  }
}
