import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Rep} from "../../models/rep";
import {DatabaseService} from "../../services/database";
import {Buyer} from "../../models/buyer";

/**
 * Generated class for the BlastemailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blastemail',
  templateUrl: 'blastemail.html',
})
export class BlastemailPage {
  private checkbool: boolean = false;
  rep: Rep;
  buyers: { buyer: Buyer, check: boolean }[] = [];
  check_all:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseService) {
    this.getUser();
    this.getBuyers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlastemailPage');
  }

  checkAll() {
    if(this.check_all == true){
      this.buyers.forEach((buyer) => {
        buyer.check = false;
      });
      this.check_all = false;
      console.log(this.check_all);
    }else{
      this.buyers.forEach((buyer) => {
        buyer.check = true;
      });
     this.check_all = true;
     console.log(this.check_all);
    }
  }

  email() {
    this.navCtrl.push('RepMessagePage',{'buyer':this.buyers});
  }

  getUser() {
    this.rep = this.navParams.get('user');
  }

  getBuyers() {
    console.log(this.rep.buyer);
    this.database.getAllUsers().then((allUsers: any[]) => {
      allUsers.forEach((user) => {
        this.rep.buyer.forEach((buyer) => {
          if (buyer == user.email) {
            this.buyers.unshift({buyer: user, check: false});
          }
        });
      })
    });
  }
}
