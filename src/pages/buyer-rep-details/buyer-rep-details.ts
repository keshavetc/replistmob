import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
 * Generated class for the BuyerRepDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-rep-details',
  templateUrl: 'buyer-rep-details.html',
})
export class BuyerRepDetailsPage {
rep:any;
repbuyerdata:any=[];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
     private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
              private dbs:DatabaseService,
              public loadingCtrl: LoadingController

     ) {
   this.rep= this.navParams.get('data');
   this.grtrepitems(this.rep.id);
   console.log(this.rep);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerRepDetailsPage');
  }

  details(datay) {
    console.log(datay);
    this.navCtrl.push('BuyerFoodDetailsPage',{datax:datay})
  }

  
  grtrepitems(uid)
  {


    /*
createdon: "9/6/2019, 9:27:27 AM"
description: "xzcxzczxcz"
name: "czxczxc"
pic: "https://firebasestorage.googleapis.com/v0/b/replist-c3017.appspot.com/o/images%2Ffeedback_redlines_9_6_2019__9_26_22_AM.png?alt=media&token=9f888b57-30ff-4123-b947-9a06ebb9d593"
price: "12"
size: "12"
uid: "satishpadnani@icloud.com"
    */
    let base=this;
    base.dbs.getuseritem(uid).then(data=>{
      console.log('---res---',data);
      var dta:any=[];
      dta=data;
      base.repbuyerdata=[];
      dta.forEach(element => {
        base.repbuyerdata.push(element);
      });
      console.log('---Data---',base.repbuyerdata);

    });
  }
}
