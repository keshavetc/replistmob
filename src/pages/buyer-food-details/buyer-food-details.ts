import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
rep:any;
count:any=1;
cartItems=[];
cartcount:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rep= this.navParams.get('data').x;
    if(localStorage.getItem('cart'))
    {
      this.cartItems=JSON.parse(localStorage.getItem('cart'));
      this.cartcount=this.cartItems.length;

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerFoodDetailsPage');
  }

  placeorder() {
    this.navCtrl.push('BuyFoodOrderPlacedPage')
  }

  cart() {
    this.navCtrl.push('MyCartPage')
  }

  remove()
  {
    if(this.count>1)
      this.count--;
  }

  add()
  {
    if(this.count<21)
      this.count++;
  }


  addtocart()
  {
    if(localStorage.getItem('cart'))
    {
      this.cartItems=JSON.parse(localStorage.getItem('cart'));
      this.cartItems.push({qnt:this.count,items:this.rep});
      localStorage.setItem('cart',JSON.stringify(this.cartItems));
      this.cartcount=this.cartItems.length;

    }
    else
    {
      
      this.cartItems.push({qnt:this.count,items:this.rep});
      localStorage.setItem('cart',JSON.stringify(this.cartItems));
      this.cartcount=this.cartItems.length;
    }
    
  }
}
