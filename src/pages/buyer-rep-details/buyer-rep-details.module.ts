import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerRepDetailsPage } from './buyer-rep-details';

@NgModule({
  declarations: [
    BuyerRepDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyerRepDetailsPage),
  ],
})
export class BuyerRepDetailsPageModule {}
