import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepAddItemPage } from './rep-add-item';

@NgModule({
  declarations: [
    RepAddItemPage,
  ],
  imports: [
    IonicPageModule.forChild(RepAddItemPage),
  ],
})
export class RepAddItemPageModule {}
