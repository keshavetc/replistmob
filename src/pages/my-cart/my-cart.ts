import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {
  cartItems:any=[];
  total:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  if(itm.qnt<21)
    {
      itm.qnt++;
    }


    this.cartItems.forEach(element => {
      this.total=this.total+parseInt(element.qnt)*parseFloat(element.items.data.price);
    });
}

remove(itm)
{
  if(itm.qnt>1)
    {
      itm.qnt--;
    }

    
    this.cartItems.forEach(element => {
      this.total=this.total+parseInt(element.qnt)*parseFloat(element.items.data.price);
    });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
  }

  checkout() {
    this.navCtrl.push('BuyFoodOrderPlacedPage')
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
