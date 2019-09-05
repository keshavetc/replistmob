import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Buyer} from "../../models/buyer";
import {CameraService} from "../../services/camera";
import {ToastService} from "../../services/toast";
import {AuthService} from "../../services/auth";
import {DatabaseService} from "../../services/database";
import {LoaderService} from "../../services/loader";

/**
 * Generated class for the BuyerSignup3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-signup3',
  templateUrl: 'buyer-signup3.html',
})
export class BuyerSignup3Page {

  real_buyer: Buyer;
  confirm_password:string;
  buyer = {
    experience: '',
    opentime: '',
    closedtime: '',
    weekstart: '',
    weekend: '',
    companylogo: '',
    email: '',
    password: '',
    role:''
  };

  constructor(private loader:LoaderService,private database:DatabaseService,private auth: AuthService,public navCtrl: NavController, public navParams: NavParams,private cameraplay:CameraService,private toast:ToastService) {
    this.real_buyer = this.navParams.get('buyer');
    console.log(this.real_buyer);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerSignup3Page');
  }

  logo() {
    this.cameraplay.presentChooseOption().then((data:string) => {
      this.buyer.companylogo = data;
    });
  }

  welcome() {
    this.setRole('buyer');
    console.log(this.buyer,/\S+@\S+\.\S+/.test(this.buyer.email));
    if(this.buyer.opentime.length !== 0 && this.buyer.closedtime.length !== 0 && this.buyer.weekstart.length !== 0 && this.buyer.weekend.length !== 0  && /\S+@\S+\.\S+/.test(this.buyer.email) && this.buyer.password.length > 4 && this.buyer.password === this.confirm_password){
      this.real_buyer = {...this.real_buyer,...this.buyer};
      console.log(this.real_buyer);
      this.loader.presentLoadingText("Please wait...");
      this.auth.SignUp(this.real_buyer.email,this.real_buyer.password).then((user)=>{
        this.database.setUserData(this.real_buyer.email,this.real_buyer).then((data)=>{
          console.log(data,user);
          setTimeout(()=>{
            this.loader.stopLoader();
          },1000)
          this.navCtrl.setRoot('BuyerWelcomePage',{'user':this.real_buyer});
        })
      });
    }else{
      this.toast.presentSimpleToast('Please Fill Details Properly',3000)
    }

  }

  setRole(role){
    this.buyer.role = role;
  }
}
