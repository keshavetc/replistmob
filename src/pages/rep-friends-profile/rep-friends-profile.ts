import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Rep} from "../../models/rep";

/**
 * Generated class for the RepFriendsProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-friends-profile',
  templateUrl: 'rep-friends-profile.html',
})
export class RepFriendsProfilePage {

  rep: Rep;
  friend: Rep;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getUserandFriend();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepFriendsProfilePage');
  }

  recommend() {
    this.navCtrl.push('SharecontactPage')
  }

  getUserandFriend() {
    this.rep = this.navParams.get('user');
    this.friend = this.navParams.get('friend');
  }
}
