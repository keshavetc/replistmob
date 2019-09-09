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
 * Generated class for the RepSharedBuyersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-shared-buyers',
  templateUrl: 'rep-shared-buyers.html',
})
export class RepSharedBuyersPage {
  searchTerm: string = '';
  selectedList:any=[];

  user:any;
  repbuyerdata:any=[];
  str:any;
 filter:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
   public actionSheetCtrl: ActionSheetController,
    private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
             private dbs:DatabaseService,
             public loadingCtrl: LoadingController
  ) {
    this.getSharedByMe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepSharedBuyersPage');
  }

  details() {
    this.navCtrl.push('RepBusinessDetailsPage')
  }

  getSharedByMe()
  {


    /*
data:
date: "9/9/2019, 2:55:49 PM"
shared: "satishpadnani@icloud.com"
sharedBy: {data: "{"address":"A82Noida","city":"Noida","closedtime":…tion","weekend":"friday","weekstart":"Wednesday"}", id: "satishpadnani@icloud.com"}
sharedByid: "satishpadnani@icloud.com"
sharedWith: (2) ["ACTIVE@GMAIL.COM", "vipuls0812@gmail.com"]
sharedata:
data:
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
    base.dbs.getShareByMe(localStorage.getItem('uid')).then(dt=>{
        var rs:any=[];
        rs=dt;
        base.repbuyerdata=[];
        rs.forEach(element => {
        // console.log(element);
              base.repbuyerdata.push(element);
        });
        base.dbs.loadingdismiss();
    });

  }


  filterbyothers()
  {
    let base=this;
    base.dbs.presentLoadingDefault();
    base.dbs.getSharwithme(localStorage.getItem('uid')).then(dt=>{
        var rs:any=[];
        rs=dt;
        base.repbuyerdata=[];
        rs.forEach(element => {
       
              base.dbs.getSharedbyidx(element.data.shareListId).then(result=>{
                //console.log('<<<--->>>',result);
                base.repbuyerdata.push({id:element.data.shareListId,data:result});
              })
        });
        base.dbs.loadingdismiss();
    });
  }

  filterval()
  {
    let base=this;
    if(base.filter=="m")
    {
        base.getSharedByMe();
    }
    else
    {
        base.filterbyothers();
    }
  }
}
