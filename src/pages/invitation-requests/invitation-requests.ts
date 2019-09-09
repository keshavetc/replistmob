import { Component } from '@angular/core';
import * as firebase from 'firebase';
import {Buyer} from "../../models/buyer";
import {AuthService} from "../../services/auth";
import {Rep} from "../../models/rep";

import {DatabaseService} from "../../services/database";


import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import { RepAddItem } from "../../models/repadditem";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast";
import {CameraService} from "../../services/camera";
import { Observable } from 'rxjs';
import { LoadingController } from 'ionic-angular';


const storageService = firebase.storage();
const storageRef = storageService.ref();

/**
 * Generated class for the InvitationRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitation-requests',
  templateUrl: 'invitation-requests.html',
})
export class InvitationRequestsPage {
  buyers: Buyer[] = [];
  rep: Rep;

 user:any;
 repbuyerdata:any=[];
 str:any;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
    private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
             private dbs:DatabaseService,
             public loadingCtrl: LoadingController
  ) {
    this.user=navParams.get('role');
    if(this.user=="rep")
    {
      this.grtrequest();

    }
    else
    {
      this.grtrequest();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationRequestsPage');
  }

  grtrequest()
  {
    let base=this;
    base.dbs.presentLoadingDefault();
    base.dbs.getFriendsRequest(localStorage.getItem('uid')).then(data=>{
      var res:any=[];
      res=data;
      base.repbuyerdata=[];
     res.forEach(element => {
     
      base.dbs.getUserById(element.data.from).then(dat=>{
        var x:any=[];
        x=dat[0];    
        base.repbuyerdata.push({id:element.id,data:x.data});
      });
     });
     base.dbs.loadingdismiss();
    });
  }


  remove(dt)
 {

   let base=this;
   base.dbs.removeFriends(localStorage.getItem('uid'),dt.id).then(dt=>{
     base.grtrequest();
   })


 }


 accept(dtx)
 {

   let base=this;
   base.dbs.acceptFriends(localStorage.getItem('uid'),dtx.id).then(dt1=>{
    console.log(localStorage.getItem('uid'),dtx.id);
    base.dbs.getFriendsRequestx(dtx.data.email,localStorage.getItem('uid')).then(data=>{
      var res:any=[];
      res=data;
 
     res.forEach(element => {

      
      base.dbs.acceptFriends(dtx.data.email,element.id).then(dt=>{
        base.grtrequest();
      })
       
     });
    });
    
   })


 }

}
