import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Rep} from "../../models/rep";

/**
 * Generated class for the RepWelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-welcome',
  templateUrl: 'rep-welcome.html',
})
export class RepWelcomePage {
  rep:Rep;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepWelcomePage');
  }

  buyers() {
    this.navCtrl.push('RepBuyersPage')
  }

  ytd() {
    this.navCtrl.push('YtdOrderssPage')
  }

  search() {
    this.navCtrl.push('RepSearchPage')
  }

  addbuyers() {
    this.navCtrl.push('AddbuyersPage',{'user':this.rep,'role':'rep'})
  }

  email() {
    this.navCtrl.push('BlastemailPage',{'user':this.rep})
  }

  profile() {
    this.navCtrl.push('ProfilePage',{'user':this.rep,'role':'rep'});
  }

  additem() {
    
    this.navCtrl.push('RepAddItemPage',{'user':this.rep});
  }

  repshared() {
    this.navCtrl.push('RepSharedBuyersPage')
  }

  friends() {
    this.navCtrl.push('RepFriendsPage',{'user':this.rep});
  }

  request() {
    this.navCtrl.push('InvitationRequestsPage')
  }
  getUser(){
    this.rep = (this.navParams.get('user') as any);
  }
}
