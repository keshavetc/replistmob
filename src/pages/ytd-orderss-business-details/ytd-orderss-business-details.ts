import { Component } from '@angular/core';

import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
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
 * Generated class for the YtdOrderssBusinessDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ytd-orderss-business-details',
  templateUrl: 'ytd-orderss-business-details.html',
})
export class YtdOrderssBusinessDetailsPage {
orders:any;
itemsis:any=[];
items:any=[];
total=0;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
    private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
             private dbs:DatabaseService,
             public loadingCtrl: LoadingController
  ) {
this.orders=navParams.get('itm');
console.log(this.orders);
this.itemsis=this.orders.data.itemsis;

this.getitems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YtdOrderssBusinessDetailsPage');
  }
  getitems()
  {
let base=this;


base.itemsis.forEach(element => {
  base.dbs.fetchsoldoutbyid(element).then(res=>{
    var rs:any=res;
  base.items.push(res);
base.total=base.total+(rs.quantity*rs.price)
  console.log(res);
  });
});



  }

}
