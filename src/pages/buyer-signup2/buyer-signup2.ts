import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Buyer} from "../../models/buyer";
import {ToastService} from "../../services/toast";

/**
 * Generated class for the BuyerSignup2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-signup2',
  templateUrl: 'buyer-signup2.html',
})
export class BuyerSignup2Page {

  buyer = {
    business: '',
    typeofbusiness: '',
    address: '',
    businesscontact: '',
    fax: '',
    taxid: '',
    street: '',
    city: '',
  };
  real_buyer: Buyer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toasts: ToastService) {
    this.real_buyer = this.navParams.get('buyer');
    console.log(this.real_buyer);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerSignup2Page');
  }

  signup3() {
    console.log(this.real_buyer);
    this.buyer.address = this.buyer.street + this.buyer.city;
    this.real_buyer = ({...this.real_buyer, ...this.buyer} as any);
    console.log(this.real_buyer);
    if (this.real_buyer.business.length > 3 && this.real_buyer.typeofbusiness.length > 3 && this.real_buyer.businesscontact.toString().length == 10 && this.real_buyer.fax.length == 10 && this.real_buyer.address.length >= 6) {
      this.navCtrl.push('BuyerSignup3Page', {'buyer': this.real_buyer});
    } else {
      this.toasts.presentSimpleToast('Please Fill Details Properly', 3000);
    }
  }
}
