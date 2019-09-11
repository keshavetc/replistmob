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



/**
 * Generated class for the MyCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const storageService = firebase.storage();
const storageRef = storageService.ref();

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {
  cartItems:any=[];
  total:any=0;
  itmcount:any=0;
  itemids:any=[];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
     private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
              private dbs:DatabaseService,
              public loadingCtrl: LoadingController
  ) {
    if(localStorage.getItem('cart'))
    {
      this.cartItems=JSON.parse(localStorage.getItem('cart'));
      // this.cartItems.push({qnt:this.count,items:this.rep});
      // localStorage.setItem('cart',JSON.stringify(this.cartItems));
      // this.cartcount=this.cartItems.length;

      this.cartItems.forEach(element => {
        this.total=this.total+parseInt(element.qnt)*parseFloat(element.items.data.price);
      });

    }
  }

add(itm)
{

  var intv=itm.items.data.inventory || 1;
  

  if(itm.qnt<parseInt(itm.totalqnt))
    {
      itm.qnt++;
      itm.items.data.inventory=parseInt(itm.items.data.inventory)-1;
    }
    else
    {
this.dbs.presentAlert("You Can Place Only "+itm.items.data.inventory+" More Quantity for this Product.","Out Of Stock");
    }

    this.total=0;
    this.cartItems.forEach(element => {
      this.total=this.total+parseInt(element.qnt)*parseFloat(element.items.data.price);
    });
}

remove(itm)
{

  var intv=itm.items.data.inventory || 1;
  if(itm.qnt>1)
    {
      itm.qnt--;
      itm.items.data.inventory=parseInt(itm.items.data.inventory)+1;
    }

    this.total=0;
    this.cartItems.forEach(element => {
      this.total=this.total+parseInt(element.qnt)*parseFloat(element.items.data.price);
    });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
  }

  counter=0;

  checkout() {
/*

desc: "Special Instruction"
items:
data:
createdon: "9/6/2019, 9:27:27 AM"
description: "xzcxzczxcz"
name: "czxczxc"
pic: "https://firebasestorage.googleapis.com/v0/b/replist-c3017.appspot.com/o/images%2Ffeedback_redlines_9_6_2019__9_26_22_AM.png?alt=media&token=9f888b57-30ff-4123-b947-9a06ebb9d593"
price: "12"
size: "12"
uid: "satishpadnani@icloud.com"
__proto__: Object
id: "0cU0zjgiHjpFxXhFit38"
localStorage.getItem('uid')
*/

    //this.navCtrl.push('BuyFoodOrderPlacedPage')

  let base=this;
  base.dbs.presentLoadingDefault();
  base.placeorder();
  //  var ct=0;
  //  var tinterval=1000;
  //   base.cartItems.forEach(element => {
  //   if(ct==0)
  //   {
  //     setTimeout(function(){
  //       base.placeorder(element);
  //      },tinterval);
  //      tinterval=tinterval+1000;
  //      ct++;
  //   }
  //   else
  //   {
     
  //     setTimeout(function(){
  //       base.placeorder(element);
  //      },tinterval);
  //      tinterval=tinterval+1000;
  //   }
     
     
  //   });

    

  }

  placeorder()
  {

    let base=this;
   
   var RepDetails:any={
      name:"",
      business:"",
      address:"",
      phone:""
    }

    var repids:any=[];
    //var oid=base.dbs.uuid();
    //console.log(oid);
    var element:any;
    console.log('---base.counter---',base.counter,'---base.cartItems.length---',base.cartItems.length,'---cartItems---',base.cartItems);
    
    if(base.cartItems.length>base.counter)
    {

      element=base.cartItems[base.counter];
       base.dbs.getItemDetails(element.items.id).then(data=>{
        var itms:any=data;
        console.log(itms.inventory,'>=',element.qnt);
      
       base.dbs.searchrep1(element.items.data.uid).then(rep=>{
        repids.push(element.items.data.uid);
        var repdata:any;
       var name="";
       var business="";
       var address="";
         repdata=rep[0].data;
         console.log('---REP---',repdata);
         RepDetails.name=repdata.name;
         RepDetails.business=repdata.companyname;
         RepDetails.address=repdata.address;
         RepDetails.phone=repdata.phone;

       
  
        if(itms.inventory>=element.qnt)
        {
          var items={
            buyer:localStorage.getItem('uid'),
            rep:element.items.data.uid,
            date:new Date().toLocaleString(),
            pic:element.items.data.pic,
            pieces:element.items.data.size,
            price:element.items.data.price,
            product:element.items.data.name,
            quantity:element.qnt,
            status:"ordered",
            instruction:element.desc,
            RepDetails:RepDetails
          };
    
          console.log(items,'---Placed Items---',element);
          element.items.data.inventory=itms.inventory-element.qnt;
          base.dbs.addToSoldOut(items,element.items.id,element.items.data).then(res=>{
          
         
          base.counter++;
         // console.log('soldout_ID:',res);
          base.itemids.push(res);
          base.placeorder();
           
          },(err)=>{
            console.error(err);
          });
          
    
        }
        else
        {
          var odata={
            buyer:localStorage.getItem('uid'),
            date:new Date().toLocaleString(),
            status:"ordered",
            itemsis:base.itemids,
            RepDetails:RepDetails
          };

          base.dbs.CreateOrder(odata).then(res=>{
           
          console.log('soldout_ID:',res);
          repids.forEach(element => {
            var dt={
              rep:element,
              orderid:res,
              buyer:localStorage.getItem('uid')
            };
            base.dbs.CreateRepOrder(dt).then(resx=>{});
            base.dbs.loadingdismiss();
          });
          },(err)=>{
            console.error(err);
            base.dbs.loadingdismiss();
          });
          base.dbs.loadingdismiss();
          base.dbs.presentAlert("Your Order is placed!","Information");
          localStorage.removeItem('cart');
          base.navCtrl.push('BuyFoodOrderPlacedPage')
        }

      });
       
     
      });
  
         
    }
    else
    {


      var odata={
        buyer:localStorage.getItem('uid'),
        date:new Date().toLocaleString(),
        status:"ordered",
        itemsis:base.itemids,
        RepDetails:RepDetails
      };

      base.dbs.CreateOrder(odata).then(res=>{
       
      console.log('soldout_ID:',res);
      repids.forEach(element => {
        var dt={
          rep:element,
          orderid:res,
          buyer:localStorage.getItem('uid')
        };
        base.dbs.CreateRepOrder(dt).then(resx=>{});
        base.dbs.loadingdismiss();
      });
       
      },(err)=>{
        console.error(err);
        base.dbs.loadingdismiss();
      });
      base.dbs.presentAlert("Your Order is placed!","Information");
      localStorage.removeItem('cart');
      base.dbs.loadingdismiss();
    base.navCtrl.push('BuyFoodOrderPlacedPage')

    }
  



  }


  removeitem(itm)
  {
    var index=this.cartItems.indexOf(itm);
    this.cartItems.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
    this.total=0;
    this.cartItems.forEach(element => {
      this.total=this.total+parseInt(element.qnt)*parseFloat(element.items.data.price);
    });
  }
}
