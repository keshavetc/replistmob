import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerSignupPage } from './buyer-signup';

@NgModule({
  declarations: [
    BuyerSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyerSignupPage),
  ],
})
export class BuyerSignupPageModule {}
