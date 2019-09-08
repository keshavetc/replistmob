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
 * Generated class for the BuyerFoodDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-food-details',
  templateUrl: 'buyer-food-details.html',
})
export class BuyerFoodDetailsPage {
rep:any={id:'',data:''};
count:any=1;
cartItems=[];
cartcount:any=0;
instruction="";
text:any="Add to Cart";
enabled:Boolean=true;
itmcount:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private dbs:DatabaseService,) {
   
    this.rep.id=this.navParams.get('data').id;
    
    this.getItemDetails(this.navParams.get('data').id);
 
    if(localStorage.getItem('cart'))
    {
      this.cartItems=JSON.parse(localStorage.getItem('cart'));
      this.cartcount=this.cartItems.length;
      this.cartItems.forEach(element=>{
      this.getItemDetails(element.items.id,element.qnt);
      console.log('<<<--->>>',element.qnt)
        
      });

    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerFoodDetailsPage');
  }

  placeorder() {

    
    let base=this;
   
    base.addtocart();
  
    this.navCtrl.push('MyCartPage');
  }

  cart() {
    this.navCtrl.push('MyCartPage')
  }

  remove()
  {
    var intv=this.rep.data.inventory || 1;
    if(this.count>1)
    {
      this.count--;
      this.rep.data.inventory=parseInt(this.rep.data.inventory)+1;
    }
      
  }

  add()
  {

    var intv=this.rep.data.inventory || 1;
 
  if(this.count<parseInt(this.itmcount))
    {
      this.count++;
      this.rep.data.inventory=parseInt(this.rep.data.inventory)-1;
    }
    else
    {
this.dbs.presentAlert("You Can Place Only "+this.rep.data.inventory+" More Quantity for this Product.","Out Of Stock");
    }

  
  }


  addtocart()
  {
    if(localStorage.getItem('cart'))
    {
      this.cartItems=JSON.parse(localStorage.getItem('cart'));
      this.cartItems.push({totalqnt:this.itmcount,qnt:this.count,items:this.rep,desc:this.instruction});
      localStorage.setItem('cart',JSON.stringify(this.cartItems));
      this.cartcount=this.cartItems.length;
      this.getItemDetails(this.rep.id);
    }
    else
    {
      
      this.cartItems.push({totalqnt:this.itmcount,qnt:this.count,items:this.rep,desc:this.instruction});
      localStorage.setItem('cart',JSON.stringify(this.cartItems));
      this.cartcount=this.cartItems.length;
      this.getItemDetails(this.rep.id);
    }
    
  }


  getStock()
  {
    var intv=this.rep.data.inventory || 1;
    var qunt=parseInt(intv)>=parseInt(this.count)?parseInt(this.count):parseInt(intv);
    if(parseInt(intv)-qunt<0)
    {
      this.rep.data.inventory=0;
      this.text="Out Of Stock";
      this.enabled=true;
    }
    else
    {
      this.rep.data.inventory=parseInt(intv)-qunt;
      this.text="Add To Cart";
      this.enabled=false;
    }
    
  }

  getItemDetails(pid,qnt=0)
  {
    let base=this;
    base.dbs.getItemDetails(pid).then(data=>{
      base.rep.data=data;
      base.rep.data.inventory=base.rep.data.inventory-qnt
      base.itmcount=base.rep.data.inventory;
      if(qnt>=base.itmcount)
      {
        
          this.rep.data.inventory=0;
          this.text="Out Of Stock";
          this.enabled=true;
        
       
      }
      else
      {
        base.getStock();
      }
     
      console.log('XXX',base.rep);
    });
  }
}
