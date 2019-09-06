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
 * Generated class for the RepBuyersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-buyers',
  templateUrl: 'rep-buyers.html',
})
export class RepBuyersPage {
repbuyerdata:any=[];
str:any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
     private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
              private dbs:DatabaseService,
              public loadingCtrl: LoadingController
     ) {
      this.grtbuyer();
  }

  grtbuyer()
  {



    /*

address: "New Delhi"
business: "Suiting & shirting"
businesscontact: 8798653243
closedtime: "5PM"
companylogo: "https://firebasestorage.googleapis.com/v0/b/replist-c3017.appspot.com/o/businesslogo%2Ftiwari1%40gmail.com?alt=media&token=5961a37a-d7e0-44cd-b448-fdbdd47ccb74"
contactno: 9867543221
date: Timestamp {seconds: 1562697000, nanoseconds: 0}
department: "Sell"
email: "tiwari1@gmail.com"
experience: "5"
fax: "9832654871"
name: "tiwari"
opentime: "10AM"
position: "BDM"
profilepic: "https://firebasestorage.googleapis.com/v0/b/replist-c3017.appspot.com/o/businesslogo%2Ftiwari1%40gmail.com?alt=media&token=428cf221-bce5-4e8c-a638-daa3c12c7188"
role: "buyer"
taxid: "1000"
typeofbusiness: "software"
weekend: "sunday"
weekstart: "tuesday"
    */
    // getrepbuyer()
    let base=this;
    base.dbs.presentLoadingDefault();
    base.dbs.getrepbuyer().then(data=>{
      var dta:any=[];
      dta=data;
      base.repbuyerdata=[];
      dta.forEach(element => {
        base.repbuyerdata.push(element);
      });

// base.repbuyerdata.push({
//   Img:dt.data.profilepic,
// BusinessName:dt.data.business,
// Address:dt.data.address,
// Phone:dt.data.contactno
// });
//console.log(base.repbuyerdata);
base.dbs.loadingdismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepBuyersPage');
  }

  details(dt) {
    this.navCtrl.push('RepBusinessDetailsPage',{data:dt})
  }

  search()
  {
  
let base=this;
//base.dbs.presentLoadingDefault();
if(base.str)
{
  base.dbs.searchrepbuyer(base.str).then(data=>{
  
    var dta:any=[];
    dta=data;
    base.repbuyerdata=[];
    if(dta.length==0)
    {
      base.dbs.searchrepbuyer1(base.str).then(data=>{
  
        var dta:any=[];
        dta=data;
        base.repbuyerdata=[];
        if(dta.length==0)
        {
          base.dbs.searchrepbuyer2(base.str).then(data=>{
  
            var dta:any=[];
            dta=data;
            base.repbuyerdata=[];
             dta.forEach(element => {
              base.repbuyerdata.push(element);
            });
          },(err)=>{
            console.log('===err===',err);
           // base.dbs.loadingdismiss();
          });
        }
        else
        {
          dta.forEach(element => {
            base.repbuyerdata.push(element);
          });
        }
      
      },(err)=>{
        console.log('===err===',err);
       // base.dbs.loadingdismiss();
      });
    }
    else
        {
          dta.forEach(element => {
            base.repbuyerdata.push(element);
          });
        }
  },(err)=>{
    console.log('===err===',err);
   // base.dbs.loadingdismiss();
  });
}
else
{
  this.grtbuyer();
}

  }
}
