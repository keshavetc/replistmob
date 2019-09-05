import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Rep} from "../../models/rep";
import {CameraService} from "../../services/camera";
import {ToastService} from "../../services/toast";

/**
 * Generated class for the RepSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-signup',
  templateUrl: 'rep-signup.html',
})
export class RepSignupPage {

  rep = {
    pic: '',
    name: '',
    phone: '',

  };
  real_rep:Rep = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:CameraService,private toast:ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepSignupPage');
  }

  signup2() {
    this.real_rep = {...this.real_rep,...this.rep};
    if (this.real_rep.name.length > 3 && this.real_rep.phone.toString().length == 10) {
      this.navCtrl.push("RepSignup2Page",{'rep':this.real_rep});
    }else{
      this.toast.presentSimpleToast('Please Fill Details Properly',3000);
    }
  }

  addpicture() {
    this.camera.presentChooseOption().then((data:string) => {
      this.rep.pic = data;
    });
  }
}
