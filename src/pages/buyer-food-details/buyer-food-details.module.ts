import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerFoodDetailsPage } from './buyer-food-details';

@NgModule({
  declarations: [
    BuyerFoodDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyerFoodDetailsPage),
  ],
})
export class BuyerFoodDetailsPageModule {}
