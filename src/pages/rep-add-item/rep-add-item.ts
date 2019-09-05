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
 repadditem = {
    pic: '',
    size:'',
    name:'',
    description:'',
  };
   
 
 
icrmnt_dcrmnt_btns:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
     private cameraplay: CameraService, private camera: Camera, private toasts: ToastService) {}
  ngOnInit(){}
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepAddItemPage');
  }

  chooseimage() {
    this.cameraplay.presentChooseOption().then((data:string) => {
      this.repadditem.pic = data;
     });
 }

  additem() {
    this.repadditem = (this.repadditem as RepAddItem);
    if (this.repadditem.name.length > 3 && this.repadditem.description.length > 0 && this.repadditem.size.toString().length == 10) {
      this.navCtrl.push('RepAddItemDetailsPage', {'Additem': this.repadditem});
    } 
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Depend on account status',
      buttons: [
        {
          text: 'Have Item',
          handler: () => {
            console.log('Item Added');
            this.navCtrl.push('RepAddItemDetailsPage')
          }
        },
        {
          text: 'No Item',
          handler: () => {
            this.navCtrl.push('RepNoItemPage')
          }
        },{
          text: 'Purchased',
          handler: () => {
            this.navCtrl.push('RepPurchasedPage')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();

  }

}

