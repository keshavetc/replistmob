import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Buyer} from "../../models/buyer";
import {Rep} from "../../models/rep";
import {LoaderService} from "../../services/loader";
import {DatabaseService} from "../../services/database";
import {AuthService} from "../../services/auth";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ProfileChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-change-password',
  templateUrl: 'profile-change-password.html',
})
export class ProfileChangePasswordPage {
  buyer: Buyer;
  rep: Rep;
  password: { password: string, confirm_password: string } = {password: '', confirm_password: ''};

  constructor(public navCtrl: NavController, private loader: LoaderService, public navParams: NavParams, private database: DatabaseService, private auth: AuthService) {
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  change() {
    this.loader.presentLoadingText('Please wait...');
    if (this.password.password === this.password.confirm_password && this.password.password.length > 3) {
      let path = '';
      path = this.getPath();
      this.setPassword();
      console.log(path);
      this.database.UpdateUser(path, this.buyer ? path == this.buyer.email ? this.buyer : this.rep : this.rep).then(() => {
        this.auth.changePassword(this.password.password).then(() => {
          this.navCtrl.setRoot('LoginPage').then(() => {
            setTimeout(() => {
              this.loader.stopLoader();
            }, 3000)
            this.auth.logout().then(() => {
              this.navCtrl.setRoot(LoginPage);
            });
          })
        });
      })
    } else {
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

  setPassword() {
    if (this.navParams.get('role') == 'buyer') {
      this.buyer.password = this.password.password;
    } else if (this.navParams.get('role') == 'rep') {
      this.rep.password = this.password.password;
    }
  }
}
