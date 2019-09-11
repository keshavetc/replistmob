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
 * Generated class for the YtdrepOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ytdrep-orders',
  templateUrl: 'ytdrep-orders.html',
})
export class YtdrepOrdersPage {
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
    console.log('ionViewDidLoad YtdrepOrdersPage');
  }


  details(itm) {
    this.navCtrl.push('YtdOrderssBusinessDetailsPage',{itm:itm})
  }

buyers:any=[];
  getorders()
  {
    let base=this;
    base.dbs.getRepOrder(localStorage.getItem('uid')).then(res=>{
   var orderlist:any=[];
   orderlist=res;
   base.orderlist=[];
    orderlist.forEach(element => {
     
        base.getreporders(element.data.buyer,element.id)
     
      
    });
   
    });
  }




  getreporders(id,itemid)
  {
    let base=this;
    base.dbs.fetchorderlist(id).then(res=>{
    
    var rs:any=[];
    rs=res;
    rs.forEach(elementx => {
     var itms:any=[];
     itms=elementx.data.itemsis;
     itms.forEach(element => {
       if(element==itemid)
       base.orderlist.push(elementx);
     });
     
    });
  

   
    });
  }


  
  filterunique()
  {
    let base=this;
    base.orderlist=base.orderlist.filter(base.dbs.onlyUnique);
    console.log('---XXX---',base.orderlist);
  }
}
