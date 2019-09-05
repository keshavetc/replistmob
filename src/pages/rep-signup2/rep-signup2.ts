import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Rep} from "../../models/rep";
import {ToastService} from "../../services/toast";

/**
 * Generated class for the RepSignup2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-signup2',
  templateUrl: 'rep-signup2.html',
})
export class RepSignup2Page {


  rep={
    companyname:'',
    typeofbusiness:'',
    address:'',
    contactno:'',
    fax:'',
    taxid:'',
    companywebsite:'',
    street:'',
    city:'',
  };
  real_rep:Rep=null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private toasts:ToastService) {
    this.real_rep = this.getNavParams();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepSignup2Page');
  }

  signup3() {
    this.rep.address = this.rep.street + this.rep.city;
    this.real_rep = ({...this.real_rep,...this.rep} as any);
    console.log(this.real_rep);
    if(this.real_rep.companyname.length > 3 && this.real_rep.typeofbusiness.length > 3 && this.real_rep.contactno.toString().length == 10 && this.real_rep.fax.length == 10 && this.real_rep.address.length >= 6){
      this.navCtrl.push('RepSignup3Page',{'rep':this.real_rep});
    }else{
      this.toasts.presentSimpleToast('Please Fill Details Properly',3000);
    }
  }

  getNavParams(){
    return this.navParams.get('rep');
  }
}
