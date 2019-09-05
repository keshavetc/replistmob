import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';




@IonicPage()
@Component({
  selector: 'page-rep-no-item',
  templateUrl: 'rep-no-item.html',
})
export class RepNoItemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private payPal: PayPal) {
  }
paymentAmount: string = 'any';
  currency: string = 'USD';
  currencyIcon: string = '$';

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepNoItemPage');
  }
  home() {
    this.navCtrl.setRoot('RepWelcomePage')
  }
  buy(){
    console.log(this.payPal)
    
this.payPal.init({
  PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
  PayPalEnvironmentSandbox: 'AQZaRg-GEsrzibQMhOOhjkVzpQYyXMkpP5Ubm1DZ4rUkSM3j_nz3u-UPhKGyxLp0qd5dbj8K_2cQ0BM5'
}).then(() => {
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {
    let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
    this.payPal.renderSinglePaymentUI(payment).then(() => {
      // Successfully paid

      // Example sandbox response
      //
      // {
      //   "client": {
      //     "environment": "sandbox",
      //     "product_name": "PayPal iOS SDK",
      //     "paypal_sdk_version": "2.16.0",
      //     "platform": "iOS"
      //   },
      //   "response_type": "payment",
      //   "response": {
      //     "id": "PAY-1AB23456CD789012EF34GHIJ",
      //     "state": "approved",
      //     "create_time": "2016-10-03T13:33:33Z",
      //     "intent": "sale"
      //   }
      // }
    }, () => {
      // Error or render dialog closed without being successful
    });
  }, () => {
    // Error in configuration
  });
}, () => {
  // Error in initialization, maybe PayPal isn't supported or something else
});
  }
  
}
