import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import * as firebase from 'firebase';
import { RepAddItem } from "../../models/repadditem";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast";
import {CameraService} from "../../services/camera";
import { Observable } from 'rxjs';
import {DatabaseService} from "../../services/database";


const storageService = firebase.storage();
const storageRef = storageService.ref();

/**
 * Generated class for the RepAddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-add-item',
  templateUrl: 'rep-add-item.html',
})
export class RepAddItemPage {
 repadditem:any = {
    pic: '',
    size:'',
    name:'',
    description:'',
  };

  selectedFile:any;
  uploadedFile:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
     private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
              private dbs:DatabaseService
              ) {}
  ngOnInit(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepAddItemPage');
  }



  handleFileUploadChange(e) {
    let base=this;
    base.selectedFile = e.target.files[0];
   // console.log(this.selectedFile);
    setTimeout(function () {
      base.handleFileUploadSubmit();
    },3000);
  }

  handleFileUploadSubmit() {
    let base=this;
   let dt=new Date().toLocaleString();
    dt=dt.toLocaleString().replace(/:/g,"_").replace(/,/g,"_").replace(/ /g,"_").replace(/\//g,"_");
    var fn=base.selectedFile.name.split('.');
  // console.log('---FileName---',`images/${fn[0]+'_'+dt+'.'+fn[1]}`);
    const uploadTask = storageRef.child(`images/${fn[0]+'_'+dt+'.'+fn[1]}`).put(base.selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log("File available at", downloadURL);
       base.uploadedFile=downloadURL;
      });
    },null, () => {
      // Do something once upload is complete
      console.log('success');
    });
  }

  chooseimage() {
    this.cameraplay.presentChooseOption().then((data:string) => {
      this.repadditem.pic = data;
      console.log();
     });
 }

  additem() {
let base=this;
    base.repadditem = (base.repadditem as RepAddItem);
    base.repadditem.pic=base.uploadedFile;

    if (base.repadditem.name.length > 3 && base.repadditem.description.length > 0) {
      //this.navCtrl.push('RepAddItemDetailsPage', {'Additem': this.repadditem});
//-----------------------------------------------------------
      console.log(base.repadditem);
firebase.firestore().collection('products').doc('pdsuyashremote').set(base.repadditem).then(res=>{
  console.log(res);
},(err)=>{
  console.log('err:',err);
});
      //--------------------------------------------------------

    }
    // let actionSheet = this.actionSheetCtrl.create({
    //   title: 'Depend on account status',
    //   buttons: [
    //     {
    //       text: 'Have Item',
    //       handler: () => {
    //         console.log('Item Added');
    //         this.navCtrl.push('RepAddItemDetailsPage')
    //       }
    //     },
    //     {
    //       text: 'No Item',
    //       handler: () => {
    //         this.navCtrl.push('RepNoItemPage')
    //       }
    //     },{
    //       text: 'Purchased',
    //       handler: () => {
    //         this.navCtrl.push('RepPurchasedPage')
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     }
    //   ]
    // });
    //
    // actionSheet.present();

  }

}

