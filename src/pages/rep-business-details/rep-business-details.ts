import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepBusinessDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-business-details',
  templateUrl: 'rep-business-details.html',
})
export class RepBusinessDetailsPage {
data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data=this.navParams.get('data');
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepBusinessDetailsPage');
  }

  home() {
    this.navCtrl.setRoot("RepWelcomePage")
  }

  ytorders() {
    this.navCtrl.push("YtdOrderssPage")
  }

  message() {
    this.navCtrl.push("RepMessagePage")
  }

  itemordered() {
    this.navCtrl.push('ItemorderedPage')
  }

  sharecontact() {
    this.navCtrl.push('SharecontactPage')
  }
}

