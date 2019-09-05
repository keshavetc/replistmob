import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuyFoodOrderPlacedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-food-order-placed',
  templateUrl: 'buy-food-order-placed.html',
})
export class BuyFoodOrderPlacedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyFoodOrderPlacedPage');
  }

  home() {
    this.navCtrl.setRoot('BuyerWelcomePage')
  }

  done() {
    this.navCtrl.setRoot('BuyerWelcomePage')
  }

  ytd() {
    this.navCtrl.push('YtdOrderssPage')
  }

  details() {
    this.navCtrl.push('YtdOrderssBusinessDetailsPage')
  }
}
