import { Component } from '@angular/core';
import {Rep} from "../../models/rep";
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
 * Generated class for the RepWelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-welcome',
  templateUrl: 'rep-welcome.html',
})
export class RepWelcomePage {
  rep:any
  user:any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
     private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
              private dbs:DatabaseService,
              public loadingCtrl: LoadingController
  ) {
   this.rep = (this.navParams.get('user') as any) || JSON.parse(localStorage.getItem('user'));
    this.getUser();
    console.log('<<<--->>>');
  }

  ionViewWillEnter(){
    //calling an API
    this.getUser();
    console.log('<<<--->>>');
    
    }

  ionViewDidLoad() {
    this.getUser();
    console.log('ionViewDidLoad RepWelcomePage');
  }

  buyers() {
    this.navCtrl.push('RepBuyersPage')
  }

  ytd() {
    this.navCtrl.push('YtdrepOrdersPage')
  }

  search() {
    this.navCtrl.push('RepSearchPage')
  }

  addbuyers() {
    this.navCtrl.push('AddbuyersPage',{'role':'rep'})
  }

  email() {
    this.navCtrl.push('BlastemailPage',{'user':this.rep})
  }

  profile() {
    this.navCtrl.push('ProfilePage',{'user':this.rep,'role':'rep'});
  }

  additem() {
    
    this.navCtrl.push('RepAddItemPage',{'user':this.rep});
  }

  repshared() {
    this.navCtrl.push('RepSharedBuyersPage')
  }

  friends() {
    this.navCtrl.push('RepFriendsPage',{'role':'rep'});
  }

  request() {
    this.navCtrl.push('InvitationRequestsPage',{'role':'rep'})
  }
  getUser(){
    this.dbs.getuserbyid(localStorage.getItem('uid')).then(resp=>{
      var rst:any=resp;
      this.rep=rst;
      localStorage.setItem('user',JSON.stringify(rst));
      //console.log(this.rep);
     // this.getUser();
    });
  }
}
