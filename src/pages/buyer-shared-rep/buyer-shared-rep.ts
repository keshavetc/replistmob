import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the BuyerSharedRepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-shared-rep',
  templateUrl: 'buyer-shared-rep.html',
})
export class BuyerSharedRepPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerSharedRepPage');
  }

  details() {
    this.navCtrl.push('BuyerRepDetailsPage')
  }
}
