import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
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



@IonicPage()
@Component({
  selector: 'page-rep-no-item',
  templateUrl: 'rep-no-item.html',
})
export class RepNoItemPage {
plans:any=[];
crdt:any;
usdcrdts:any;

  constructor(
   public actionSheetCtrl: ActionSheetController,
     private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
              private dbs:DatabaseService,
              public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, private payPal: PayPal) {
      this.getcredits();
      this.getAllPlans();
  }
paymentAmount: string = 'any';
  currency: string = 'USD';
  currencyIcon: string = '$';

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepNoItemPage');
  }
  home() {
    this.navCtrl.setRoot('RepWelcomePage')
  }
  buy(){
    console.log(this.payPal)
    
this.payPal.init({
  PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
  PayPalEnvironmentSandbox: 'AQZaRg-GEsrzibQMhOOhjkVzpQYyXMkpP5Ubm1DZ4rUkSM3j_nz3u-UPhKGyxLp0qd5dbj8K_2cQ0BM5'
}).then(() => {
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {



    let payment = new PayPalPayment(this.selectedPlan.amount, 'USD', this.selectedPlan.name, 'sale');
    this.payPal.renderSinglePaymentUI(payment).then(() => {
      // Successfully paid
      this.updateplan(localStorage.getItem('uid'),this.selectedPlan.name);
      // Example sandbox response
      //
      // {
      //   "client": {
      //     "environment": "sandbox",
      //     "product_name": "PayPal iOS SDK",
      //     "paypal_sdk_version": "2.16.0",
      //     "platform": "iOS"
      //   },
      //   "response_type": "payment",
      //   "response": {
      //     "id": "PAY-1AB23456CD789012EF34GHIJ",
      //     "state": "approved",
      //     "create_time": "2016-10-03T13:33:33Z",
      //     "intent": "sale"
      //   }
      // }
    }, () => {
      // Error or render dialog closed without being successful
    });
  }, () => {
    // Error in configuration
  });
}, () => {
  // Error in initialization, maybe PayPal isn't supported or something else
});
  }


  
  updateplan(id=localStorage.getItem('uid'),plan)
  {




    
    let base=this;
    base.dbs.presentLoadingDefault();
    base.dbs.getPlans(plan).then(data=>{
       // console.log(data);
        var result:any=data;
        var dt={
          activePlan:plan,
          credits:result.no_of_items,
          planfee:result.amount,
          usedcredits:0,
          planactivationDate:new Date().toLocaleString()
        };

        base.dbs.updateuserplan(id,dt).then(rest=>{
base.dbs.getuserbyid(id).then(resp=>{
  var rst:any=resp;
  localStorage.setItem('user',JSON.stringify(rst));
  base.dbs.loadingdismiss();
  base.navCtrl.setRoot('RepWelcomePage');
});
        });
    });

  }



  getAllPlans()
  {


    /*
active: true
amount: 25
name: "Discount"
no_of_items: "5"
time: "2"
    */
      let base=this;
      base.dbs.getAllPlan().then(resp=>{
var res:any=[];
res=resp;
res.forEach(element => {
  //console.log(element);
  if(element.data.active)
  base.plans.push(element);
});
      });
  }

totcrd:any;
  getcredits()
  {
    let base=this;
    base.dbs.getuserbyid(localStorage.getItem('uid')).then(resp=>{
      var rst:any=resp;
      base.crdt=rst.credits;
      base.usdcrdts=rst.usedcredits;
      base.totcrd=parseInt(base.crdt)+parseInt( base.usdcrdts);
      localStorage.setItem('user',JSON.stringify(rst));
    });
  }


  selectedPlan:any={};
  select(name)
  {
    this.selectedPlan=name;
    console.log(this.selectedPlan);

  }
  
}
