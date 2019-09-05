import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {LoaderService} from "../../services/loader";
import {ToastService} from "../../services/toast";
import {AuthService} from "../../services/auth";
import {DatabaseService} from "../../services/database";

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-forgotpassword",
  templateUrl: "forgotpassword.html"
})
export class ForgotpasswordPage {
  email:string='';
  constructor(private database:DatabaseService,private loader:LoaderService,private auth:AuthService,public navCtrl: NavController, public navParams: NavParams,private toast:ToastService) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgotpasswordPage");
  }

  resetcode() {
    this.loader.presentLoadingText('Please Wait...').then(()=>{
      console.log(/\S+@\S+\.\S+/.test(this.email));
      if(/\S+@\S+\.\S+/.test(this.email)){
        this.database.getSingleUser(this.email).then((data)=>{
          if(data){
            this.auth.forgotPasswordlink(this.email).then(()=>{
              this.loader.stopLoader();
              this.toast.presentSimpleToast('Link is sended to your email',3000);
            })
          }else{
            this.loader.stopLoader();
            this.toast.presentSimpleToast('Email is not valid',3000);
          }
        });

      }else {
        this.loader.stopLoader();
        this.toast.presentSimpleToast('Please Fill Valid Details',3000);
      }
    });

  }
}
