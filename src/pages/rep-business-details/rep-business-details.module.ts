import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepBusinessDetailsPage } from './rep-business-details';

@NgModule({
  declarations: [
    RepBusinessDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RepBusinessDetailsPage),
  ],
})
export class RepBusinessDetailsPageModule {}
