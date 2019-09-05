import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyersSignupPage } from './buyers-signup';

@NgModule({
  declarations: [
    BuyersSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyersSignupPage),
  ],
})
export class BuyersSignupPageModule {}
