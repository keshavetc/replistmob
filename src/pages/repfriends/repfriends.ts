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
 * Generated class for the RepfriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repfriends',
  templateUrl: 'repfriends.html',
})
export class RepfriendsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
   public actionSheetCtrl: ActionSheetController,
    private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
             private dbs:DatabaseService,
             public loadingCtrl: LoadingController
  ) {
    this.getfriends();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepfriendsPage');
  }

  getfriends()
  {
    let base=this;
    base.dbs.getAcceptedFriends(localStorage.getItem('uid')).then(data=>{
      console.log('---Friends---',data);
    });
  }

}
