import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Buyer} from "../../models/buyer";
import {Rep} from "../../models/rep";
import {DatabaseService} from "../../services/database";
import {AuthService} from "../../services/auth";
import {LoaderService} from "../../services/loader";
import set = Reflect.set;

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  buyer: Buyer;
  rep: Rep;
  password: { password: string, confirm_password: string } = {password: '', confirm_password: ''};

  constructor(public navCtrl: NavController,private loader:LoaderService,public navParams: NavParams,private database:DatabaseService,private auth:AuthService) {
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  resetcode() {
    this.loader.presentLoadingText('Please wait...');
    if (this.password.password === this.password.confirm_password && this.password.password.length > 3) {
      let path = '';
      path = this.getPath();
      this.setPassword();
      this.database.UpdateUser(path,this.buyer?path==this.buyer.email?this.buyer:this.rep:this.rep).then(()=>{
        this.auth.changePassword(this.password.password).then(()=>{
          this.navCtrl.setRoot('LoginPage').then(()=>{
            setTimeout(()=>{
              this.loader.stopLoader();
            },1000)
          })
        });
      })
    }else{
      this.loader.stopLoader();
    }
  }

  getUser() {
    if (this.navParams.get('role') == 'buyer') {
      this.buyer = this.navParams.get('user')
    } else if (this.navParams.get('role') == 'rep') {
      this.rep = this.navParams.get('user')
    }
  }

  getPath() {
    if (this.navParams.get('role') == 'buyer') {
      return this.buyer.email;
    } else if (this.navParams.get('role') == 'rep') {
      return this.rep.email;
    }
  }

  setPassword(){
    if (this.navParams.get('role') == 'buyer') {
      this.buyer.password = this.password.password;
    } else if (this.navParams.get('role') == 'rep') {
      this.rep.password = this.password.password;
    }
  }
}
