import {Component} from "@angular/core";
import {ActionSheetController, IonicPage, NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../services/auth";
import {DatabaseService} from "../../services/database";
import {LoaderService} from "../../services/loader";


@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user_credentials: { email: string, password: string } = {email: '', password: ''};

  constructor(private loader: LoaderService, private database: DatabaseService, private auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  // signup() {
  //   this.navCtrl.push("SignupPage");
  // }
  forgotpass() {
    this.navCtrl.push("ForgotpasswordPage");
  }


  login() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose',
      buttons: [
        {
          text: 'REP',
          handler: () => {
            this.authentication('rep');
          }
        },
        {
          text: 'Buyers',
          handler: () => {
            this.authentication('buyer');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });

    actionSheet.present();
  }

  signup() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose',
      buttons: [
        {
          text: 'REP',
          handler: () => {
            this.navCtrl.push('RepSignupPage')
          }
        },
        {
          text: 'Buyers',
          handler: () => {
            this.navCtrl.push('BuyerSignupPage')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  authentication(role){
    this.loader.presentLoadingText('Please Wait...')
    this.database.getAllUsers().then((allusers: any[]) => {
      let found:boolean = false;
      allusers.forEach((useri) => {
         console.log('aa');
        if (useri.email == this.user_credentials.email && useri.password == this.user_credentials.password && useri.role == role) {
          console.log(useri.email == this.user_credentials.email,useri.password == this.user_credentials.password);
          found= true;
          this.auth.login(this.user_credentials.email, this.user_credentials.password).then(() => {
            setTimeout(()=>{
             
              this.loader.stopLoader();
            },100)
           
            if(role == 'rep'){
              this.navCtrl.setRoot('RepWelcomePage',{'user':useri});
            }else if(role == 'buyer'){
              this.navCtrl.setRoot('BuyerWelcomePage',{'user':useri});
            }

          })
        }
      });
      if(!found){
        this.loader.stopLoader();
      }
    });
  }
}
