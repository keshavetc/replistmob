import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepSharedBuyersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-shared-buyers',
  templateUrl: 'rep-shared-buyers.html',
})
export class RepSharedBuyersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepSharedBuyersPage');
  }

  details() {
    this.navCtrl.push('RepBusinessDetailsPage')
  }
}
