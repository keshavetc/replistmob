import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CameraService} from "../../services/camera";
import {AuthService} from "../../services/auth";
import {DatabaseService} from "../../services/database";
import {ToastService} from "../../services/toast";
import {LoaderService} from "../../services/loader";
import { Rep } from "../../models/rep";

/**
 * Generated class for the RepSignup3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-signup3',
  templateUrl: 'rep-signup3.html',
})
export class RepSignup3Page {
  confirm_password: string = '';
  rep = {
    experience: '',
    opentime: '',
    closedtime: '',
    weekstart: '',
    weekend: '',
    companylogo: '',
    email: '',
    password: '',
    role:'',
  };
  real_rep: Rep = null;

  constructor(private loader:LoaderService,private database: DatabaseService, private toast: ToastService, private auth: AuthService, public navCtrl: NavController, public navParams: NavParams, private camera: CameraService) {
    this.real_rep = this.navParams.get('rep');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepSignup3Page');
  }

  logo() {
    this.camera.presentChooseOption().then((data:string) => {
      this.rep.companylogo = data;
    });
  }

  welcome() {

    // console.log(this.rep, /\S+@\S+\.\S+/.test(this.rep.email));
    this.setRole('rep');
    console.log(this.rep, /\S+@\S+\.\S+/.test(this.rep.email));
    if (this.rep.opentime.length !== 0 && this.rep.closedtime.length !== 0 && this.rep.weekstart.length !== 0 && this.rep.weekend.length !== 0 && /\S+@\S+\.\S+/.test(this.rep.email) && this.rep.password.length > 4 && this.rep.password === this.confirm_password) {
      this.real_rep = {...this.real_rep, ...this.rep};
      console.log(this.real_rep);
      this.loader.presentLoadingText("Please wait...")
      this.auth.SignUp(this.real_rep.email, this.real_rep.password).then((user) => {
        this.database.setUserData(this.real_rep.email, this.real_rep).then((data) => {
          console.log(data,user);
          setTimeout(()=>{
            this.loader.stopLoader();
          },1000)
          this.navCtrl.setRoot('RepWelcomePage',{'user':this.real_rep});
        })
      });
    } else {
      this.toast.presentSimpleToast('Please Fill Details Properly', 3000)
    }
  }

  setRole(role) {
    this.rep.role = role;
  }
}
