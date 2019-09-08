import {Component} from '@angular/core';

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
 * Generated class for the YtdOrderssPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ytd-orderss',
  templateUrl: 'ytd-orderss.html',
})
export class YtdOrderssPage {
orderlist:any=[];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
     private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
              private dbs:DatabaseService,
              public loadingCtrl: LoadingController
  ) {
    this.getorders();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YtdOrderssPage');
  }

  details() {
    this.navCtrl.push('YtdOrderssBusinessDetailsPage')
  }

  getorders()
  {
    let base=this;
    base.dbs.getBuyerOrder(localStorage.getItem('uid')).then(res=>{
    base.orderlist=res;
    console.log('---XXX---',base.orderlist);
    });
  }
}
