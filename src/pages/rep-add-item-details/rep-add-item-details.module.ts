import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepAddItemDetailsPage } from './rep-add-item-details';

@NgModule({
  declarations: [
    RepAddItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RepAddItemDetailsPage),
  ],
})
export class RepAddItemDetailsPageModule {}
