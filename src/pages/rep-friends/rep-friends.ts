import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,ToastController,LoadingController} from 'ionic-angular';
import {Rep} from "../../models/rep";
import {DatabaseService} from "../../services/database";
import {Buyer} from "../../models/buyer";
import *  as firebase from 'firebase';
import {ProfilePage} from "../profile/profile";
import {Headers, Http, RequestOptions} from "@angular/http";
import moment from 'moment';

import { Observable } from 'rxjs';


/**
 * Generated class for the RepFriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-friends',
  templateUrl: 'rep-friends.html',
})
export class RepFriendsPage {
results: Observable<any>;
  searchTerm: string = '';
  
  rep: Rep;
   friends: Rep[] = [];

  constructor(private database: DatabaseService, public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl:ToastController,public loadingCtrl: LoadingController,
    public http: Http, ) {
    this.getUser();
    this.getFriend();
  }
ngOnIt(){}
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepFriendsPage');
  }

  profile(i) {
    this.navCtrl.push('RepFriendsProfilePage', {'user': this.rep, 'friend': this.friends[i]});
  }

  add() {
    this.navCtrl.push('AddbuyersPage',{'role':'rep','user':this.rep});
  }

  getUser() {
    this.rep = this.navParams.get('user');
    console.log(this.rep);
  }
  setSearchItems(){
    
  }

  getFriend() {
    this.database.getAllUsers().then((allusers: any[]) => {
      allusers.forEach((user) => {
        console.log(user.email);
        console.log(this.rep.rep);
        this.rep.rep.forEach((rep) => {
          if (rep === user.email) {
            this.friends.unshift(user);
          }
        })
      })
    });
  
 

  }

}


