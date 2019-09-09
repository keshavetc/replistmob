import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Rep} from "../../models/rep";
import { OnInit} from '@angular/core';
import {ActionSheetController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import * as firebase from 'firebase';
import { RepAddItem } from "../../models/repadditem";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast";
import {CameraService} from "../../services/camera";
import { Observable } from 'rxjs';
import {DatabaseService} from "../../services/database";
import { LoadingController } from 'ionic-angular';


const storageService = firebase.storage();
const storageRef = storageService.ref();

/**
 * Generated class for the RepFriendsProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-friends-profile',
  templateUrl: 'rep-friends-profile.html',
})
export class RepFriendsProfilePage {

  user:any;
  repbuyerdata:any=[];
  str:any;
 


  constructor(
    public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
    private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
             private dbs:DatabaseService,
             public loadingCtrl: LoadingController
   ) {
      this.user=navParams.get('friend');

      console.log('friends=',this.user);


      /*

address: "A82Noida"
city: "Noida"
closedtime: "2"
companylogo: ""
companyname: "Hash"
companywebsite: ""
contactno: "7487094812"
email: "satishpadnani@icloud.com"
experience: "4"
fax: "1234567890"
name: "Satish"
opentime: "13"
password: "satish123"
phone: "7487094812"
pic: ""
role: "rep"
street: "A82"
taxid: "12345"
typeofbusiness: "IT Section"
weekend: "friday"
weekstart: "Wednesday"
      */
     
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepFriendsProfilePage');
  }

  recommend(user) {
    this.navCtrl.push('SharecontactPage',{shared:user})
  }

  
}
