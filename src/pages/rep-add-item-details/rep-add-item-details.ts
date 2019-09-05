import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the RepAddItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-add-item-details',
  templateUrl: 'rep-add-item-details.html',
})
export class RepAddItemDetailsPage{
 information = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepAddItemDetailsPage');
  }

  home() {
    this.navCtrl.setRoot('RepWelcomePage')
  }

  addmoreitem() {
    this.navCtrl.pop()
  }
}


 
 