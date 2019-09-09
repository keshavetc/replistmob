import {Component} from '@angular/core';
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
 * Generated class for the RepFriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-friends',
  templateUrl: 'rep-friends.html',
})
export class RepFriendsPage {
results: Observable<any>;
  searchTerm: string = '';
  

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
        this.getfriends();
  
      }
      else
      {
        this.getfriends();
      }
  }
ngOnIt(){}
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepFriendsPage');
  }

  profile(rep) {
    this.navCtrl.push('RepFriendsProfilePage', {'friend': rep});
  }

  add() {
    //this.navCtrl.push('AddbuyersPage',{'role':'rep','user':this.rep});
  }

  getUser() {
    //this.rep = this.navParams.get('user');
   // console.log(this.rep);
  }
  setSearchItems(){
    
  }

  getFriend() {
   // this.database.getAllUsers().then((allusers: any[]) => {
    //   allusers.forEach((user) => {
    //     console.log(user.email);
    //     console.log(this.rep.rep);
    //     this.rep.rep.forEach((rep) => {
    //       if (rep === user.email) {
    //         this.friends.unshift(user);
    //       }
    //     })
    //   })
    // });
  
 

  }

  getfriends()
  {
    let base=this;
    base.dbs.presentLoadingDefault();
    base.dbs.getAcceptedFriends(localStorage.getItem('uid')).then(data=>{
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

}


