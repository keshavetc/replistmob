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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rep= this.navParams.get('datay');
    console.log('<<<----->>>', this.rep);
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
}
