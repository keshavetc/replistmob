import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerWelcomePage } from './buyer-welcome';

@NgModule({
  declarations: [
    BuyerWelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(BuyerWelcomePage),
  ],
})
export class BuyerWelcomePageModule {}
