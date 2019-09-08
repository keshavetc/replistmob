import {Component} from '@angular/core';
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
 * Generated class for the AddbuyersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addbuyers',
  templateUrl: 'addbuyers.html',
})
export class AddbuyersPage {
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
      this.grtbuyer();

    }
    else
    {
      this.grtRep();
    }
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbuyersPage');
  }

  nodata() {
    this.navCtrl.push('RepAddBuyerNofoundPage')
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
        //console.log(element.id,null,localStorage.getItem('uid'));
        base.dbs.getFriends(element.id,null,localStorage.getItem('uid')).then(dt=>{
          var res:any=[];
          res=dt;
          console.log(res);
          if(res.length==0)
          base.repbuyerdata.push(element);
        });
       
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



  grtRep()
  {

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

    let base=this;
    base.dbs.presentLoadingDefault();
    base.repbuyerdata=[];
    base.dbs.getrep().then(data=>{
      var dta:any=[];
      dta=data;
    
      dta.forEach(element => {
        base.dbs.getFriends(element.id,null,localStorage.getItem('uid')).then(dt=>{
          var res:any=[];
          res=dt;
          console.log(res);
          if(res.length==0)
          base.repbuyerdata.push(element);
        });
      });
      console.log('---Data---',base.repbuyerdata);

base.dbs.loadingdismiss();
    });
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

  base.dbs.searchrepbuyer(base.str).then(data1=>{
    
    var dta:any=[];
    dta=data1;
    base.repbuyerdata=[];
   
   
   
          dta.forEach(element => {
            base.dbs.getFriends(element.id,null,localStorage.getItem('uid')).then(dt=>{
              var res:any=[];
              res=dt;
              console.log(res);
              if(res.length==0)
              base.repbuyerdata.push(element);
            });
          });
       
  },(err)=>{
    console.log('===err===',err);
    this.grtbuyer();
  });



}
else
{
  this.grtbuyer();
}

  }


  add(rep)
  {
    let base=this;
    console.log(rep);
    var fromdata={
          from:localStorage.getItem('uid'),
          to:rep.id,
          status:'sent',
          date:new Date().toLocaleString()
    };

    var todata={
      from:localStorage.getItem('uid'),
      to:rep.id,
      status:'get',
      date:new Date().toLocaleString()
};

    base.dbs.addFriends(localStorage.getItem('uid'),fromdata).then(data=>{
      base.dbs.addFriends(rep.id,todata).then(data=>{
        if(base.user=="rep")
        {
          base.grtbuyer();
    
        }
        else
        {
          base.grtRep();
        }
       
base.dbs.presentAlert('Request Sent.','Success');
      });
    });
  }

}
