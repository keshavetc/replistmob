import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Buyer} from "../../models/buyer";

/**
 * Generated class for the BuyerWelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-welcome',
  templateUrl: 'buyer-welcome.html',
})
export class BuyerWelcomePage {

  buyer:Buyer;
  constructor(public navCtrl: NavController, public navParams: NavParams,) {
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerWelcomePage');
  }

  buyers() {
    this.navCtrl.push('BuyerRepPage')
  }

  ytd() {
    this.navCtrl.push('YtdOrderssPage')
  }

  search() {
    this.navCtrl.push('RepSearchPage')
  }

  addbuyers() {
    this.navCtrl.push('AddbuyersPage')
  }

  email() {
    this.navCtrl.push('BlastemailPage')
  }

  profile() {
    this.navCtrl.push('ProfilePage',{'user':this.buyer,role:'buyer'});
  }

  additem() {
    
    this.navCtrl.push('RepAddItemPage')
  }

  repshared() {
    this.navCtrl.push('BuyerSharedRepPage')
  }

  friends() {
    this.navCtrl.push('RepFriendsPage')
  }

  request() {
    this.navCtrl.push('InvitationRequestsPage')
  }

  cart() {
    this.navCtrl.push('MyCartPage')
  }

  getUser(){
    this.buyer = (this.navParams.get('user') as any) || JSON.parse(localStorage.getItem('user'));
  }
}
