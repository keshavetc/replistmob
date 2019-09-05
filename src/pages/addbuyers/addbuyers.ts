import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
import {Buyer} from "../../models/buyer";
import {AuthService} from "../../services/auth";
import {Rep} from "../../models/rep";

import {DatabaseService} from "../../services/database";

/**
 * Generated class for the AddbuyersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addbuyers',
  templateUrl: 'addbuyers.html',
})
export class AddbuyersPage {
  buyers: Buyer[] = [];
  rep: Rep;

 

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private database: DatabaseService) {
    this.getUser();
    this.getBuyers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbuyersPage');
  }

  nodata() {
    this.navCtrl.push('RepAddBuyerNofoundPage')
  }

  getUser() {
    this.database.getAllUsers().then((users: any[]) => {
      users.forEach((user) => {
        if (user.role == 'buyer') {
          let count = 0;
          this.rep.buyer.forEach((buyer) => {
            if (buyer === user.email) {
              count++;
            }
          })
          if(count == 0){
            this.buyers.unshift(user);
          }
        }
        });
    });
    this.rep = this.navParams.get('user');
  }
  

  getBuyers() {
    this.database.getAllUsers().then((users: any[]) => {
      users.forEach((user) => {
        if (user.role == 'buyer') {
          let count = 0;
          this.rep.buyer.forEach((buyer) => {
            if (buyer === user.email) {
              count++;
            }
          })
          if(count == 0){
            this.buyers.unshift(user);
          }
        }
      });
    });
  }

}
