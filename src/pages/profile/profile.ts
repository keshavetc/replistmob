import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Buyer} from "../../models/buyer";
import {Rep} from "../../models/rep";
import {DatabaseService} from "../../services/database";
import {LoaderService} from "../../services/loader";
import {ToastService} from "../../services/toast";
import {AuthService} from "../../services/auth";
import {CameraService} from "../../services/camera";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  buyer: Buyer;
  rep: Rep;

  constructor(private camera: CameraService, private auth: AuthService, public navCtrl: NavController, public navParams: NavParams, private toast: ToastService, private loader: LoaderService, private database: DatabaseService) {
    this.getUser();
    console.log(this.navParams.get('role'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  changepassword() {
    if (this.navParams.get('role') == 'buyer') {
      this.navCtrl.push('ProfileChangePasswordPage', {'user': this.buyer,'role':'buyer'});
    } else if (this.navParams.get('role') == 'rep') {
      this.navCtrl.push('ProfileChangePasswordPage', {'user': this.rep,'role':'rep'});
    }

  }

  logout() {
    this.loader.presentLoadingText('Please wait');
    this.auth.logout().then(() => {
      localStorage.clear();
      this.navCtrl.setRoot('LoginPage').then(() => {
        setTimeout(() => {
          this.loader.stopLoader();
        }, 1000)
      })
    });
  }

  changelogo() {
    this.camera.presentChooseOption().then((data)=>{
      var img = data;
      if (this.navParams.get('role') == 'buyer') {
        this.buyer.companylogo = (img as any);
      } else if (this.navParams.get('role') == 'rep') {
        this.rep.companylogo = (img as any);
      }
    });
  }

  getUser() {
    if (this.navParams.get('role') == 'buyer') {
      this.buyer = this.navParams.get('user')
      console.log(this.buyer);
    } else if (this.navParams.get('role') == 'rep') {
      this.rep = this.navParams.get('user')
      console.log(this.rep);
    }
  }

  onSaveDetails() {
    let path = '';
    this.loader.presentLoadingText('Please wait...').then(() => {
      if (this.navParams.get('role') == 'buyer') {
        path = this.buyer.email;
      } else if (this.navParams.get('role') == 'rep') {
        path = this.rep.email;
      }
      this.database.UpdateUser(path, this.buyer ? path == this.buyer.email ? this.buyer : this.rep : this.rep).then(() => {
        this.loader.stopLoader();
        this.toast.presentSimpleToast('Changes are Saved', 3000);
      });
    });

  }

  ProfilePicChange() {
    this.camera.presentChooseOption().then((data)=>{
      var img = data;
      if (this.navParams.get('role') == 'buyer') {
        this.buyer.profilepic = (img as any);
      } else if (this.navParams.get('role') == 'rep') {
        this.rep.pic = (img as any);
      }
    });
  }
}
